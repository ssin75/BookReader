import "./styles.css";
import $ from "jquery";
import Webcam from "webcam-easy";
import Tesseract from "tesseract.js";

document.getElementById("app").innerHTML = `
<h1>My First Book reader</h1>
<video id="webcam" autoplay playsinline width="640" height="480"></video>
<canvas id="canvas" class="d-none"></canvas>
<audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
<div>
  <button id="buttonFlip">FLIP</button>
  <button id="buttonSnap">Read</button>
</div>
<div id="textFound"></div>
`;

const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);

webcam
  .start()
  .then((result) => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });

$("#buttonFlip").click(function () {
  webcam.flip();
  webcam.start();
});

$("#buttonSnap").click(function () {
  let picture = webcam.snap();
  //$("#screen").src = picture;
  Tesseract.recognize(picture, "eng", { logger: (m) => console.log(m) }).then(
    ({ data: { text } }) => {
      $("#textFound").html(text);
    }
  );
});
