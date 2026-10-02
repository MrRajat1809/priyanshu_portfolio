// Site content. Every factual statement here is taken from the published
// article, the submitted manuscripts, the repository READMEs, or the CV.
// Edit this file to update the site; components only handle layout.

export const profile = {
  name: 'Priyanshu Kumar',
  focus: 'Sepsis research · Clinical data science',
  statement: [
    'I study sepsis using blood transcriptomic and critical-care data. My work covers multi-cohort harmonization, Sepsis-3 cohort construction, temporal reconstruction of clinical measurements, and mortality modeling with external validation.',
    'The aim is to connect patient-level biological and clinical findings to population-level patterns of sepsis burden.',
  ],
  affiliation: 'B.E. Biotechnology, Chandigarh University, Punjab, India',
  email: '24bbe10100@cuchd.in',
  orcid: '0009-0004-1576-027X',
};

export const links = {
  cv: '/resume.pdf',
  github: 'https://github.com/MrRajat1809',
  linkedin: 'https://linkedin.com/in/priyanshu-kumar1809',
  orcid: 'https://orcid.org/0009-0004-1576-027X',
};

export const burden = {
  title: 'Sepsis-related mortality, 2017',
  measure: 'Age-standardized deaths per 100,000 population, both sexes, all underlying causes',
  stats: [
    { value: '11.0 million', label: 'sepsis-related deaths worldwide', ui: '10.1–12.0' },
    { value: '19.7%', label: 'of all deaths globally', ui: '18.2–21.4' },
    { value: '48.9 million', label: 'incident cases of sepsis', ui: '38.9–62.9' },
    { value: '52.8%', label: 'decline in age-standardized mortality, 1990–2017', ui: '47.7–57.5' },
  ],
  note: 'Burden was highest in sub-Saharan Africa, Oceania, south Asia, east Asia, and southeast Asia.',
  citation:
    'Rudd KE, Johnson SC, Agesa KM, et al. Global, regional, and national sepsis incidence and mortality, 1990–2017: analysis for the Global Burden of Disease Study. Lancet 2020; 395: 200–11.',
  doi: '10.1016/S0140-6736(19)32989-7',
  license: 'CC BY 4.0',
  method:
    'Country estimates from the article’s supplementary eTable 11, redrawn for this site. Boundaries from Natural Earth; they imply no position on territorial claims.',
  csv: '/data/gbd2017_sepsis_mortality.csv',
  script: 'https://github.com/MrRajat1809/priyanshu_portfolio/blob/main/site/scripts/build_sepsis_map.py',
};

export const program = {
  intro:
    'Each project builds a documented resource first and models it second. The transcriptomic study asked how much mortality signal blood gene expression carries on its own; its conclusion called for models that add clinical data, which led to the critical-care resource. The next steps move from patients toward populations.',
  stages: [
    {
      scale: 'Molecular',
      title: 'Blood transcriptomics',
      status: 'published',
      items: [
        'SepsisTensor v1: seven GEO cohorts, 1,636 patients, 7,964 harmonized genes',
        '36-gene mortality signature with a fully separate external cohort',
      ],
    },
    {
      scale: 'Clinical',
      title: 'Critical-care time series',
      status: 'submitted',
      items: [
        'ClinicalTensorSepsis: 28,169 adult ICU stays from three databases',
        '50 features in 24 onset-aligned hourly bins with per-cell provenance',
      ],
    },
    {
      scale: 'Patient',
      title: 'Prediction and phenotyping',
      status: 'ongoing',
      items: [
        'Cross-database mortality prediction, calibration, and external validation',
        'Trajectory analysis, phenotyping, and risk stratification',
        'How cohort differences, measurement patterns, and missing data affect transport',
      ],
    },
    {
      scale: 'Population',
      title: 'Sepsis burden',
      status: 'planned',
      items: [
        'Demographic and geographic variation',
        'Temporal trends and burden estimation',
        'Epidemiological and health-metrics methods',
      ],
    },
  ],
};

