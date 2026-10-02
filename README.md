```text
 ____       _                       _             _  __
|  _ \ _ __(_)_   _  __ _ _ __  ___| |__  _   _  | |/ /   _ _ __ ___   __ _ _ __
| |_) | '__| | | | |/ _` | '_ \/ __| '_ \| | | | | ' / | | | '_ ` _ \ / _` | '__|
|  __/| |  | | |_| | (_| | | | \__ \ | | | |_| | | . \ |_| | | | | | | (_| | |
|_|   |_|  |_|\__, |\__,_|_| |_|___/_| |_|\__,_| |_|\_\__,_|_| |_| |_|\__,_|_|
              |___/

  sepsis research  ·  clinical data science
  B.E. Biotechnology, Chandigarh University, Punjab, India
```

[Portfolio](https://mrrajat1809.github.io/priyanshu_portfolio/) · [ORCID](https://orcid.org/0009-0004-1576-027X) · [GitHub](https://github.com/MrRajat1809) · [LinkedIn](https://linkedin.com/in/priyanshu-kumar1809) · [24bbe10100@cuchd.in](mailto:24bbe10100@cuchd.in)

I study sepsis using blood transcriptomic and critical-care data. My work covers multi-cohort harmonization, Sepsis-3 cohort construction, temporal reconstruction of clinical measurements, and mortality modeling with external validation. The aim is to connect patient-level biological and clinical findings to population-level patterns of sepsis burden.

## Research program

```text
  scale         work                                                  status
  ────────────  ────────────────────────────────────────────────────  ─────────
  molecular     SepsisTensor v1 · 36-gene mortality signature         published
      │
  clinical      ClinicalTensorSepsis · 28,169 ICU stays, 3 databases  submitted
      │
  patient       cross-database prediction, calibration, phenotypes    ongoing
      │
  population    sepsis burden across demographics, place, time        planned
```

Each project builds a documented resource first and models it second. The transcriptomic study asked how much mortality signal blood gene expression carries on its own; its conclusion called for models that add clinical data, which led to the critical-care resource.

## Selected work

### ClinicalTensorSepsis

*A harmonized multi-cohort temporal resource for Sepsis-3 research.* Scientific Data, Data Descriptor, submitted 2026. Sole author.

Adult Sepsis-3 cohorts from MIMIC-IV 3.1, MIMIC-III CareVue 1.4, and eICU-CRD 2.0, built through source-specific pipelines: 28,169 ICU stays, 50 clinical features, 24 onset-aligned hours. Observed and reconstructed values are released separately, every cell records its provenance, and a cross-database representation aligns CareVue and eICU with MIMIC-IV using clinically constrained optimal transport.

```text
  one ICU stay on the release grid (illustrative)

  hour          0     6     12    18   23
                |     |     |     |    |
  HR            ####++##########+###////
  MAP           #########+##########////
  Lactate       ~~~#>>>>>#>>>>>#>>>>////
  Creatinine    #+++++++#+++++++#+++////
  GCS motor     .#...#...#...#...#..////
                                    ^^^^ after follow-up: never filled

  # observed   + SAITS   > forward fill   ~ median   . unfilled
```

[Code](https://github.com/MrRajat1809/ClinicalTensorSepsis) · [Project page](https://mrrajat1809.github.io/priyanshu_portfolio/projects/clinicaltensorsepsis/)

### 36-gene blood transcriptomic signature

*Captures intrinsic mortality risk in early sepsis.* Artificial Intelligence in Emergency Medicine 4 (2026) 100035. Sole author.

A mortality model trained on gene expression alone in 1,636 patients with confirmed sepsis from seven GEO cohorts. The external cohort was kept out of harmonization, feature selection, calibration, and threshold selection; discrimination there was modest (AUROC 0.66, 95% CI 0.60–0.72), and the panel is presented as a molecular baseline for multimodal models rather than a standalone clinical tool.

[Article](https://doi.org/10.1016/j.aiemed.2026.100035) · [Code](https://github.com/MrRajat1809/genomic_model_sepsis) · [Data](https://doi.org/10.5281/zenodo.20326923) · [Project page](https://mrrajat1809.github.io/priyanshu_portfolio/projects/sepsis-36-gene/)

### SepsisTensor v1

*A harmonized multi-cohort transcriptomic resource for mortality prediction.* Zenodo, version 1.0, 2026. Seven public cohorts, 1,636 patients, and a shared 7,964-gene matrix across microarray and RNA-seq platforms, with an unharmonized holdout cohort for external validation.

[Dataset](https://doi.org/10.5281/zenodo.20326923) · [Project page](https://mrrajat1809.github.io/priyanshu_portfolio/projects/sepsistensor/)

### Other research

Structural and regulatory effects of EGFR variants in glioblastoma: coding and non-coding variants assessed with pathogenicity prediction, docking, molecular dynamics, and chromatin context. Computers in Biology and Medicine, under review. First author. [Code](https://github.com/MrRajat1809/EGFR-GBM)

## Publications

1. **Kumar P.** 36-gene blood transcriptomic signature captures intrinsic mortality risk in early sepsis. *Artificial Intelligence in Emergency Medicine.* 2026; 4: 100035. [doi:10.1016/j.aiemed.2026.100035](https://doi.org/10.1016/j.aiemed.2026.100035)
2. **Kumar P.** ClinicalTensorSepsis: a harmonized multi-cohort temporal resource for Sepsis-3 research. *Scientific Data.* Submitted, 2026.
3. **Kumar P**, Singh G, Kaur S, Sharma P. Computational study of structural and functional effects of EGFR nsSNPs and ncSNPs in glioblastoma. *Computers in Biology and Medicine.* Under review, 2026.

**Dataset.** **Kumar P.** SepsisTensor v1: a harmonized multi-cohort transcriptomic resource for mortality prediction. *Zenodo.* Version 1.0, 2026. [doi:10.5281/zenodo.20326923](https://doi.org/10.5281/zenodo.20326923)

## Why sepsis

```text
  deaths per 100,000, age-standardized, both sexes, 2017

  Central African Republic  ████████████████████████████████████  1,081.4
  Nigeria                   ██████████████                          431.0
  India                     ██████████                              297.7
  Brazil                    ███                                     103.4
  China                     █                                        43.3
  United States             █                                        35.1
  Switzerland               █                                        18.0

  worldwide: 11.0 million sepsis-related deaths, 19.7% of all deaths (95% UI 18.2–21.4)
```

Source: Rudd KE, et al. Global, regional, and national sepsis incidence and mortality, 1990–2017: analysis for the Global Burden of Disease Study. *Lancet* 2020; 395: 200–11. [doi:10.1016/S0140-6736(19)32989-7](https://doi.org/10.1016/S0140-6736(19)32989-7). CC BY 4.0.

## Methods and tools

```text
  clinical data        MIMIC-IV · MIMIC-III · eICU-CRD · Sepsis-3 cohorts · provenance
  statistics           bootstrap inference · calibration · external validation
                       missing-data analysis · PCA · PHATE
  machine learning     SAITS · temporal representation learning · optimal transport
                       dynamic time warping · SHAP · XGBoost · scikit-learn · PyTorch
  computational bio    transcriptomics · GEO · harmonization · differential expression
  visualization        Matplotlib · ggplot2 · ChimeraX · Figma · draw.io
  environment          Python · Bash · pandas · NumPy · Jupyter · Docker · Git
  molecular modeling   molecular dynamics · GROMACS · AutoDock Vina · HADDOCK3 · PyMOL
```

## Working practice

- Code, environments, and records are released with each project: version-controlled pipelines, Docker images with pinned dependencies, cohort-flow records, data dictionaries, and validation outputs.
- External cohorts and test partitions are fixed before harmonization, feature selection, calibration, or imputation-rule selection.
- Estimates are reported with their uncertainty: bootstrap intervals, calibration, subgroup analyses, and leave-one-cohort-out validation.
- Everything runs on a 4-core, 8 GB workstation with a 4 GB GPU; reproducing it does not require high-performance computing.

## Path

```text
  2024  ┬  B.E. Biotechnology, Chandigarh University (Aug 2024 – Jul 2028)
        │  CGPA 8.24
        │
  2026  ├  NPTEL Structural Biology, Elite + Silver (Jan – Apr 2026)
        ├  SepsisTensor v1 released on Zenodo (May 2026)
        ├  Research Intern, IBAB Bengaluru (May – Jun 2026)
        │  molecular dynamics of mutation-related changes in eye lens proteins
        ├  36-gene signature published in Artificial Intelligence in Emergency Medicine
        └  ClinicalTensorSepsis submitted to Scientific Data (Sep 2026)
```

---

<sub>The source of the portfolio site is in [site/](site/).</sub>
