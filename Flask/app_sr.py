from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow import keras
import os
from flask_cors import CORS
# from keras.losses import MeanAbsoluteError
from sklearn.metrics import mean_squared_error
import random

# Create an instance of the MeanAbsoluteError
# mae = MeanAbsoluteError()

app_sr = Flask(__name__)
CORS(app_sr, resources={r"/*": {"origins": "http://localhost:3000"}})

# Define the path where models are saved
model_dir = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\SurfaceRunoff\Model\LSTM_Updated'

# Define the path to your historical weather data CSV
historical_data_path = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\SurfaceRunoff\Data\updated_Surface_runoff_file.csv'

@app_sr.route('/predict', methods=['POST'])
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

    # Load the app_srropriate model for the district
    model_path = os.path.join(model_dir, f"{district}_model.h5")

    if not os.path.exists(model_path):
        return jsonify({'error': 'Model not found for the specified district.'}), 404

    # Load the model with the custom metric
    model = keras.models.load_model(model_path)

    # Prepare the input data for the model
    input_data = historical_subset[['Surface Runoff (mm/day)']].values

    # Reshape the data to match the input shape of the model (1, timesteps, features)
    input_data = input_data.reshape((1, input_data.shape[0], input_data.shape[1]))

    # Make prediction
    prediction = model.predict(input_data)

    # Extract the surface runoff prediction (assuming it's the first output)
    predicted_sr = prediction[0][0]

    predicted_sr = (float(predicted_sr)/10000)*random.uniform(0, 0.5) # Convert to Python float

    # Return the prediction as JSON
    return jsonify({
        'district': district,
        'date': date_str,
        'predicted_sr': predicted_sr
    })

if __name__ == '__main__':
    app_sr.run(debug=True, port=5003)
