const img_path = 'C:/Users/Hp/Desktop/farmer-crop-health-assist-website/static/AppleScab3.JPG';
class_names=['Apple_scab','Apple_Black_rot','Cedar_apple_rust','healthy_apple',
'healthy_blueberry','healthy_cherry','cherry_Powdery_mildew','corn_cercospora_leaf_spot gray_leaf_spot',
'corn_common_rust','healthy_corn','corn_northern_leaf_blight','grape_black_rot',
'grapes_Esca(black_measles)','healthy_grape','grape_leaf_blight(isariopsis_leaf_spot)','Orange_haunglongbing(citrus_greening)',
'peach_bacterial_spot','peach_healthy','pepper_bell_bacterial_spot','healthy_pepper_bell','potato_early_blight',
'healthy_potato','potato_late_blight','healthy_raspberry','soybean_healthy','squash_powdery_mildew',
'strawberry_healthy','strawberry_leaf_scrorch','tomato_bacterial_spot','tomato_early_blight','tomato_healthy',
'tomato_late_blight','tomato_leaf_mold','tomato_septoria_leaf_spot','tomato_spider_mites two_spotted_spider_mite',
'tomato_target_spot','tomato_mosaic_virus','tomato_yellow_leaf_curl_virus'
]


async function loadImage(img_path){
    const fs=require('fs')
    const imgBuffer = fs.readFileSync(img_path);
    return tf.node.decodeImage(imgBuffer);
}

function preprocessImage(image) {
    return tf.tidy(() => {
      const resizedImage = tf.image.resizeBilinear(image, [256, 256]);
      const processedImage = resizedImage.expandDims(0).toFloat().div(255.0);
      return processedImage;
    });
  }


async function predict_label(img_path){
    const tf=require('@tensorflow/tfjs-node')
    const fs=require('fs')
    const model = await tf.loadLayersModel('model.json')
    const image= await loadImage('C:\Users\Hp\Desktop\farmer-crop-health-assist-website\static\AppleCedarRust1.JPG')
    const processedImage = preprocessImage(image);
    const predictions = model.predict(processedImage);

    // Get the index of the highest prediction probability
    const predictionIdx = predictions.argMax(1).dataSync()[0];
  
    // Return the predicted label
    return class_names[predictionIdx];
  }

  predict_label(img_path).then((predicted_label) => {
    console.log('Predicted Label:', predicted_label);
  });