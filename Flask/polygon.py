from flask import Flask, request, jsonify
import geopandas as gpd
from shapely.geometry import Point

app = Flask(__name__)
from flask_cors import CORS

CORS(app)

vector_file_path = r"C:\Pramathi\CAPSTONE_mine\capstone-phase-2\Flask\31-01-2023.geojson"

def find_district(latitude, longitude):
    gdf = gpd.read_file(vector_file_path)
    point = Point(longitude, latitude)
    for _, row in gdf.iterrows():
        if point.within(row['geometry']):
            return row['district_name']
    return "Out of Telangana"

@app.route('/find_district', methods=['POST'])
def district_endpoint():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    if latitude is None or longitude is None:
        return jsonify({'error': 'Invalid input'}), 400

    district_name = find_district(latitude, longitude)
    return jsonify({'district': district_name})

if __name__ == '__main__':
    app.run(debug=True)
