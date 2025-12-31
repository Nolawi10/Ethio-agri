# Plant Disease Detection Model

Standalone TensorFlow Lite model for plant disease detection. This module is separate from the web application and can be used independently.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

```python
from plant_disease_model import PlantDiseaseDetector

# Initialize detector
detector = PlantDiseaseDetector(model_path='plant_disease_model.tflite')

# Predict from an image
result = detector.predict('path/to/plant_image.jpg')

if result['success']:
    print(f"Prediction: {result['class']}")
    print(f"Confidence: {result['confidence']:.2%}")
    
    # Get recommendations
    recommendations = detector.get_recommendations(result['class'])
    for rec in recommendations:
        print(f"  - {rec}")
```

### Command Line Usage

```bash
python plant_disease_model.py <path_to_image.jpg>
```

## Model Training (Future Implementation)

To create a real model:

1. **Collect Data**: Gather labeled images of healthy and diseased plants
2. **Preprocess**: Resize, augment, and normalize images
3. **Train**: Use TensorFlow/Keras to train a CNN model
4. **Convert**: Convert trained model to TensorFlow Lite format

Example conversion code:
```python
import tensorflow as tf

# Load your trained model
model = tf.keras.models.load_model('trained_model.h5')

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save
with open('plant_disease_model.tflite', 'wb') as f:
    f.write(tflite_model)
```

## Current Status

Currently, this is a placeholder implementation that demonstrates the structure and API. To use in production:

1. Train a real model on plant disease datasets
2. Convert the model to TensorFlow Lite format
3. Update the `class_names` list to match your model's classes
4. Replace the placeholder prediction logic

## Model Architecture Suggestions

For plant disease detection, consider:
- MobileNetV2 (lightweight, good for mobile)
- EfficientNet (high accuracy)
- Custom CNN (trained on your specific dataset)

Input size: 224x224 pixels (RGB)
Output: Probability distribution over disease classes

