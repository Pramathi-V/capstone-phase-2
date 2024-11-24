from flask import Flask, request, jsonify
import logging
import torch
from torchvision import transforms, models
from PIL import Image
import pandas as pd

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

model = models.resnet18(pretrained=False)  
num_features = model.fc.in_features
model.fc = torch.nn.Linear(num_features, len(["rice leaf roller", "rice leaf caterpillar", "paddy stem maggot", "Asiatic rice borer", "yellow rice borer", "rice gall midge", "brown plant hopper", "rice stem fly", "rice water weevil", "rice leaf hopper", "rice shell pest", "thrips"]))  # Adjust the number of classes

state_dict = torch.load('pest_detection_model.pth')

new_state_dict = {k.replace("model.", ""): v for k, v in state_dict.items()}

model.load_state_dict(new_state_dict)

model.eval()

def load_solutions_from_csv(file_path):
    df = pd.read_csv(file_path)
    pest_solutions = {}
    disease_solutions = {}
    for _, row in df.iterrows():
        pest_name = row.get('PEST', '').strip().lower()
        pest_solution = row.get('Solution for PEST', '').strip()
        if pest_name and pest_solution:
            pest_solutions[pest_name] = pest_solution

        disease_name = row.get('DISEASE', '').strip().lower()
        disease_solution = row.get('Solution for DISEASE', '').strip()
        if disease_name and disease_solution:
            disease_solutions[disease_name] = disease_solution

    return pest_solutions, disease_solutions

pest_solutions, disease_solutions = load_solutions_from_csv('pest_disease_table.csv')

def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = transform(image).unsqueeze(0)  
    return image

@app.route('/Pest_disease', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        image_file = request.files['file']
        if image_file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        image = Image.open(image_file).convert('RGB')
        image_tensor = preprocess_image(image)

        with torch.no_grad():
            outputs = model(image_tensor)
            prediction = torch.argmax(outputs, dim=1).item()

        pest_classes = [
            "rice leaf roller", "rice leaf caterpillar", "paddy stem maggot", "Asiatic rice borer", "yellow rice borer", "rice gall midge", "brown plant hopper", "rice stem fly", "rice water weevil", "rice leaf hopper", "rice shell pest", "thrips"
        ]
        predicted_pest_class = pest_classes[prediction].lower()

        solution = pest_solutions.get(predicted_pest_class, "No solution available.")

        return jsonify({
            "pest": predicted_pest_class,
            "solution": solution
        })

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
