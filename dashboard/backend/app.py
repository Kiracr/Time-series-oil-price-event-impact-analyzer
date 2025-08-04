from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Load Brent oil price data and event data
DATA_PATH = os.path.join(os.path.dirname(__file__), '../../data/BrentOilPrices.csv')
EVENT_PATH = os.path.join(os.path.dirname(__file__), '../../event_data/events.csv')

data = pd.read_csv(DATA_PATH)
data['Date'] = pd.to_datetime(data['Date'], errors='coerce')
events = pd.read_csv(EVENT_PATH)
events['Date'] = pd.to_datetime(events['Date'], errors='coerce')

@app.route('/api/prices', methods=['GET'])
def get_prices():
    start = request.args.get('start')
    end = request.args.get('end')
    df = data.copy()
    if start:
        df = df[df['Date'] >= pd.to_datetime(start)]
    if end:
        df = df[df['Date'] <= pd.to_datetime(end)]
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/events', methods=['GET'])
def get_events():
    events_with_id = events.copy()
    events_with_id['id'] = events_with_id.index
    return jsonify(events_with_id.to_dict(orient='records'))

@app.route('/api/highlight', methods=['GET'])
def highlight_event():
    event_id = request.args.get('id')
    if event_id is None:
        return jsonify({'error': 'Missing event id'}), 400
    try:
        event_id_int = int(event_id)
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid event id'}), 400
    if event_id_int not in events.index:
        return jsonify({'error': 'Event id not found'}), 404
    event_row = events.loc[event_id_int]
    event_date = event_row['Date']
    window = pd.Timedelta(days=30)
    price_window = data[(data['Date'] >= event_date - window) & (data['Date'] <= event_date + window)]
    return jsonify({
        'event': event_row.to_dict(),
        'prices': price_window.to_dict(orient='records')
    })

@app.route('/api/indicators', methods=['GET'])
def get_indicators():
    # Example: volatility, average price change around events
    indicators = {}
    indicators['volatility'] = float(data['Price'].pct_change().std())
    indicators['avg_price_change'] = float(data['Price'].pct_change().mean())
    return jsonify(indicators)

if __name__ == '__main__':
    app.run(debug=True)
