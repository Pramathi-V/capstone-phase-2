# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import pandas as pd
# # import numpy as np
# # import keras
# # import pickle
# # import os
# # from shapely.geometry import Point, shape
# # import geopandas as gpd

# # app = Flask(__name__)

# # # Load district shapes and weather data
# # district_shapes = gpd.read_file(r'C:\Users\anves\OneDrive\Documents\GitHub\capstone-phase-2\Flask\district_coordinates.csv')  # Ensure it contains geometries
# # training_data_agg = pd.read_csv('aggregated_training_data.csv')
# # validation_data_agg = pd.read_csv('aggregated_validation_data.csv')


# # def get_district_name_from_coords(lat, lon):
# #     point = Point(lon, lat)
# #     for _, row in district_shapes.iterrows():
# #         district_shape = shape(row['geometry'])
# #         if district_shape.contains(point):
# #             return row['district']
# #     return None

# # def predict_for_date(district_name, date):
# #     # Load model and scaler
# #     model_dir = f"models/{district_name}"
# #     model = keras.models.load_model(os.path.join(model_dir, f"{district_name}_model.h5"))
# #     with open(os.path.join(model_dir, f"{district_name}_scaler.pkl"), 'rb') as f:
# #         scaler = pickle.load(f)
    
# #     # Select data based on the date
# #     data_agg = training_data_agg if date < pd.to_datetime('2024-01-01') else validation_data_agg
# #     district_data = data_agg[(data_agg['District'] == district_name) & 
# #                              (pd.to_datetime(data_agg['Date']) < date)].sort_values('Date').tail(30)
# #     if len(district_data) < 30:
# #         raise ValueError("Not enough data to predict for this district and date.")
    
# #     scaled_data = scaler.transform(district_data[['Rain (mm)', 'Min Temp (°C)', 'Max Temp (°C)',
# #                                                   'Min Humidity (%)', 'Max Humidity (%)',
# #                                                   'Min Wind Speed (Kmph)', 'Max Wind Speed (Kmph)']])
# #     X_input = np.array([scaled_data])
# #     predicted_scaled = model.predict(X_input)
# #     return scaler.inverse_transform(predicted_scaled)[0]

# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     data = request.json
# #     latitude, longitude = data['latitude'], data['longitude']
# #     date = pd.to_datetime(data['date'])
    
# #     district_name = get_district_name_from_coords(latitude, longitude)
# #     if not district_name:
# #         return jsonify({'error': 'Coordinates do not match any known district'}), 400
    
# #     try:
# #         predicted_values = predict_for_date(district_name, date)
# #         result = {
# #             'Rain (mm)': float(predicted_values[0]),
# #             'Min Temp (°C)': float(predicted_values[1]),
# #             'Max Temp (°C)': float(predicted_values[2]),
# #             'Min Humidity (%)': float(predicted_values[3]),
# #             'Max Humidity (%)': float(predicted_values[4]),
# #             'Min Wind Speed (Kmph)': float(predicted_values[5]),
# #             'Max Wind Speed (Kmph)': float(predicted_values[6])
# #         }
# #         return jsonify(result)
# #     except ValueError as e:
# #         return jsonify({'error': str(e)}), 400

# # if __name__ == '__main__':
# #     app.run(debug=True)

# import re

# # Parse and convert geometry from string format to Shapely Polygon
# def parse_geometry(geometry_str):
#     # Use regex to extract coordinate pairs from the POLYGON string
#     coords = re.findall(r"([-+]?\d*\.\d+|\d+)", geometry_str)
    
#     # Convert to list of tuples (longitude, latitude)
#     coord_pairs = [(float(coords[i]), float(coords[i+1])) for i in range(0, len(coords), 2)]
    
#     # Return a Polygon object
#     return Polygon(coord_pairs)


# from flask import Flask, render_template, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# import keras
# import pickle
# import os
# from shapely.geometry import Point, Polygon
# import ast  # to safely convert geometry from string to list

# app = Flask(__name__)
# CORS(app)

# # Load aggregated data for training and validation
# training_data_agg = pd.read_csv(r'C:\Users\anves\OneDrive\Documents\GitHub\capstone-phase-2\Flask\aggregated_training_data.csv')
# validation_data_agg = pd.read_csv(r'C:\Users\anves\OneDrive\Documents\GitHub\capstone-phase-2\Flask\aggregated_validation_data.csv')

# # Load district geometries
# district_data = pd.read_csv(r'C:\Users\anves\OneDrive\Documents\GitHub\capstone-phase-2\Flask\district_coordinates.csv')

# # # Convert district geometries to Shapely Polygons
# # district_data['geometry'] = district_data['geometry'].apply(
# #     lambda geom: Polygon(ast.literal_eval(geom.replace('POLYGON ((', '').replace('))', '')))
# # )


# # Apply parse_geometry to the geometry column
# district_data['geometry'] = district_data['geometry'].apply(parse_geometry)
                                                            
# def get_district_from_coordinates(lat, lon):
#     point = Point(lon, lat)  # Create Point with (longitude, latitude)
#     for _, row in district_data.iterrows():
#         if row['geometry'].contains(point):
#             return row['district']
#     return None

# def predict_for_date(district_name, date):
#     # Load model and scaler
#     model_dir = f"models/{district_name}"
#     model = keras.models.load_model(os.path.join(model_dir, f"{district_name}_model.h5"))
#     with open(os.path.join(model_dir, f"{district_name}_scaler.pkl"), 'rb') as f:
#         scaler = pickle.load(f)
    
