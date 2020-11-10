// Esto es el modelo de deteccion
let handpose;
// Mi video
let video;
// Puntos de mi mano
let predictions = [];

function setup() {
  // Creo el lienzo
  createCanvas(600, 480, WEBGL);
  // Capturo en tiempo mi webcam
  video = createCapture(VIDEO);
  // Tamaño de Video
  video.size(width, height);
  // Aplicar modelo de IA (detectar Mano)
  handpose = ml5.handpose(video);

  //Escucha a mi web y modelo, detecta una nueva prediccion guarda los punto en el array predicctions
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, -width / 2, -height / 2, width, height);
  translate(-width / 2, -height / 2);
  // DIbuja los puntos de mi mano
  drawKeypoints();
  // lastPrediction obtiene los puntos
  let lastPrediction = getLastPredicction();
  if(lastPrediction!=null){
    // dibuja el cuadrado
    draw_cuadrado(lastPrediction[0],lastPrediction[1], 100);
  }
}

// Dibuja los puntos
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
//Obtiene la prediccion de la pocision de la mano
function getLastPredicction(){
  if(predictions[0] && predictions[0].landmarks){
    return predictions[0].landmarks[2];
  }
  return null;
}
function draw_cuadrado(x,y,z){
  translate(x,y,z);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(80);
  pop();
}