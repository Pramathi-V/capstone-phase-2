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
        csv_file_path = 'D:\capstone-phase-2\Flask\pest_disease_table.csv'
        solution = sol_to_disease(predicted_pest_class, csv_file_path)
        model_path = 'D:\capstone-phase-2\Flask\convolutional_network.pth'
        
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
    app.run(host='0.0.0.0', port=5010, debug=True)  # Set host and port