# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import r2_score
# import numpy as np
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load the CSV data
# crop_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\Crop_yield.csv')
# weather_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\combined_weather_timeline.csv')
# growth_stage_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\merged_growth_stages.csv')
# future_weather_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\2024_combined.csv')

# # Data preprocessing
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Fill missing values in weather data
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

# future_weather_df['Month'] = pd.to_datetime(future_weather_df['date']).dt.month_name()
# future_weather_df['temp_max_30d_avg'] = future_weather_df['temp_max'].rolling(window=30, min_periods=1).mean()
# future_weather_df['rain_30d_sum'] = future_weather_df['rain'].rolling(window=30, min_periods=1).sum()
# future_weather_df['humidity_max_30d_avg'] = future_weather_df['humidity_max'].rolling(window=30, min_periods=1).mean()

# def calculate_weather_score(row):
#     month = row['Month']
#     if month in monthly_optimums:
#         ideal_ranges = monthly_optimums[month]
#         if ideal_ranges['temp_max'] and ideal_ranges['humidity_max']:
#             temp_score = max(0, min(1, (row['temp_max_30d_avg'] - ideal_ranges['temp_max'][0]) / (ideal_ranges['temp_max'][1] - ideal_ranges['temp_max'][0])))
#             rain_score = max(0, min(1, (row['rain_30d_sum'] - ideal_ranges['rain']) / ideal_ranges['rain']))
#             humidity_score = max(0, min(1, (row['humidity_max_30d_avg'] - ideal_ranges['humidity_max'][0]) / (ideal_ranges['humidity_max'][1] - ideal_ranges['humidity_max'][0])))
#             weighted_score = 0.6 + 0.4 * ((temp_score + rain_score + humidity_score) / 3)
#             return weighted_score
#     return 1

# future_weather_df['Kharif_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)
# future_weather_df['Rabi_Weather_Score'] = future_weather_df.apply(lambda row: calculate_weather_score(row), axis=1)

# features = weather_columns
# target_kharif = training_data['Kharif_Yield']
# target_rabi = training_data['Rabi_Yield']

# kharif_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
# kharif_model_rf.fit(training_data[features], target_kharif)
# rabi_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
# rabi_model_rf.fit(training_data[features], target_rabi)

# r2_kharif_rf = r2_score(target_kharif, kharif_model_rf.predict(training_data[features]))
# r2_rabi_rf = r2_score(target_rabi, rabi_model_rf.predict(training_data[features]))

# @app.route('/predict_yield', methods=['POST'])
# def predict_yield():
#     input_json = request.get_json()
#     input_df = pd.DataFrame(input_json)
    
#     input_df['Month'] = pd.to_datetime(input_df['date']).dt.month_name()
#     input_df['temp_max_30d_avg'] = input_df['temp_max'].rolling(window=30, min_periods=1).mean()
#     input_df['rain_30d_sum'] = input_df['rain'].rolling(window=30, min_periods=1).sum()
#     input_df['humidity_max_30d_avg'] = input_df['humidity_max'].rolling(window=30, min_periods=1).mean()
    
#     input_df['Kharif_Weather_Score'] = input_df.apply(lambda row: calculate_weather_score(row), axis=1)
#     input_df['Rabi_Weather_Score'] = input_df.apply(lambda row: calculate_weather_score(row), axis=1)
    
#     predicted_kharif_yield = kharif_model_rf.predict(input_df[features])
#     predicted_rabi_yield = rabi_model_rf.predict(input_df[features])
    
#     input_df['Predicted_Kharif_Yield'] = predicted_kharif_yield
#     input_df['Predicted_Rabi_Yield'] = predicted_rabi_yield
#     input_df['Adjusted_Kharif_Yield'] = predicted_kharif_yield * input_df['Kharif_Weather_Score']
#     input_df['Adjusted_Rabi_Yield'] = predicted_rabi_yield * input_df['Rabi_Weather_Score']
    
#     result = input_df[['date', 'Predicted_Kharif_Yield', 'Adjusted_Kharif_Yield', 'Predicted_Rabi_Yield', 'Adjusted_Rabi_Yield']].to_dict(orient='records')
#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)


# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import r2_score
# import numpy as np
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load the CSV data
# crop_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\Crop_yield.csv')
# weather_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\combined_weather_timeline.csv')
# growth_stage_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\merged_growth_stages.csv')
# future_weather_df = pd.read_csv(r'D:\Riya\Capstone\crop-yield-predictor\2024_combined.csv')

# # Data preprocessing
# crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
# weather_df['Year'] = pd.to_datetime(weather_df['date']).dt.year
# training_data = pd.merge(crop_df, weather_df, left_on=['District', 'Year'], right_on=['district', 'Year'], how='inner')

# # Fill missing values in weather data
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