export const statusLabels = {
  published: 'Published',
  submitted: 'Submitted',
  review: 'Under review',
  ongoing: 'Ongoing',
  planned: 'Planned',
  released: 'Released',
};

const figure = (name, width, height, label, alt, caption) => ({
  src: `/figures/${name}.webp`,
  width,
  height,
  label,
  alt,
  caption,
});

// Each project has a page at /projects/<slug>/. Its personal notes are read
// from content/projects/<slug>.md. `tier` controls placement on the home page.
export const projects = [
  {
    slug: 'clinicaltensorsepsis',
    tier: 'featured',
    title: 'ClinicalTensorSepsis',
    subtitle: 'A harmonized multi-cohort temporal resource for Sepsis-3 research',
    status: 'submitted',
    venue: 'Scientific Data, Data Descriptor · 2026 · Sole author',
    summary: [
      'Adult Sepsis-3 cohorts built from three critical-care databases through separate, source-specific pipelines and mapped to a common representation only where the source data support it. Differences in infection definitions, timing, and measurement evidence are kept visible rather than treated as equivalent.',
      'Observed and reconstructed values are released separately. Hours after follow-up are distinguished from missing data, and every cell records whether it was observed, reconstructed by SAITS, forward filled, median filled, or left unfilled. A cross-database representation aligns CareVue and eICU to MIMIC-IV using clinically constrained optimal transport.',
    ],
    facts: [
      ['ICU stays', '28,169'],
      ['Sources', 'MIMIC-IV 3.1 · MIMIC-III CareVue 1.4 · eICU-CRD 2.0'],
      ['Temporal grid', '50 features × 24 onset-aligned hours'],
      ['Release', 'Submitted to PhysioNet; code on GitHub'],
    ],
    methods: ['Sepsis-3 adjudication', 'Gap-aware SAITS', 'Temporal convolutional encoder', 'Unbalanced optimal transport', 'Docker'],
    links: [{ label: 'Code', href: 'https://github.com/MrRajat1809/ClinicalTensorSepsis' }],
    figures: [
      figure(
        'cts-fig1-cohort-flow',
        2000,
        1320,
        'Fig. 1',
        'Flow diagram in three columns for MIMIC-IV, CareVue, and eICU-CRD, showing patient counts from base cohort through infection screening, operational Sepsis-3 cohort, release, and atlas representation.',
        'Cohort selection and representation retention. Each database is followed from base-cohort selection through infection screening, Sepsis-3 adjudication, temporal release, and atlas construction.'
      ),
      figure(
        'cts-fig3-coverage',
        2000,
        1173,
        'Fig. 3',
        'Heatmap of observation coverage for 50 clinical features in each database, stacked bars of cell provenance, and curves of follow-up availability over 24 hours.',
        'Observation coverage, value provenance, and follow-up availability across the three databases.'
      ),
      figure(
        'cts-fig5-transport',
        2000,
        1435,
        'Fig. 5',
        'Four density panels of CareVue and eICU embeddings on MIMIC-IV principal-component axes before and after transport, with reference contours and open circles for unsupported patients.',
        'Original and adapted temporal representations on MIMIC-IV training principal-component axes. Contours enclose approximately 50%, 80%, and 95% of the reference training density.'
      ),
      figure(
        'cts-fig6-relationships',
        2000,
        2038,
        'Fig. 6',
        'Three circular correlation diagrams of 50 clinical features, one per database, and a scatter plot comparing feature-pair correlations with MIMIC-IV.',
        'Observed clinical feature relationships. Spearman correlations between patient-level mean observed values in each database, and their concordance with MIMIC-IV.'
      ),
    ],
  },
  {
    slug: 'sepsis-36-gene',
    tier: 'featured',
    title: '36-gene blood transcriptomic signature',
    subtitle: 'Captures intrinsic mortality risk in early sepsis',
    status: 'published',
    venue: 'Artificial Intelligence in Emergency Medicine 4 (2026) 100035 · Sole author',
    summary: [
      'A machine learning framework trained on SepsisTensor v1 and restricted to patients with confirmed sepsis and to gene expression alone, without severity scores or demographics. Differential expression, cross-cohort consistency filtering, and XGBoost-based recursive feature elimination selected 36 genes.',
      'The external cohort was kept out of harmonization, feature selection, calibration, and threshold selection. Discrimination there was modest, and the study presents the panel as a molecular baseline for multimodal models rather than a standalone clinical tool.',
    ],
    facts: [
      ['Patients', '1,636 from seven GEO cohorts'],
      ['Internal AUROC', '0.81 ± 0.02 (five-fold CV)'],
      ['External AUROC', '0.66 (95% CI 0.60–0.72)'],
      ['Leave-one-cohort-out', 'Pooled AUROC 0.69, I² = 42.3%'],
      ['External Brier score', '0.208 → 0.177 after isotonic calibration'],
    ],
    methods: ['ComBat harmonization', 'RFECV', 'XGBoost', 'SHAP', 'Isotonic calibration', 'Bootstrap inference'],
    links: [
      { label: 'Article', href: 'https://doi.org/10.1016/j.aiemed.2026.100035' },
      { label: 'Code', href: 'https://github.com/MrRajat1809/genomic_model_sepsis' },
      { label: 'Data', href: 'https://doi.org/10.5281/zenodo.20326923' },
    ],
    figures: [
      figure(
        'gms-graphical-abstract',
        2000,
        1084,
        'Graphical abstract',
        'Graphical abstract with panels for study design, the 36-gene mortality signature, model performance, functional themes, and future scope.',
        'Study design, discovery of the 36-gene signature, model performance, functional themes, and future scope.'
      ),
      figure(
        'gms-fig1-workflow',
        2000,
        987,
        'Fig. 1',
        'Workflow diagram: seven GEO cohorts harmonized into training data and a held-out test cohort, feature selection, and model fitting with external validation.',
        'Study workflow: data harmonization with a separately processed holdout cohort (A), high-dimensional feature reduction (B), and model fitting and evaluation (C).'
      ),
      figure(
        'gms-fig4-enrichment',
        2000,
        1656,
        'Fig. 4',
        'Chord diagrams linking selected genes to enriched GO terms and KEGG pathways, and dot plots of enriched terms.',
        'Functional enrichment of the 36-gene signature: GO and KEGG chord diagrams (A, B) and dot plots ranked by gene ratio and adjusted significance (C, D).'
      ),
      figure(
        'gms-fig7-evaluation',
        2000,
        1198,
        'Fig. 7',
        'Six panels: internal and external ROC curves, calibration curves, subgroup AUROC by sex and age, the RFECV trajectory, and a leave-one-cohort-out forest plot.',
        'Internal and external evaluation, calibration, subgroup performance, feature-elimination trajectory, and leave-one-cohort-out analysis.'
      ),
    ],
  },
  {
    slug: 'sepsistensor',
    tier: 'resource',
    title: 'SepsisTensor v1',
    subtitle: 'A harmonized multi-cohort transcriptomic resource for mortality prediction',
    status: 'released',
    venue: 'Zenodo · Version 1.0 · May 2026',
    summary: [
      'Seven public sepsis cohorts covering 1,636 patients across microarray and RNA-seq platforms, combined into a shared 7,964-gene matrix using identifier mapping, cohort-wise standardization, and ComBat harmonization.',
      'The release provides three analysis-ready tensors: a ComBat-corrected atlas of all cohorts, a training tensor of six cohorts, and an unharmonized holdout cohort kept separate for external validation.',
    ],
    facts: [
      ['Cohorts', 'GSE185263, GSE236713, GSE26440, GSE272769, GSE54514, GSE65682, GSE95233'],
      ['Patients', '1,636 (367 non-survivors, 1,269 survivors)'],
      ['Genes', '7,964 shared across cohorts'],
      ['Holdout', 'GSE65682 (n = 479), not harmonized'],
    ],
    methods: ['GEO retrieval', 'Probe-to-gene mapping', 'Z-score standardization', 'ComBat'],
    links: [{ label: 'Dataset', href: 'https://doi.org/10.5281/zenodo.20326923' }],
    figures: [
      figure(
        'gms-fig2-harmonization',
        2000,
        1874,
        'Fig. 2 of the 36-gene study',
        'Four principal-component scatter plots: cohorts separated before harmonization, mixed after ComBat, and the mortality covariate retained.',
        'Principal component analysis of the integrated atlas before (A) and after (B, C) ComBat harmonization, and the mortality covariate check (D).'
      ),
    ],
  },
  {
    slug: 'egfr-glioblastoma',
    tier: 'other',
    title: 'Structural and regulatory effects of EGFR variants in glioblastoma',
    subtitle: 'Computational study of coding and non-coding EGFR variants',
    status: 'review',
    venue: 'Computers in Biology and Medicine · First author',
    summary: [
      'Coding and non-coding EGFR variants assessed with consensus pathogenicity prediction, structural modeling, docking, molecular dynamics, and chromatin-context analysis.',
      'The analyses cover variant annotation and prioritization, protein structure, molecular docking and dynamics of wild-type and variant EGFR, regulatory predictions, and TCGA expression and clinical associations.',
    ],
    facts: [
      ['Variant sources', 'NCBI dbSNP (coding) · COSMIC v103 (non-coding)'],
      ['Simulated systems', 'Wild-type, V774M, and L861Q EGFR'],
      ['Docking partners', 'Cetuximab, nimotuzumab, erlotinib'],
      ['Authors', 'Kumar P, Singh G, Kaur S, Sharma P'],
    ],
    methods: ['Pathogenicity predictors', 'HADDOCK3', 'AutoDock Vina', 'GROMACS', 'AlphaGenome', 'Enformer'],
    links: [{ label: 'Code', href: 'https://github.com/MrRajat1809/EGFR-GBM' }],
    figures: [
      figure(
        'egfr-fig1-workflow',
        2000,
        1525,
        'Fig. 1',
        'Workflow diagram from SNP retrieval through functional pathogenicity predictors to structural analyses including docking and molecular dynamics.',
        'Overview of variant retrieval, functional annotation, and structural analyses.'
      ),
    ],
  },
];

