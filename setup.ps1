# Portfolio Setup Script for Windows PowerShell
# This script sets up the Priyanshu Kumar Portfolio project on Windows

param(
    [switch]$SkipPrerequisites
)

# Colors for output
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Red = [System.ConsoleColor]::Red
$Blue = [System.ConsoleColor]::Blue
$White = [System.ConsoleColor]::White

function Write-ColorOutput {
    param(
        [string]$Message,
        [System.ConsoleColor]$Color = $White
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Status {
    param([string]$Message)
    Write-ColorOutput "[INFO] $Message" $Green
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "[WARNING] $Message" $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "[ERROR] $Message" $Red
}

function Write-Header {
    param([string]$Title)
    Write-ColorOutput "====================================" $Blue
    Write-ColorOutput $Title $Blue
    Write-ColorOutput "====================================" $Blue
}

# Check if Node.js is installed
function Test-NodeJS {
    try {
        $nodeVersion = node --version
        if ($nodeVersion -match 'v(\d+)\.(\d+)\.(\d+)') {
            $major = [int]$matches[1]
            if ($major -ge 18) {
                Write-Status "Node.js $nodeVersion detected ✅"
                return $true
            } else {
                Write-Error "Node.js version $nodeVersion is too old. Please install Node.js 18.0.0 or higher."
                return $false
            }
        }
    } catch {
        Write-Error "Node.js is not installed. Please install Node.js 18.0.0 or higher from https://nodejs.org/"
        return $false
    }
}

# Check if npm is installed
function Test-NPM {
    try {
        $npmVersion = npm --version
        Write-Status "npm version $npmVersion detected ✅"
        return $true
    } catch {
        Write-Error "npm is not installed. Please install npm."
        return $false
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Header "Installing Dependencies"
    
    Write-Status "Installing npm dependencies..."
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Status "Dependencies installed successfully ✅"
    } else {
        Write-Error "Failed to install dependencies ❌"
        exit 1
    }
}

# Setup environment files
function Setup-Environment {
    Write-Header "Setting Up Environment"
    
    if (-not (Test-Path ".env.local")) {
        Write-Status "Creating .env.local file..."
        
        $envContent = @"
# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Microsoft Clarity (Optional)  
NEXT_PUBLIC_CLARITY_ID=your_clarity_id

# Contact Form API (Optional)
NEXT_PUBLIC_CONTACT_API_URL=your_contact_api_url

# Environment
NODE_ENV=development
"@
        
        $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Status ".env.local created ✅"
        Write-Warning "Please update .env.local with your actual values"
    } else {
        Write-Status ".env.local already exists ✅"
    }
}

# Setup Git hooks (if using git)
function Setup-GitHooks {
    if (Test-Path ".git") {
        Write-Header "Setting Up Git Hooks"
        
        $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        if ($packageJson.devDependencies.husky) {
            Write-Status "Setting up Husky git hooks..."
            npm run prepare
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Git hooks setup successfully ✅"
            }
        }
    }
}

# Create necessary directories
function New-ProjectDirectories {
    Write-Header "Creating Directories"
    
    $directories = @(
        "public\images",
        "components",
        "contexts", 
        "pages",
        "styles",
        ".github\workflows"
    )
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Status "Created directory: $dir"
        }
    }
    
    Write-Status "All directories are ready ✅"
}

# Setup placeholder images
function Setup-PlaceholderImages {
    Write-Header "Setting Up Placeholder Images"
    
    if (-not (Test-Path "public\images\profile.jpg")) {
        Write-Warning "Please add your profile image at public\images\profile.jpg"
        Write-Warning "Recommended size: 400x400px"
    }
    
    if (-not (Test-Path "public\images\og-image.jpg")) {
        Write-Warning "Please add your Open Graph image at public\images\og-image.jpg"  
        Write-Warning "Recommended size: 1200x630px"
    }
    
    if (-not (Test-Path "public\resume.pdf")) {
        Write-Warning "Please add your resume at public\resume.pdf"
    }
}

# Verify installation
function Test-Installation {
    Write-Header "Verifying Installation"
    
    # Check if key files exist
    $files = @(
        "package.json",
        "next.config.js", 
        "tailwind.config.js",
        "pages\index.js",
        "components\HeroSection.js"
    )
    
    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Status "$file ✅"
        } else {
            Write-Error "$file ❌"
        }
    }
    
    # Try building the project
    Write-Status "Testing build process..."
    $null = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Status "Build test successful ✅"
    } else {
        Write-Error "Build test failed ❌"
        Write-Warning "Run 'npm run build' to see detailed error messages"
    }
}

# Display final instructions
function Show-Instructions {
    Write-Header "Setup Complete!"
    
    Write-Host ""
    Write-ColorOutput "🎉 Portfolio setup completed successfully!" $Green
    Write-Host ""
    Write-ColorOutput "Next steps:" $Blue
    Write-Host "1. Update your personal information in the components"
    Write-Host "2. Add your profile image to public\images\profile.jpg"
    Write-Host "3. Add your resume to public\resume.pdf"
    Write-Host "4. Update the .env.local file with your analytics IDs"
    Write-Host "5. Customize the content in each section component"
    Write-Host ""
    Write-ColorOutput "Available commands:" $Blue
    Write-Host "  npm run dev     - Start development server"
    Write-Host "  npm run build   - Build for production"
    Write-Host "  npm run lint    - Run linting"
    Write-Host "  npm run deploy  - Build and prepare for deployment"
    Write-Host ""
    Write-ColorOutput "Development server:" $Blue
    Write-Host "  http://localhost:3000"
    Write-Host ""
    Write-ColorOutput "Happy coding! 🚀" $Green
}

# Main execution
function Main {
    Write-Header "Priyanshu Kumar Portfolio Setup"
    
    if (-not $SkipPrerequisites) {
        if (-not (Test-NodeJS)) { exit 1 }
        if (-not (Test-NPM)) { exit 1 }
    }
    
    New-ProjectDirectories
    Install-Dependencies
    Setup-Environment
    Setup-GitHooks
    Setup-PlaceholderImages
    Test-Installation
    Show-Instructions
}

# Run main function
try {
    Main
} catch {
    Write-Error "Setup failed: $($_.Exception.Message)"
    exit 1
}