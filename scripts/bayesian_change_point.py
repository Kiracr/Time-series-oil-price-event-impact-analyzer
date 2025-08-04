"""
Bayesian Change Point Detection for Brent Oil Prices
---------------------------------------------------
This script loads Brent oil price data, computes log returns, and applies a Bayesian change point model using PyMC3 to detect structural breaks. It also associates detected change points with major events and quantifies their impact.
"""
import pandas as pd
import numpy as np
import pymc3 as pm
import matplotlib.pyplot as plt
import seaborn as sns

# Load Brent oil price data
data = pd.read_csv('data/BrentOilPrices.csv')
data['Date'] = pd.to_datetime(data['Date'], format='%d-%b-%y')
data = data.sort_values('Date')

# Compute log returns for stationarity
prices = data['Price'].values
log_returns = np.log(prices[1:] / prices[:-1])
dates = data['Date'].values[1:]

# Plot price and log returns
def plot_series():
    plt.figure(figsize=(14, 6))
    plt.subplot(2, 1, 1)
    plt.plot(data['Date'], data['Price'])
    plt.title('Brent Oil Price Over Time')
    plt.ylabel('Price (USD)')
    plt.subplot(2, 1, 2)
    plt.plot(dates, log_returns)
    plt.title('Log Returns Over Time')
    plt.ylabel('Log Return')
    plt.tight_layout()
    plt.show()

plot_series()

# Bayesian Change Point Model
with pm.Model() as model:
    tau = pm.DiscreteUniform('tau', lower=0, upper=len(log_returns)-1)
    mu_1 = pm.Normal('mu_1', mu=np.mean(log_returns), sd=np.std(log_returns))
    mu_2 = pm.Normal('mu_2', mu=np.mean(log_returns), sd=np.std(log_returns))
    sigma = pm.HalfNormal('sigma', sd=np.std(log_returns))
    mu = pm.math.switch(tau >= np.arange(len(log_returns)), mu_1, mu_2)
    obs = pm.Normal('obs', mu=mu, sd=sigma, observed=log_returns)
    trace = pm.sample(2000, tune=1000, target_accept=0.95, random_seed=42)

# Diagnostics
pm.plot_trace(trace)
plt.show()
summary = pm.summary(trace)
print(summary)

# Posterior of change point
tau_samples = trace['tau']
plt.figure(figsize=(10, 4))
sns.histplot(tau_samples, bins=50, kde=True)
plt.title('Posterior Distribution of Change Point (tau)')
plt.xlabel('Index of Change Point')
plt.ylabel('Frequency')
plt.show()

# Map change point index to date
change_date = dates[int(np.median(tau_samples))]
print(f"Most probable change point date: {change_date}")

# Quantify impact
mu_1_samples = trace['mu_1']
mu_2_samples = trace['mu_2']
mean_before = np.mean(mu_1_samples)
mean_after = np.mean(mu_2_samples)
print(f"Mean log return before change: {mean_before:.5f}")
print(f"Mean log return after change: {mean_after:.5f}")
impact = (mean_after - mean_before) / abs(mean_before) * 100
print(f"Percent change in mean log return: {impact:.2f}%")

# Associate with events
# Load event data
events = pd.read_csv('../event_data/events.csv')
events['Date'] = pd.to_datetime(events['Date'])
window = pd.Timedelta(days=30)
nearby_events = events[(events['Date'] >= change_date - window) & (events['Date'] <= change_date + window)]
print("Events near detected change point:")
print(nearby_events[['Date', 'Event', 'Description']])

# Save results
with open('../reports/change_point_results.txt', 'w') as f:
    f.write(f"Most probable change point date: {change_date}\n")
    f.write(f"Mean log return before change: {mean_before:.5f}\n")
    f.write(f"Mean log return after change: {mean_after:.5f}\n")
    f.write(f"Percent change in mean log return: {impact:.2f}%\n")
    f.write("Events near detected change point:\n")
    nearby_events[['Date', 'Event', 'Description']].to_string(f)

# --- End of script ---
