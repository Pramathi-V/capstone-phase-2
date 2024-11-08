# from flask import Flask, request, jsonify
# import logging
# import torch
# from torchvision import transforms
# import joblib
# from PIL import Image
# from torchvision import models

# app = Flask(__name__)
# logging.basicConfig(level=logging.DEBUG)

# # Load the ResNet model without the final fully connected layer
# resnet = models.resnet18(weights='DEFAULT')
# resnet = torch.nn.Sequential(*list(resnet.children())[:-1])  # Removing the last layer

# # Load the state dictionary
# # Update the torch.load call with weights_only=True
# state_dict = torch.load('resnet_feature_extractor.pth', weights_only=True)
# resnet.load_state_dict(state_dict)
# resnet.eval()

# # Load Random Forest model
# rf_model = joblib.load('random_forest_model.joblib')

# # Image preprocessing function
# def preprocess_image(image):
#     transform = transforms.Compose([
#         transforms.Resize((224, 224)),
#         transforms.ToTensor(),
#         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
#     ])
#     image = transform(image).unsqueeze(0)  # Add batch dimension
#     return image

# # Function to extract features
# def extract_features_from_image(image_path):
#     image = Image.open(image_path).convert('RGB')
#     image_tensor = preprocess_image(image)
#     return image_tensor

# @app.route('/Pest_disease', methods=['POST'])
# def predict():
#     try:
#         if 'file' not in request.files:
#             return jsonify({"error": "No file part in the request"}), 400

#         image_file = request.files['file']
#         if image_file.filename == '':
#             return jsonify({"error": "No file selected"}), 400

#         # Open and process the image
#         image = Image.open(image_file).convert('RGB')
#         image_tensor = preprocess_image(image)

#         # Extract features
#         with torch.no_grad():
#             features = resnet(image_tensor).squeeze().cpu().numpy()

#         # Make a prediction using the Random Forest model
#         prediction = rf_model.predict([features])[0]

#         # Define pest classes and solutions
#         pest_classes = [
#             "rice leaf roller", "rice leaf caterpillar", "paddy stem maggot",
#             "Asiatic rice borer", "yellow rice borer", "rice gall midge",
#             "brown plant hopper", "rice stem fly", "rice water weevil",
#             "rice leaf hopper", "rice shell pest", "thrips"
#         ]
#         predicted_pest_class = pest_classes[prediction]

#         solutions = {
#             "rice leaf roller": "Use Bacillus thuringiensis-based biopesticides.",
#             "rice leaf caterpillar": "Apply chemical control if infestation is severe.",
#             "paddy stem maggot": "Use insecticides early to prevent population buildup.",
#             "Asiatic rice borer": "Use resistant varieties and biological control agents.",
#             "yellow rice borer": "Apply insecticides at the tillering stage if necessary.",
#             "rice gall midge": "Use resistant rice varieties and control weeds.",
#             "brown plant hopper": "Apply systemic insecticides and avoid over-fertilization.",
#             "rice stem fly": "Plant at the recommended density to reduce infestation risk.",
#             "rice water weevil": "Drain the field to manage water levels effectively.",
#             "rice leaf hopper": "Use insecticides and maintain a balanced nitrogen level.",
#             "rice shell pest": "Remove affected grains and control using pesticides.",
#             "thrips": "Maintain field moisture to deter thrips."
#         }


#         solution = solutions.get(predicted_pest_class, "No solution available.")

#         return jsonify({
#             "pest": predicted_pest_class,
#             "solution": solution
#         })

#     except Exception as e:
#         logging.error(f"Error occurred: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
import logging
import torch
from torchvision import transforms, models
from PIL import Image
import pandas as pd

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Define the model architecture
# Example using ResNet18; modify if your architecture differs
model = models.resnet18(pretrained=False)  # Load your base architecture
num_features = model.fc.in_features
model.fc = torch.nn.Linear(num_features, len(["rice leaf roller", "rice leaf caterpillar", "paddy stem maggot", "Asiatic rice borer", "yellow rice borer", "rice gall midge", "brown plant hopper", "rice stem fly", "rice water weevil", "rice leaf hopper", "rice shell pest", "thrips"]))  # Adjust the number of classes

# Load the state dictionary
# Load the state dictionary
state_dict = torch.load('pest_detection_model.pth')

# If the state dictionary keys are prefixed with "model.", remove the prefix
new_state_dict = {k.replace("model.", ""): v for k, v in state_dict.items()}

# Load the modified state dictionary into the model
model.load_state_dict(new_state_dict)

model.eval()

# Load pest and disease solutions from the CSV file
def load_solutions_from_csv(file_path):
    df = pd.read_csv(file_path)
    pest_solutions = {}
    disease_solutions = {}

    # Parse the CSV content to extract pest and disease solutions
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

# Load solutions
pest_solutions, disease_solutions = load_solutions_from_csv('pest_disease_table.csv')

# Image preprocessing function
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = transform(image).unsqueeze(0)  # Add batch dimension
    return image

@app.route('/Pest_disease', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        image_file = request.files['file']
        if image_file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Open and process the image
        image = Image.open(image_file).convert('RGB')
        image_tensor = preprocess_image(image)

        # Make a prediction using the loaded model
        with torch.no_grad():
            outputs = model(image_tensor)
            prediction = torch.argmax(outputs, dim=1).item()

        # Define pest classes (Make sure these match your model's classes)
        pest_classes = [
            "rice leaf roller", "rice leaf caterpillar", "paddy stem maggot", "Asiatic rice borer", "yellow rice borer", "rice gall midge", "brown plant hopper", "rice stem fly", "rice water weevil", "rice leaf hopper", "rice shell pest", "thrips"
        ]
        predicted_pest_class = pest_classes[prediction].lower()

        # Get the solution for the predicted pest
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