export const projectPath = (slug) => `/projects/${slug}/`;

export const publications = {
  articles: [
    {
      authors: ['Kumar P'],
      title: '36-gene blood transcriptomic signature captures intrinsic mortality risk in early sepsis.',
      venue: 'Artificial Intelligence in Emergency Medicine',
      details: '2026; 4: 100035.',
      doi: '10.1016/j.aiemed.2026.100035',
      status: 'published',
      code: 'https://github.com/MrRajat1809/genomic_model_sepsis',
      project: 'sepsis-36-gene',
    },
    {
      authors: ['Kumar P'],
      title: 'ClinicalTensorSepsis: a harmonized multi-cohort temporal resource for Sepsis-3 research.',
      venue: 'Scientific Data',
      details: 'Data Descriptor, submitted 2026.',
      status: 'submitted',
      code: 'https://github.com/MrRajat1809/ClinicalTensorSepsis',
      project: 'clinicaltensorsepsis',
    },
    {
      authors: ['Kumar P', 'Singh G', 'Kaur S', 'Sharma P'],
      title: 'Computational study of structural and functional effects of EGFR nsSNPs and ncSNPs in glioblastoma.',
      venue: 'Computers in Biology and Medicine',
      details: 'Under review, 2026.',
      status: 'review',
      code: 'https://github.com/MrRajat1809/EGFR-GBM',
      project: 'egfr-glioblastoma',
    },
  ],
  datasets: [
    {
      authors: ['Kumar P'],
      title: 'SepsisTensor v1: a harmonized multi-cohort transcriptomic resource for mortality prediction.',
      venue: 'Zenodo',
      details: 'Version 1.0, 2026.',
      doi: '10.5281/zenodo.20326923',
      status: 'released',
      project: 'sepsistensor',
    },
  ],
};

