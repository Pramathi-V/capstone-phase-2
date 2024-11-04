# i enter weather data
# from flask import Flask, request, jsonify
# import pandas as pd
# import joblib
# from sklearn.ensemble import RandomForestRegressor
# import numpy as np

# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)

# # Load data
# crop_df = pd.read_csv('Crop_yield.csv')
# weather_df = pd.read_csv('combined_weather_timeline.csv')

# # Preprocessing steps
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Fill missing values in weather data
# weather_columns = ['rain', 'temp_min', 'temp_max', 'humidity_min', 'humidity_max', 'wind_speed_min', 'wind_speed_max']
# training_data[weather_columns] = training_data[weather_columns].fillna(training_data[weather_columns].mean())

# # Define ideal ranges
# ideal_kharif_temp_range = (29.48372850343294, 36.14730714954906)
# ideal_kharif_rain_range = (-6.533997843528647, 19.11189797634529)
# ideal_kharif_humidity_range = (83.69195158687744, 101.6759081640585)

# ideal_rabi_temp_range = (29.684383567464913, 37.14657087079207)
# ideal_rabi_rain_range = (-1.5170742632012661, 2.1109902396410507)
# ideal_rabi_humidity_range = (75.45857112315733, 98.70894823844006)

# # Load Random Forest models
# kharif_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# kharif_model_rf.fit(training_data[weather_columns], training_data['Kharif_Yield'])

# rabi_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# rabi_model_rf.fit(training_data[weather_columns], training_data['Rabi_Yield'])

# # Helper function to calculate weather score
# def calculate_weather_score(row, ideal_temp_range, ideal_rain_range, ideal_humidity_range):
#     temp_score = max(0, min(1, (row['temp_max'] - ideal_temp_range[0]) / (ideal_temp_range[1] - ideal_temp_range[0])))
#     rain_score = max(0, min(1, (row['rain'] - ideal_rain_range[0]) / (ideal_rain_range[1] - ideal_rain_range[0])))
#     humidity_score = max(0, min(1, (row['humidity_max'] - ideal_humidity_range[0]) / (ideal_humidity_range[1] - ideal_humidity_range[0])))
#     return (temp_score + rain_score + humidity_score) / 3

# # API Endpoint to predict yields
# @app.route('/predict', methods=['POST'])
# def predict_yield():
#     data = request.get_json()
#     weather_df = pd.DataFrame(data, index=[0])
    
#     # Predict Kharif and Rabi Yields
#     predicted_kharif_yield = kharif_model_rf.predict(weather_df[weather_columns])[0]
#     predicted_rabi_yield = rabi_model_rf.predict(weather_df[weather_columns])[0]
    
#     # Calculate weather scores
#     kharif_score = calculate_weather_score(weather_df.iloc[0], ideal_kharif_temp_range, ideal_kharif_rain_range, ideal_kharif_humidity_range)
#     rabi_score = calculate_weather_score(weather_df.iloc[0], ideal_rabi_temp_range, ideal_rabi_rain_range, ideal_rabi_humidity_range)
    
#     # Adjusted yield predictions
#     adjusted_kharif_yield = predicted_kharif_yield * kharif_score
#     adjusted_rabi_yield = predicted_rabi_yield * rabi_score
    
#     return jsonify({
#         'Predicted_Kharif_Yield': predicted_kharif_yield,
#         'Predicted_Rabi_Yield': predicted_rabi_yield,
#         'Adjusted_Kharif_Yield': adjusted_kharif_yield,
#         'Adjusted_Rabi_Yield': adjusted_rabi_yield
#     })

# # Run Flask app
# if __name__ == '__main__':
#     app.run(debug=True)


# i enter district and date but for only 2024
# from flask import Flask, request, jsonify
# import pandas as pd
# import joblib
# from sklearn.ensemble import RandomForestRegressor
# import numpy as np

# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)

# # Load data
# crop_df = pd.read_csv('Crop_yield.csv')
# weather_df = pd.read_csv('combined_weather_timeline.csv')
# weather_2024_df = pd.read_csv('2024_combined.csv')  # Load the 2024 weather data

# # Preprocessing steps
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Fill missing values in weather data
# weather_columns = ['rain', 'temp_min', 'temp_max', 'humidity_min', 'humidity_max', 'wind_speed_min', 'wind_speed_max']
# training_data[weather_columns] = training_data[weather_columns].fillna(training_data[weather_columns].mean())

