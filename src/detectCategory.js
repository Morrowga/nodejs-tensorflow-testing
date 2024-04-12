const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');

let model; 

(async () => {
    try {
      await tf.ready();
      model = await cocoSsd.load();
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error.message);
    }
  })();


async function initializeDetection(imageBuffer)
{
    const objects = await detectObjects(imageBuffer);

    return objects
}

async function detectObjects(imageBuffer) {
    const image = tf.node.decodeImage(imageBuffer);
    const predictions = await model.detect(image);
    return predictions.map(prediction => ({
      class: prediction.class,
      score: prediction.score
    }));
  }


module.exports = initializeDetection;