export const methods = [
  {
    area: 'Clinical data',
    items: ['MIMIC-IV, MIMIC-III, eICU-CRD', 'Sepsis-3 cohort construction', 'Temporal alignment', 'Measurement harmonization', 'Provenance tracking', 'Cross-database distribution shift'],
  },
  {
    area: 'Statistics and validation',
    items: ['Hypothesis testing', 'Bootstrap inference', 'Calibration analysis', 'External validation', 'Missing-data analysis', 'PCA, PHATE'],
  },
  {
    area: 'Machine learning',
    items: ['Temporal representation learning', 'SAITS', 'Dynamic time warping', 'Optimal transport', 'SHAP', 'scikit-learn, XGBoost, PyTorch'],
  },
  {
    area: 'Computational biology',
    items: ['Transcriptomics', 'GEO', 'Gene-expression harmonization', 'Differential expression', 'Functional enrichment', 'Biopython'],
  },
  {
    area: 'Scientific visualization',
    items: ['Matplotlib', 'R / ggplot2', 'ChimeraX', 'Figma, draw.io', 'Multi-panel figures', 'Scientific schematics'],
  },
  {
    area: 'Programming and environments',
    items: ['Python', 'Bash', 'pandas, NumPy', 'Jupyter', 'Docker', 'Git, GitHub'],
  },
  {
    area: 'Molecular modeling',
    items: ['Molecular dynamics', 'GROMACS', 'AutoDock Vina', 'HADDOCK3', 'PyMOL'],
  },
];