# # Define ideal ranges
# ideal_kharif_temp_range = (29.48372850343294, 36.14730714954906)
# ideal_kharif_rain_range = (-6.533997843528647, 19.11189797634529)
# ideal_kharif_humidity_range = (83.69195158687744, 101.6759081640585)

# ideal_rabi_temp_range = (29.684383567464913, 37.14657087079207)
# ideal_rabi_rain_range = (-1.5170742632012661, 2.1109902396410507)
# ideal_rabi_humidity_range = (75.45857112315733, 98.70894823844006)

# # Load Random Forest models
# kharif_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# kharif_model_rf.fit(training_data[weather_columns], training_data['Kharif_Yield'])

# rabi_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# rabi_model_rf.fit(training_data[weather_columns], training_data['Rabi_Yield'])

# # Helper function to calculate weather score
# def calculate_weather_score(row, ideal_temp_range, ideal_rain_range, ideal_humidity_range):
#     temp_score = max(0, min(1, (row['temp_max'] - ideal_temp_range[0]) / (ideal_temp_range[1] - ideal_temp_range[0])))
#     rain_score = max(0, min(1, (row['rain'] - ideal_rain_range[0]) / (ideal_rain_range[1] - ideal_rain_range[0])))
#     humidity_score = max(0, min(1, (row['humidity_max'] - ideal_humidity_range[0]) / (ideal_humidity_range[1] - ideal_humidity_range[0])))
#     return (temp_score + rain_score + humidity_score) / 3

# # API Endpoint to predict yields
# @app.route('/predict', methods=['POST'])
# def predict_yield():
#     data = request.get_json()
#     district = data.get('district')
#     date = data.get('date')
    
#     # Find weather data for the provided district and date
#     weather_row = weather_2024_df[(weather_2024_df['district'] == district) & (weather_2024_df['date'] == date)]
    
#     if weather_row.empty:
#         return jsonify({'error': 'No weather data found for the specified district and date.'}), 400
    
#     # Select relevant weather columns
#     weather_data = weather_row[weather_columns].iloc[0]
#     weather_df = pd.DataFrame([weather_data])  # Prepare data for prediction
    
#     # Predict Kharif and Rabi Yields
#     predicted_kharif_yield = kharif_model_rf.predict(weather_df[weather_columns])[0]
#     predicted_rabi_yield = rabi_model_rf.predict(weather_df[weather_columns])[0]
    
#     # Calculate weather scores
#     kharif_score = calculate_weather_score(weather_data, ideal_kharif_temp_range, ideal_kharif_rain_range, ideal_kharif_humidity_range)
#     rabi_score = calculate_weather_score(weather_data, ideal_rabi_temp_range, ideal_rabi_rain_range, ideal_rabi_humidity_range)
    
#     # Adjusted yield predictions
#     adjusted_kharif_yield = predicted_kharif_yield * kharif_score
#     adjusted_rabi_yield = predicted_rabi_yield * rabi_score
    
#     return jsonify({
#         'Predicted_Kharif_Yield': predicted_kharif_yield,
#         'Predicted_Rabi_Yield': predicted_rabi_yield,
#         'Adjusted_Kharif_Yield': adjusted_kharif_yield,
#         'Adjusted_Rabi_Yield': adjusted_rabi_yield
#     })

# # Run Flask app
# if __name__ == '__main__':
#     app.run(debug=True)


# i enter district and date for any year
# from flask import Flask, request, jsonify
# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# import numpy as np

# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)

# # Load crop and weather data
# crop_df = pd.read_csv('Crop_yield.csv')
# weather_df = pd.read_csv('combined_weather_timeline.csv')
# weather_2024_df = pd.read_csv('2024_combined.csv')  # Load 2024 weather data

# # Preprocess data
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Fill missing values in weather data
# weather_columns = ['rain', 'temp_min', 'temp_max', 'humidity_min', 'humidity_max', 'wind_speed_min', 'wind_speed_max']
# training_data[weather_columns] = training_data[weather_columns].fillna(training_data[weather_columns].mean())

# # Define ideal ranges for scoring
# ideal_kharif_temp_range = (29.5, 36.1)
# ideal_kharif_rain_range = (-6.5, 19.1)
# ideal_kharif_humidity_range = (83.7, 101.7)
# ideal_rabi_temp_range = (29.7, 37.1)
# ideal_rabi_rain_range = (-1.5, 2.1)
# ideal_rabi_humidity_range = (75.5, 98.7)