# def calculate_weather_score(row):
#     month = row['Month']
#     if month in monthly_optimums:
#         ideal_ranges = monthly_optimums[month]
#         if ideal_ranges['temp_max'] and ideal_ranges['humidity_max']:
#             temp_score = max(0, min(1, (row['temp_max_30d_avg'] - ideal_ranges['temp_max'][0]) / (ideal_ranges['temp_max'][1] - ideal_ranges['temp_max'][0])))
#             rain_score = max(0, min(1, (row['rain_30d_sum'] - ideal_ranges['rain']) / ideal_ranges['rain']))
#             humidity_score = max(0, min(1, (row['humidity_max_30d_avg'] - ideal_ranges['humidity_max'][0]) / (ideal_ranges['humidity_max'][1] - ideal_ranges['humidity_max'][0])))
#             weighted_score = 0.6 + 0.4 * ((temp_score + rain_score + humidity_score) / 3)
#             return weighted_score
#     return 1

# features = weather_columns
# target_kharif = training_data['Kharif_Yield']
# target_rabi = training_data['Rabi_Yield']

# kharif_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
# kharif_model_rf.fit(training_data[features], target_kharif)
# rabi_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
# rabi_model_rf.fit(training_data[features], target_rabi)

# @app.route('/predict_yield', methods=['POST'])
# def predict_yield():
#     input_json = request.get_json()
#     district = input_json.get("district")
#     date = input_json.get("date")
    
#     # Filter the weather data for the given district and date
#     weather_data = weather_df[(weather_df['district'] == district) & (weather_df['date'] <= date)].copy()
#     weather_data['date'] = pd.to_datetime(weather_data['date'])
#     weather_data.sort_values(by='date', inplace=True)
    
#     # Calculate 30-day rolling averages/sums
#     weather_data['temp_max_30d_avg'] = weather_data['temp_max'].rolling(window=30, min_periods=1).mean()
#     weather_data['rain_30d_sum'] = weather_data['rain'].rolling(window=30, min_periods=1).sum()
#     weather_data['humidity_max_30d_avg'] = weather_data['humidity_max'].rolling(window=30, min_periods=1).mean()
    
#     # Get the latest entry after rolling calculation
#     latest_weather = weather_data.iloc[-1]
#     latest_weather['Month'] = latest_weather['date'].month_name()
    
#     # Calculate weather scores
#     latest_weather['Kharif_Weather_Score'] = calculate_weather_score(latest_weather)
#     latest_weather['Rabi_Weather_Score'] = calculate_weather_score(latest_weather)
    
#     # Prepare input for prediction
#     input_features = latest_weather[features].values.reshape(1, -1)
#     predicted_kharif_yield = kharif_model_rf.predict(input_features)[0]
#     predicted_rabi_yield = rabi_model_rf.predict(input_features)[0]
    
#     adjusted_kharif_yield = predicted_kharif_yield * latest_weather['Kharif_Weather_Score']
#     adjusted_rabi_yield = predicted_rabi_yield * latest_weather['Rabi_Weather_Score']
    
#     result = {
#         "district": district,
#         "date": date,
#         "Predicted_Kharif_Yield": predicted_kharif_yield,
#         "Adjusted_Kharif_Yield": adjusted_kharif_yield,
#         "Predicted_Rabi_Yield": predicted_rabi_yield,
#         "Adjusted_Rabi_Yield": adjusted_rabi_yield
#     }
#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)