export const about = {
  bio: [
    'I am an undergraduate in Biotechnology Engineering at Chandigarh University. My research uses public transcriptomic and critical-care data to study sepsis outcomes, and I am the sole author of a published transcriptomic mortality signature and of a multi-database clinical resource submitted to Scientific Data.',
    'I also work in structural bioinformatics, including molecular dynamics of disease-associated variants. I intend to extend the sepsis work toward population-level epidemiology and health metrics, and I welcome correspondence about related research.',
  ],
  practice: [
    'Code, environments, and records are released with each project: version-controlled pipelines, Docker images with pinned dependencies, cohort-flow records, data dictionaries, and validation outputs.',
    'External cohorts and test partitions are fixed before harmonization, feature selection, calibration, or imputation-rule selection.',
    'Estimates are reported with their uncertainty: bootstrap intervals, calibration, subgroup analyses, and leave-one-cohort-out validation.',
    'All analyses run on a 4-core, 8 GB workstation with a 4 GB GPU. Reproducing them does not require high-performance computing.',
  ],
  education: [
    {
      title: 'Bachelor of Engineering in Biotechnology',
      org: 'Chandigarh University, Punjab, India',
      period: 'Aug 2024 – Jul 2028',
      detail: 'CGPA 8.24 / 10',
    },
  ],
  experience: [
    {
      title: 'Research Intern',
      org: 'Institute of Bioinformatics and Applied Biotechnology (IBAB), Bengaluru',
      period: 'May – Jun 2026',
      detail: 'Molecular dynamics study of mutation-related structural changes in eye lens proteins. Supervisor: Prof. Jayashree Nagesh.',
    },
  ],
  certification: [
    {
      title: 'NPTEL Structural Biology',
      org: 'Elite + Silver',
      period: 'Jan – Apr 2026',
    },
  ],
};

export const updated = 'October 2026';