# # Train Random Forest models for Kharif and Rabi yield prediction
# kharif_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# kharif_model_rf.fit(training_data[weather_columns], training_data['Kharif_Yield'])

# rabi_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# rabi_model_rf.fit(training_data[weather_columns], training_data['Rabi_Yield'])

# # Helper function to calculate weather score
# def calculate_weather_score(row, ideal_temp_range, ideal_rain_range, ideal_humidity_range):
#     temp_score = max(0, min(1, (row['temp_max'] - ideal_temp_range[0]) / (ideal_temp_range[1] - ideal_temp_range[0])))
#     rain_score = max(0, min(1, (row['rain'] - ideal_rain_range[0]) / (ideal_rain_range[1] - ideal_rain_range[0])))
#     humidity_score = max(0, min(1, (row['humidity_max'] - ideal_humidity_range[0]) / (ideal_humidity_range[1] - ideal_humidity_range[0])))
#     return (temp_score + rain_score + humidity_score) / 3

# # API Endpoint to predict yields
# @app.route('/predict', methods=['POST'])
# def predict_yield():
#     data = request.get_json()
#     district = data.get('district')
#     date = data.get('date')
#     year = pd.to_datetime(date).year

#     # Select the appropriate weather dataset
#     if year < 2024:
#         # Use data from combined_weather_timeline.csv
#         weather_row = weather_df[(weather_df['district'] == district) & (weather_df['date'] == date)]
#     else:
#         # Use data from 2024.csv
#         weather_row = weather_2024_df[(weather_2024_df['district'] == district) & (weather_2024_df['date'] == date)]

#     if weather_row.empty:
#         return jsonify({'error': 'No weather data found for the specified district and date.'}), 400

#     # Prepare weather data for prediction
#     weather_data = weather_row[weather_columns].iloc[0]
#     weather_df_for_prediction = pd.DataFrame([weather_data])  # Create DataFrame for prediction

#     # Predict Kharif and Rabi Yields
#     predicted_kharif_yield = kharif_model_rf.predict(weather_df_for_prediction[weather_columns])[0]
#     predicted_rabi_yield = rabi_model_rf.predict(weather_df_for_prediction[weather_columns])[0]

#     # Calculate weather scores
#     kharif_score = calculate_weather_score(weather_data, ideal_kharif_temp_range, ideal_kharif_rain_range, ideal_kharif_humidity_range)
#     rabi_score = calculate_weather_score(weather_data, ideal_rabi_temp_range, ideal_rabi_rain_range, ideal_rabi_humidity_range)

#     # Adjusted yield predictions
#     adjusted_kharif_yield = predicted_kharif_yield * kharif_score
#     adjusted_rabi_yield = predicted_rabi_yield * rabi_score

#     return jsonify({
#         'Predicted_Kharif_Yield': predicted_kharif_yield,
#         'Predicted_Rabi_Yield': predicted_rabi_yield,
#         'Adjusted_Kharif_Yield': adjusted_kharif_yield,
#         'Adjusted_Rabi_Yield': adjusted_rabi_yield
#     })

# # Run Flask app
# if __name__ == '__main__':
#     app.run(debug=True)


# i enter district, and date for any year (sir wala)
# from flask import Flask, request, jsonify
# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import r2_score

# # Initialize Flask app
# app = Flask(__name__)
# from flask_cors import CORS
# CORS(app)


# # Load data
# crop_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\Crop_yield.csv')
# weather_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\combined_weather_timeline.csv')
# growth_stage_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\merged_growth_stages.csv')

# # Data preprocessing
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Define weather columns and fill missing values
# weather_columns = ['rain', 'temp_min', 'temp_max', 'humidity_min', 'humidity_max', 'wind_speed_min', 'wind_speed_max']
# training_data[weather_columns] = training_data[weather_columns].fillna(training_data[weather_columns].mean())

# # Extract monthly optimum ranges for temperature, rain, and humidity
# monthly_optimums = {}
# for month in growth_stage_df['month'].unique():
#     month_data = growth_stage_df[growth_stage_df['month'] == month]
#     if not month_data['Optimum T Max (°C)'].isnull().all() and not month_data['Optimum RH Max (%)'].isnull().all():
#         temp_range = month_data['Optimum T Max (°C)'].iloc[0].split('-')
#         temp_max_range = (float(temp_range[0]), float(temp_range[1])) if len(temp_range) == 2 else (None, None)
#         humidity_range = month_data['Optimum RH Max (%)'].iloc[0].split('-')
#         humidity_max_range = (float(humidity_range[0]), float(humidity_range[1])) if len(humidity_range) == 2 else (None, None)
#         monthly_optimums[month] = {
#             'temp_max': temp_max_range,
#             'rain': float(month_data['Optimum Rain (mm)'].mean()),
#             'humidity_max': humidity_max_range
#         }

