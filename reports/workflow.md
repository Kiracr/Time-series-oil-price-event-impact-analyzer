# Data Analysis Workflow for Brent Oil Price Change Point Analysis

## 1. Data Preparation

- Load Brent oil price data (daily prices from 1987-05-20 to 2022-09-30)
- Clean and preprocess data (handle missing values, format dates)

## 2. Event Research

- Compile major geopolitical, economic, and OPEC-related events (see `event_data/events.csv`)
- Structure event data with dates and descriptions

## 3. Exploratory Analysis

- Visualize time series (trend, volatility)
- Test for stationarity (ADF/KPSS tests)
- Discuss implications for modeling

## 4. Change Point Modeling

- Apply Bayesian Change Point detection using PyMC3
- Identify statistically significant change points

## 5. Event Association

- Compare detected change points with event dates
- Formulate hypotheses about causality

## 6. Quantitative Impact Assessment

- Measure price changes before/after events
- Report impact in terms of mean/volatility shifts

## 7. Communication

- Prepare clear, actionable reports for stakeholders
- Build interactive dashboard for exploration

## Assumptions & Limitations

- Correlation does not imply causation
- Event dates are approximate
- Model results depend on data quality and priors

## Media Channels

- PDF/Markdown reports
- Web-based dashboard
- Presentations to government bodies

---

See `references/` for key academic and industry sources.
