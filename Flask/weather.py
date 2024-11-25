from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Read the API key from the file
with open("API.txt", "r") as file:
    API_KEY = file.read().strip()

@app.route('/fetch_weather', methods=['GET'])
def fetch_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Missing latitude or longitude"}), 400
    
    # Round the coordinates to two decimal places
    lat = round(float(lat), 2)
    lon = round(float(lon), 2)
    
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(weather_url)
        response.raise_for_status()
        weather_data = response.json()
        
        # Extract relevant data, including wind speed
        formatted_data = {
            "temperature": weather_data.get("main", {}).get("temp"),
            "feels_like": weather_data.get("main", {}).get("feels_like"),
            "humidity": weather_data.get("main", {}).get("humidity"),
            "weather": weather_data["weather"][0]["description"],
            "location": weather_data.get("name"),
            "coordinates": {
                "lat": lat,
                "lon": lon
            },
            "windspeed": weather_data["wind"]["speed"]  # Wind speed directly accessed here
        }
        
        return jsonify(formatted_data), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except KeyError:
        return jsonify({"error": "Missing data in API response"}), 500

if __name__ == '__main__':
    app.run(port=5009, debug=True)