# # Function to calculate weather score
# def calculate_weather_score(row):
#     month = row['Month']
#     if month in monthly_optimums:
#         ideal_ranges = monthly_optimums[month]
#         if ideal_ranges['temp_max'] and ideal_ranges['humidity_max']:
#             temp_score = max(0, min(1, (row['temp_max'] - ideal_ranges['temp_max'][0]) / (ideal_ranges['temp_max'][1] - ideal_ranges['temp_max'][0])))
#             rain_score = max(0, min(1, (row['rain'] - ideal_ranges['rain']) / ideal_ranges['rain']))
#             humidity_score = max(0, min(1, (row['humidity_max'] - ideal_ranges['humidity_max'][0]) / (ideal_ranges['humidity_max'][1] - ideal_ranges['humidity_max'][0])))
#             return (temp_score + rain_score + humidity_score) / 3
#     return 0

# # Fit Random Forest models
# features = weather_columns
# target_kharif = training_data['Kharif_Yield']
# target_rabi = training_data['Rabi_Yield']

# kharif_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# kharif_model_rf.fit(training_data[features], target_kharif)

# rabi_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
# rabi_model_rf.fit(training_data[features], target_rabi)

# # API route to predict yields
# @app.route('/predict', methods=['POST'])
# def predict_yields():
#     # Load date and district from the request
#     data = request.get_json()
#     date = data.get('date')
#     district = data.get('district')
    
#     # Validate inputs
#     if not date or not district:
#         return jsonify({"error": "Both 'date' and 'district' are required."}), 400
    
#     # Filter weather data for the given date and district
#     weather_df['date'] = pd.to_datetime(weather_df['date'])
#     input_date = pd.to_datetime(date)
#     weather_data = weather_df[(weather_df['district'] == district) & (weather_df['date'] == input_date)]
    
#     # Check if weather data exists for the given inputs
#     if weather_data.empty:
#         return jsonify({"error": "No weather data found for the given date and district."}), 404
    
#     # Extract weather data and calculate the weather score
#     weather_data = weather_data.iloc[0]  # Take the first matching row
#     future_weather = {
#         'rain': weather_data['rain'],
#         'temp_min': weather_data['temp_min'],
#         'temp_max': weather_data['temp_max'],
#         'humidity_min': weather_data['humidity_min'],
#         'humidity_max': weather_data['humidity_max'],
#         'wind_speed_min': weather_data['wind_speed_min'],
#         'wind_speed_max': weather_data['wind_speed_max'],
#         'Month': input_date.month_name()
#     }
#     future_weather_df = pd.DataFrame([future_weather])
#     future_weather_df['Kharif_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)
#     future_weather_df['Rabi_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)
    
#     # Predict yields
#     future_weather_for_prediction = future_weather_df[features]
#     predicted_kharif_yield_rf = kharif_model_rf.predict(future_weather_for_prediction)[0]
#     predicted_rabi_yield_rf = rabi_model_rf.predict(future_weather_for_prediction)[0]
    
#     # Adjust predictions using the weather scores
#     adjusted_kharif_yield = predicted_kharif_yield_rf * future_weather_df['Kharif_Weather_Score'][0]
#     adjusted_rabi_yield = predicted_rabi_yield_rf * future_weather_df['Rabi_Weather_Score'][0]
    
#     # Return predictions
#     result = {
#         "date": date,
#         "district": district,
#         "Predicted_Kharif_Yield_RF": predicted_kharif_yield_rf,
#         "Adjusted_Kharif_Yield": adjusted_kharif_yield,
#         "Predicted_Rabi_Yield_RF": predicted_rabi_yield_rf,
#         "Adjusted_Rabi_Yield": adjusted_rabi_yield
#     }
#     return jsonify(result)

# # Run the Flask app
# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load data
crop_df = pd.read_csv('Crop_yield.csv')
weather_df = pd.read_csv('combined_weather_timeline.csv')
growth_stage_df = pd.read_csv('merged_growth_stages.csv')
future_weather_df = pd.read_csv('2024_combined.csv')

