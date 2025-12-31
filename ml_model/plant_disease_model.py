"""
Standalone TensorFlow Lite model for plant disease detection.
This is a separate script that can be used independently from the web application.
"""

import numpy as np
from PIL import Image
import tensorflow as tf
import os
from pathlib import Path

class PlantDiseaseDetector:
    """
    A simple plant disease detection model using TensorFlow Lite.
    This is a placeholder that demonstrates the structure.
    In production, you would train a model and convert it to TFLite format.
    """
    
    def __init__(self, model_path=None):
        """
        Initialize the detector.
        
        Args:
            model_path: Path to the .tflite model file (optional)
        """
        self.model_path = model_path
        self.interpreter = None
        self.input_details = None
        self.output_details = None
        
        # Placeholder class names for plant diseases
        # In production, these would match your trained model's classes
        self.class_names = [
            'Healthy',
            'Nitrogen Deficiency',
            'Potassium Deficiency',
            'Phosphorus Deficiency',
            'Leaf Rust',
            'Fungal Disease',
            'Aphid Infestation',
            'Bacterial Blight'
        ]
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        else:
            print("Warning: No model file provided. Using placeholder predictions.")
    
    def load_model(self, model_path):
        """Load the TensorFlow Lite model"""
        try:
            self.interpreter = tf.lite.Interpreter(model_path=model_path)
            self.interpreter.allocate_tensors()
            self.input_details = self.interpreter.get_input_details()
            self.output_details = self.interpreter.get_output_details()
            print(f"Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
            self.interpreter = None
    
    def preprocess_image(self, image_path, target_size=(224, 224)):
        """
        Preprocess image for model input.
        
        Args:
            image_path: Path to the image file
            target_size: Target image size (width, height)
        
        Returns:
            Preprocessed image array
        """
        try:
            # Load and resize image
            img = Image.open(image_path)
            img = img.convert('RGB')
            img = img.resize(target_size)
            
            # Convert to array and normalize
            img_array = np.array(img, dtype=np.float32)
            img_array = img_array / 255.0  # Normalize to [0, 1]
            
            # Add batch dimension
            img_array = np.expand_dims(img_array, axis=0)
            
            return img_array
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            return None
    
    def predict(self, image_path):
        """
        Predict plant disease from an image.
        
        Args:
            image_path: Path to the image file
        
        Returns:
            Dictionary with prediction results
        """
        # Preprocess image
        input_data = self.preprocess_image(image_path)
        
        if input_data is None:
            return {
                'success': False,
                'message': 'Failed to preprocess image'
            }
        
        if self.interpreter is None:
            # Placeholder prediction when no model is loaded
            # In production, remove this and ensure model is loaded
            predicted_class_idx = np.random.randint(0, len(self.class_names))
            confidence = np.random.uniform(0.75, 0.95)
            
            return {
                'success': True,
                'class': self.class_names[predicted_class_idx],
                'confidence': float(confidence),
                'class_index': int(predicted_class_idx),
                'message': 'Using placeholder prediction (no model loaded)'
            }
        
        # Run inference
        try:
            # Set input tensor
            self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
            
            # Run inference
            self.interpreter.invoke()
            
            # Get output
            output_data = self.interpreter.get_tensor(self.output_details[0]['index'])
            
            # Get predicted class and confidence
            predicted_class_idx = np.argmax(output_data[0])
            confidence = output_data[0][predicted_class_idx]
            
            return {
                'success': True,
                'class': self.class_names[predicted_class_idx],
                'confidence': float(confidence),
                'class_index': int(predicted_class_idx),
                'all_probabilities': {
                    self.class_names[i]: float(output_data[0][i])
                    for i in range(len(self.class_names))
                }
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'Prediction error: {str(e)}'
            }
    
    def get_recommendations(self, predicted_class):
        """
        Get treatment recommendations based on predicted disease.
        
        Args:
            predicted_class: The predicted disease class
        
        Returns:
            List of recommendation strings
        """
        recommendations_map = {
            'Healthy': [
                'Continue current care practices',
                'Monitor regularly for any changes'
            ],
            'Nitrogen Deficiency': [
                'Apply urea fertilizer at 100 kg per hectare',
                'Apply fertilizer after rainfall',
                'Monitor progress in 2 weeks'
            ],
            'Potassium Deficiency': [
                'Apply potassium-rich fertilizer',
                'Conduct soil test for detailed analysis'
            ],
            'Phosphorus Deficiency': [
                'Apply DAP or superphosphate fertilizer',
                'Ensure proper soil pH (6.0-7.0)'
            ],
            'Leaf Rust': [
                'Apply copper-based fungicide',
                'Remove infected leaves',
                'Check surrounding plants'
            ],
            'Fungal Disease': [
                'Apply fungicide treatment',
                'Improve water drainage',
                'Remove infected plants'
            ],
            'Aphid Infestation': [
                'Use organic pesticides',
                'Introduce beneficial insects',
                'Monitor daily'
            ],
            'Bacterial Blight': [
                'Apply copper-based bactericide',
                'Remove and destroy infected parts',
                'Avoid overhead watering'
            ]
        }
        
        return recommendations_map.get(predicted_class, [
            'Consult with agricultural expert',
            'Monitor plant condition closely'
        ])


def create_dummy_model(output_path='plant_disease_model.tflite'):
    """
    Create a dummy TFLite model for demonstration.
    In production, you would train a real model and convert it.
    
    Args:
        output_path: Path to save the dummy model
    """
    print("Creating dummy model structure...")
    print("Note: This is a placeholder. In production, train a real model using:")
    print("1. Collect and label plant disease images")
    print("2. Train a model using TensorFlow/Keras")
    print("3. Convert to TFLite using tf.lite.TFLiteConverter")
    print(f"\nModel would be saved to: {output_path}")
    print("\nFor now, the detector will use placeholder predictions.")


def example_usage():
    """Example of how to use the PlantDiseaseDetector"""
    print("=" * 60)
    print("Plant Disease Detection - Example Usage")
    print("=" * 60)
    
    # Initialize detector
    detector = PlantDiseaseDetector()
    
    # Example: Predict from an image
    # Replace with actual image path
    image_path = "sample_plant_image.jpg"
    
    if os.path.exists(image_path):
        print(f"\nAnalyzing image: {image_path}")
        result = detector.predict(image_path)
        
        if result['success']:
            print(f"\nPrediction Results:")
            print(f"  Class: {result['class']}")
            print(f"  Confidence: {result['confidence']:.2%}")
            
            recommendations = detector.get_recommendations(result['class'])
            print(f"\nRecommendations:")
            for i, rec in enumerate(recommendations, 1):
                print(f"  {i}. {rec}")
        else:
            print(f"Error: {result['message']}")
    else:
        print(f"\nImage not found: {image_path}")
        print("Please provide a valid image path to test the detector.")
        print("\nExample prediction structure:")
        print(f"  Class: Healthy")
        print(f"  Confidence: 95.5%")
        print(f"  Recommendations:")
        print(f"    1. Continue current care practices")
        print(f"    2. Monitor regularly for any changes")


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        # If image path provided as argument
        image_path = sys.argv[1]
        detector = PlantDiseaseDetector()
        result = detector.predict(image_path)
        
        if result['success']:
            print(f"Prediction: {result['class']} (Confidence: {result['confidence']:.2%})")
            recommendations = detector.get_recommendations(result['class'])
            print("\nRecommendations:")
            for rec in recommendations:
                print(f"  - {rec}")
        else:
            print(f"Error: {result['message']}")
    else:
        # Show example usage
        example_usage()
        
        print("\n" + "=" * 60)
        print("To use with an image:")
        print(f"  python plant_disease_model.py <path_to_image.jpg>")
        print("=" * 60)

