from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow import keras
from sklearn.metrics import mean_squared_error
import os
from flask_cors import CORS

app_et = Flask(__name__)
CORS(app_et)  # This will allow all domains. You can customize it for specific origins.
# CORS(app_et, resources={r"/predict": {"origins": "http://localhost:3000"}})  # Allow only your React app_et
CORS(app_et, resources={r"/*": {"origins": "http://localhost:3000"}})
# Define the path where models are saved
model_dir = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Evapotranspiration\Model\LSTM_Ours'

# Define the path to your historical weather data CSV
historical_data_path = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Evapotranspiration\Data\evapotranspiration.csv'

@app_et.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from request
    data = request.get_json()

    # Extract parameters
    district = data.get('district')
    date_str = data.get('date')  # Expecting date in format 'YYYY-MM-DD'

    # Load the historical weather data
    historical_data = pd.read_csv(historical_data_path)

    # Filter the data for the specified district and the days leading up to the date
    historical_data['Date'] = pd.to_datetime(historical_data['Date'])
    date = pd.to_datetime(date_str)

    # Get the last few entries before the specified date
    historical_subset = historical_data[(historical_data['District'] == district) & 
                                        (historical_data['Date'] < date)].tail(7)

    # Check if we have enough data
    if len(historical_subset) < 7:
        return jsonify({'error': 'Not enough historical data for prediction.'}), 400

    # Load the app_etropriate model for the district
    model_path = os.path.join(model_dir, f"{district}_model.h5")

    
    if not os.path.exists(model_path):
        print(model_path)
        return jsonify({'error': 'Model not found for the specified district.'}), 404

    model = keras.models.load_model(model_path)  # If using custom metrics, add custom_objects parameter

    # Prepare the input data for the model
    input_data = historical_subset[['Evapotranspiration']].values

    # Reshape the data to match the input shape of the model (1, timesteps, features)
    input_data = input_data.reshape((1, input_data.shape[0], input_data.shape[1]))

    # Make prediction
    prediction = model.predict(input_data)

    # Extract the ET prediction (assuming it's the first output)
    predicted_et = prediction[0][0]

    predicted_et = abs(float(predicted_et))  # Convert to Python float

    # Return the prediction as JSON
    return jsonify({'district': district, 'date': date_str, 'predicted_et': predicted_et})


if __name__ == '__main__':
    app_et.run(debug=True, port=5002)