# Preprocess crop data
crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)

# Preprocess weather data
weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# Fill missing values in weather data
weather_columns = ['rain', 'temp_min', 'temp_max', 'humidity_min', 'humidity_max', 'wind_speed_min', 'wind_speed_max']
training_data[weather_columns] = training_data[weather_columns].fillna(training_data[weather_columns].mean())

# Extract monthly optimum ranges for temperature, rain, and humidity
monthly_optimums = {}
for month in growth_stage_df['month'].unique():
    month_data = growth_stage_df[growth_stage_df['month'] == month]
    if not month_data['Optimum T Max (°C)'].isnull().all() and not month_data['Optimum RH Max (%)'].isnull().all():
        temp_range = month_data['Optimum T Max (°C)'].iloc[0].split('-')
        temp_max_range = (float(temp_range[0]), float(temp_range[1])) if len(temp_range) == 2 else (None, None)
        humidity_range = month_data['Optimum RH Max (%)'].iloc[0].split('-')
        humidity_max_range = (float(humidity_range[0]), float(humidity_range[1])) if len(humidity_range) == 2 else (None, None)
        monthly_optimums[month] = {
            'temp_max': temp_max_range,
            'rain': float(month_data['Optimum Rain (mm)'].mean()),
            'humidity_max': humidity_max_range
        }

# Add a 'Month' column to the future weather data
future_weather_df['Month'] = pd.to_datetime(future_weather_df['date']).dt.month_name()

# Helper function to calculate weather score
def calculate_weather_score(row):
    month = row['Month']
    if month in monthly_optimums:
        ideal_ranges = monthly_optimums[month]
        if ideal_ranges['temp_max'] and ideal_ranges['humidity_max']:
            temp_score = max(0, min(1, (row['temp_max'] - ideal_ranges['temp_max'][0]) / (ideal_ranges['temp_max'][1] - ideal_ranges['temp_max'][0])))
            rain_score = max(0, min(1, (row['rain'] - ideal_ranges['rain']) / ideal_ranges['rain']))
            humidity_score = max(0, min(1, (row['humidity_max'] - ideal_ranges['humidity_max'][0]) / (ideal_ranges['humidity_max'][1] - ideal_ranges['humidity_max'][0])))
            return (temp_score + rain_score + humidity_score) / 3
    return 0

# Calculate weather scores
future_weather_df['Kharif_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)
future_weather_df['Rabi_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)

# Train Random Forest models
kharif_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
kharif_model_rf.fit(training_data[weather_columns], training_data['Kharif_Yield'])

rabi_model_rf = RandomForestRegressor(n_estimators=100, random_state=42)
rabi_model_rf.fit(training_data[weather_columns], training_data['Rabi_Yield'])

# API Endpoint to predict yields
@app.route('/predict', methods=['POST'])
def predict_yield():
    data = request.get_json()
    district = data.get('district')
    date = data.get('date')
    year = pd.to_datetime(date).year

    # Select the appropriate weather dataset
    if year < 2024:
        weather_row = weather_df[(weather_df['district'] == district) & (weather_df['date'] == date)]
    else:
        weather_row = future_weather_df[(future_weather_df['district'] == district) & (future_weather_df['date'] == date)]

    if weather_row.empty:
        return jsonify({'error': 'No weather data found for the specified district and date.'}), 400

    # Prepare weather data for prediction
    weather_data = weather_row[weather_columns].iloc[0]
    weather_df_for_prediction = pd.DataFrame([weather_data])

    # Predict Kharif and Rabi Yields
    predicted_kharif_yield = kharif_model_rf.predict(weather_df_for_prediction)[0]
    predicted_rabi_yield = rabi_model_rf.predict(weather_df_for_prediction)[0]

    # Calculate weather scores
    month_name = pd.to_datetime(date).month_name()
    kharif_score = calculate_weather_score({'Month': month_name, **weather_data})
    rabi_score = calculate_weather_score({'Month': month_name, **weather_data})

    # Adjusted yield predictions
    adjusted_kharif_yield = predicted_kharif_yield * kharif_score
    adjusted_rabi_yield = predicted_rabi_yield * rabi_score

    return jsonify({
        'Predicted_Kharif_Yield': predicted_kharif_yield,
        'Predicted_Rabi_Yield': predicted_rabi_yield,
        'Adjusted_Kharif_Yield': adjusted_kharif_yield,
        'Adjusted_Rabi_Yield': adjusted_rabi_yield
    })

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