import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the CSV data
crop_df = pd.read_csv(r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\Crop_yield.csv')
weather_df = pd.read_csv(r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\combined_weather_timeline.csv')
growth_stage_df = pd.read_csv(r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\merged_growth_stages.csv')
future_weather_df = pd.read_csv(r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\2024_combined.csv')

# Data preprocessing
crop_df['Year'] = crop_df['Year'].str.split(' - ').str[0].astype(int)
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

def calculate_weather_score(row):
    month = row['Month']
    if month in monthly_optimums:
        ideal_ranges = monthly_optimums[month]
        if ideal_ranges['temp_max'] and ideal_ranges['humidity_max']:
            temp_score = max(0, min(1, (row['temp_max_30d_avg'] - ideal_ranges['temp_max'][0]) / (ideal_ranges['temp_max'][1] - ideal_ranges['temp_max'][0])))
            rain_score = max(0, min(1, (row['rain_30d_sum'] - ideal_ranges['rain']) / ideal_ranges['rain']))
            humidity_score = max(0, min(1, (row['humidity_max_30d_avg'] - ideal_ranges['humidity_max'][0]) / (ideal_ranges['humidity_max'][1] - ideal_ranges['humidity_max'][0])))
            weighted_score = 0.6 + 0.4 * ((temp_score + rain_score + humidity_score) / 3)
            return weighted_score
    return 1

features = weather_columns
target_kharif = training_data['Kharif_Yield']
target_rabi = training_data['Rabi_Yield']

kharif_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
kharif_model_rf.fit(training_data[features], target_kharif)
rabi_model_rf = RandomForestRegressor(n_estimators=200, max_depth=20, random_state=42)
rabi_model_rf.fit(training_data[features], target_rabi)

@app.route('/predict_yield', methods=['POST'])
def predict_yield():
    input_json = request.get_json()
    district = input_json.get("district")
    date = input_json.get("date")
    
    # Convert date to datetime
    input_date = pd.to_datetime(date)
    
    # Separate historical and future data, then combine them
    historical_data = weather_df[weather_df['district'] == district]
    future_data = future_weather_df[future_weather_df['district'] == district]
    
    # Filter data based on the date range
    combined_weather_data = pd.concat([historical_data, future_data], ignore_index=True)
    combined_weather_data['date'] = pd.to_datetime(combined_weather_data['date'])
    combined_weather_data.sort_values(by='date', inplace=True)
    
    # Ensure the data is filtered up to the specified date
    combined_weather_data = combined_weather_data[combined_weather_data['date'] <= input_date]
    
    # Calculate 30-day rolling averages/sums on the combined data
    combined_weather_data['temp_max_30d_avg'] = combined_weather_data['temp_max'].rolling(window=30, min_periods=1).mean()
    combined_weather_data['rain_30d_sum'] = combined_weather_data['rain'].rolling(window=30, min_periods=1).sum()
    combined_weather_data['humidity_max_30d_avg'] = combined_weather_data['humidity_max'].rolling(window=30, min_periods=1).mean()
    
    # Get the latest entry for predictions
    latest_weather = combined_weather_data.iloc[-1]
    latest_weather['Month'] = latest_weather['date'].month_name()
    
    # Calculate weather scores
    latest_weather['Kharif_Weather_Score'] = calculate_weather_score(latest_weather)
    latest_weather['Rabi_Weather_Score'] = calculate_weather_score(latest_weather)
    
    # Prepare input for prediction
    input_features = latest_weather[features].values.reshape(1, -1)
    predicted_kharif_yield = kharif_model_rf.predict(input_features)[0]
    predicted_rabi_yield = rabi_model_rf.predict(input_features)[0]
    
    adjusted_kharif_yield = predicted_kharif_yield * latest_weather['Kharif_Weather_Score']
    adjusted_rabi_yield = predicted_rabi_yield * latest_weather['Rabi_Weather_Score']
    
    result = {
        "district": district,
        "date": date,
        "Predicted_Kharif_Yield": predicted_kharif_yield,
        "Adjusted_Kharif_Yield": adjusted_kharif_yield,
        "Predicted_Rabi_Yield": predicted_rabi_yield,
        "Adjusted_Rabi_Yield": adjusted_rabi_yield
    }
    return jsonify(result)



################
from flask import Flask, jsonify, request
from flask_cors import CORS
import torch
from torchvision import transforms, models
from PIL import Image
import pandas as pd
import logging
from disease import predict_image

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

# Load the ResNet model and adjust for pest classification
model = models.resnet18(pretrained=False)
num_features = model.fc.in_features
model.fc = torch.nn.Linear(num_features, 12)  # Adjust for 12 pest classes

# Load the model state with correction for "model." prefix
state_dict = torch.load('pest_detection_model.pth')
new_state_dict = {k.replace("model.", ""): v for k, v in state_dict.items()}
model.load_state_dict(new_state_dict)
model.eval()


# Image preprocessing function
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0)  # Add batch dimension

@app.route('/Pest_disease', methods=['POST'])
def pest_disease_detection():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        image_file = request.files['file']
        if image_file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Process the image and predict
        image = Image.open(image_file).convert('RGB')
        image_tensor = preprocess_image(image)
        
        with torch.no_grad():
            outputs = model(image_tensor)
            prediction = torch.argmax(outputs, dim=1).item()

        # Define pest classes
        pest_classes = [
            "rice leaf roller", "rice leaf caterpillar", "paddy stem maggot", 
            "Asiatic rice borer", "yellow rice borer", "rice gall midge", 
            "brown plant hopper", "rice stem fly", "rice water weevil", 
            "rice leaf hopper", "rice shell pest", "thrips"
        ]
        predicted_pest_class = pest_classes[prediction].lower()
        csv_file_path = r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\pest_disease_table.csv'
        solution = sol_to_disease(predicted_pest_class, csv_file_path)
        model_path = r'D:\\PES_Classes\\Sem7\\SMC\\capstone-phase-2\\Flask\\convolutional_network.pth'
        
        disease_prediction = predict_image(image_file, model_path)
        disease_solution = sol_to_disease(disease_prediction.lower(),csv_file_path)
        print("Hello")
        print(disease_solution)

        dict_json = jsonify({
            "pest": predicted_pest_class,
            "solution": solution,
            "Disease":disease_prediction,
            "Dsol":disease_solution
        })
        print("Dsol: ",dict_json)
        print("Successful",dict_json)
        return dict_json

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

def sol_to_disease(disease_name, csv_file_path):
    df = pd.read_csv(csv_file_path)

    # Iterate over each row and column to find the disease name
    found = False
    for idx, row in df.iterrows():
        for col in df.columns:
            if row[col] == disease_name:
                # Get the index of the column with the disease name
                disease_col_idx = df.columns.get_loc(col)
                
                # Check if there is a next column in the same row
                if disease_col_idx + 1 < len(df.columns):
                    next_col = df.columns[disease_col_idx + 1]
                    return row[next_col]
                found = True
        if found:
            break

    return ''

if __name__ == '__main__':
    app.run(debug=True)
