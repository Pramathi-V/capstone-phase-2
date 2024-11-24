from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow import keras
from sklearn.metrics import mean_squared_error
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

model_dir = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Weather\Model\LSTM_ours'

historical_data_path = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Weather\Data\weather_data.csv'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    district = data.get('district')
    date_str = data.get('date')

    historical_data = pd.read_csv(historical_data_path)

    historical_data['Date'] = pd.to_datetime(historical_data['Date'])
    date = pd.to_datetime(date_str)

    historical_subset = historical_data[(historical_data['District'] == district) & 
                                        (historical_data['Date'] < date)].tail(7)

    if len(historical_subset) < 7:
        return jsonify({'error': 'Not enough historical data for prediction.'}), 400

    model_path = os.path.join(model_dir, f"{district}_model_file.h5")
    
    if not os.path.exists(model_path):
        return jsonify({'error': 'Model not found for the specified district.'}), 404

    model = keras.models.load_model(model_path) 

    input_data = historical_subset[["Rain (mm)",'Min Temp (°C)', 'Max Temp (°C)', 'Min Humidity (%)', 
                                     'Max Humidity (%)', 'Min Wind Speed (Kmph)', 
                                     'Max Wind Speed (Kmph)']].values


    input_data = input_data.reshape((1, input_data.shape[0], input_data.shape[1]))
    prediction = model.predict(input_data)
    predicted_rain = prediction[0][0]
    predicted_rain = abs(float(predicted_rain))
    
    return jsonify({'district': district, 'date': date_str, 'predicted_rain': predicted_rain})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