#     # Select data based on the date
#     data_agg = training_data_agg if date < pd.to_datetime('2024-01-01') else validation_data_agg
#     district_data = data_agg[(data_agg['District'] == district_name) & 
#                              (pd.to_datetime(data_agg['Date']) < date)].sort_values('Date').tail(30)
#     if len(district_data) < 30:
#         raise ValueError("Not enough data to predict for this district and date.")
    
#     scaled_data = scaler.transform(district_data[['Rain (mm)', 'Min Temp (°C)', 'Max Temp (°C)',
#                                                   'Min Humidity (%)', 'Max Humidity (%)',
#                                                   'Min Wind Speed (Kmph)', 'Max Wind Speed (Kmph)']])
#     X_input = np.array([scaled_data])
#     predicted_scaled = model.predict(X_input)
#     return scaler.inverse_transform(predicted_scaled)[0]

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get JSON data from request
#     data = request.json
#     latitude = float(data['latitude'])
#     longitude = float(data['longitude'])
#     date = pd.to_datetime(data['date'])

#     # Find district based on latitude and longitude
#     district_name = get_district_from_coordinates(latitude, longitude)
#     if not district_name:
#         return jsonify({'error': 'Location is not within any known district.'}), 400

#     try:
#         # Call your prediction function
#         predicted_values = predict_for_date(district_name, date)
        
#         # Format the prediction results
#         result = {
#             'Rain (mm)': float(predicted_values[0]),
#             'Min Temp (°C)': float(predicted_values[1]),
#             'Max Temp (°C)': float(predicted_values[2]),
#             'Min Humidity (%)': float(predicted_values[3]),
#             'Max Humidity (%)': float(predicted_values[4]),
#             'Min Wind Speed (Kmph)': float(predicted_values[5]),
#             'Max Wind Speed (Kmph)': float(predicted_values[6])
#         }
        
#         return jsonify(result)
    
#     except ValueError as e:
#         return jsonify({'error': 'Valueerror' + str(e)}), 400

# if __name__ == '__main__':
#     app.run(port=5000)

from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow import keras
from sklearn.metrics import mean_squared_error
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all domains. You can customize it for specific origins.
# CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})  # Allow only your React app
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Define the path where models are saved
model_dir = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Weather\Model\LSTM_ours'

# Define the path to your historical weather data CSV
historical_data_path = r'C:\Anna_Data_D_files\sem6\z_capstone\Agriculture\A_Phase_2\final_review\Models_Code\Weather\Data\weather_data.csv'

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get JSON data from request
#     data = request.get_json()

#     # Extract parameters
#     district = data.get('district')
#     date_str = data.get('date')  # Expecting date in format 'YYYY-MM-DD'

#     # Load the historical weather data
#     historical_data = pd.read_csv(historical_data_path)

#     # Filter the data for the specified district and the days leading up to the date
#     historical_data['Date'] = pd.to_datetime(historical_data['Date'])
#     date = pd.to_datetime(date_str)

#     # Get the last few entries before the specified date
#     historical_subset = historical_data[(historical_data['District'] == district) &
#                                         (historical_data['Date'] < date)].tail(7)  # Adjust the tail size as needed

#     # Check if we have enough data
#     if len(historical_subset) < 7:
#         return jsonify({'error': 'Not enough historical data for prediction.'}), 400

#     # Load the appropriate model for the district
#     model_path = os.path.join(model_dir, f"{district}_model_file.h5")
    
#     if not os.path.exists(model_path):
#         return jsonify({'error': 'Model not found for the specified district.'}), 404

#     model = keras.models.load_model(model_path, custom_objects={'mse': keras.metrics.mean_squared_error})

#     # Prepare the input data for the model
#     input_data = historical_subset[['Min Temp (°C)', 'Max Temp (°C)', 'Min Humidity (%)', 
#                                      'Max Humidity (%)', 'Min Wind Speed (Kmph)', 
#                                      'Max Wind Speed (Kmph)']].values

#     # Reshape the data to match the input shape of the model (1, timesteps, features)
#     input_data = input_data.reshape((1, input_data.shape[0], input_data.shape[1]))

#     # Make prediction
#     prediction = model.predict(input_data)

#     # Extract the Rain prediction (assuming it's the first output)
#     predicted_rain = prediction[0][0]  # Adjust index based on your model's output

#     # Return the prediction as JSON
#     return jsonify({'district': district, 'date': date_str, 'predicted_rain': predicted_rain})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

@app.route('/predict', methods=['POST'])
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

    # Load the appropriate model for the district
    model_path = os.path.join(model_dir, f"{district}_model_file.h5")
    
    if not os.path.exists(model_path):
        return jsonify({'error': 'Model not found for the specified district.'}), 404

    model = keras.models.load_model(model_path)  # If using custom metrics, add custom_objects parameter

    # Prepare the input data for the model
    input_data = historical_subset[["Rain (mm)",'Min Temp (°C)', 'Max Temp (°C)', 'Min Humidity (%)', 
                                     'Max Humidity (%)', 'Min Wind Speed (Kmph)', 
                                     'Max Wind Speed (Kmph)']].values

    # Reshape the data to match the input shape of the model (1, timesteps, features)
    input_data = input_data.reshape((1, input_data.shape[0], input_data.shape[1]))

    # Make prediction
    prediction = model.predict(input_data)

    # Extract the Rain prediction (assuming it's the first output)
    predicted_rain = prediction[0][0]

    predicted_rain = abs(float(predicted_rain))  # Convert to Python float

    # Return the prediction as JSON
    return jsonify({'district': district, 'date': date_str, 'predicted_rain': predicted_rain})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
