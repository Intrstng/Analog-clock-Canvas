let canvas;
let radius;
let now = new Date();
let second = now.getSeconds();
let minute = now.getMinutes();
let hour = now.getHours() % 12 || 12;


window.onload = function() {
  canvas = document.getElementById('clock');
  adaptiveResizeCanvas();
  // findCenterOfClockFace();
  drawClockCanvas();
}
window.onresize = function() {
  adaptiveResizeCanvas();
  // findCenterOfClockFace()
  drawClockCanvas();
}

function adaptiveResizeCanvas() {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  canvas.width = screenWidth > screenHeight ? screenHeight : screenWidth;
  canvas.height = screenHeight > screenWidth ? screenWidth : screenHeight;
  radius = canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2;
}

function drawClockCanvas() {
  if (canvas && canvas.getContext('2d')) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xpos = canvas.width / 2;
    let ypos = canvas.height / 2; 

    // drawClockFace
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(200, 207, 145)';
    ctx.lineWidth = radius * 0.09;

    // const outerWatermelonRindWidth = ctx.lineWidth;

    // draw gradient in center of clockface
    const grad = ctx.createRadialGradient(xpos, ypos, 1, xpos, ypos, radius / 1.25);
    grad.addColorStop(0,'rgb(255, 255, 255)');
    grad.addColorStop(1,'rgb(238, 62, 61)');
    ctx.fillStyle = grad;

    ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // draw yellow watermelon rind
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(74, 147, 77)';
    ctx.lineWidth = radius * 0.03;
    ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();
    console.log("1", xpos, ypos)



   


    // draw clock face digits
    function createClockFace() {
                          let degrees = 150;
                          ctx.beginPath();
      ctx.translate(canvas.width / 2, canvas.width / 2);


    // Style digits of clock face
    let fontSize = radius * 0.12 + 'px';
    let angle;

    // Rotate and put number and rotate back
                                                              

    for(let i = 1; i <= 12; i++) {
      ctx.save();
      angle = i * Math.PI / 6;
      ctx.rotate(angle);
      ctx.translate(0, -radius * 0.70);
      ctx.font = `bold ${fontSize} Lobster`;
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.rotate(-angle);
      ctx.fillText(i, 0, 0);
      ctx.rotate(angle);
      ctx.translate(0, radius*0.70);
      ctx.rotate(-angle);
      ctx.restore();



      ctx.save();
      ctx.beginPath();
ctx.strokeStyle = "black"; // Задаём цвет обводки чёрный
ctx.fillStyle = "black"; // Задаём цвет заливки чёрный
ctx.lineWidth = 8; // Задаём ширину линий
ctx.lineCap = "round"; // определяем как будут выглядеть концы линий

ctx.rotate(angle);
ctx.moveTo(radius * 0.8, 0);
  ctx.lineTo(radius * 0.85,0);
  ctx.stroke(); // Нарисовали то, что ранее описали


      ctx.restore();
  }

                                                          







    
// ctx.beginPath()
// ctx.strokeStyle = "black"; // Задаём цвет обводки чёрный
// ctx.fillStyle = "black"; // Задаём цвет заливки чёрный
// ctx.lineWidth = 8; // Задаём ширину линий
// ctx.lineCap = "round"; // определяем как будут выглядеть концы линий
 
// ctx.save(); // Сохраняем в контекст 




}
}
createClockFace()
}





function findCenterOfClockFace() {
  const canvas = document.getElementById('clock');
  clockFaceCenterX = canvas.getBoundingClientRect().left + canvas.width / 2;
  clockFaceCenterY = canvas.getBoundingClientRect().top + canvas.height / 2;
}



document.body.addEventListener('click', function(e) {
  console.log("2",e.clientX, e.clientY)
})
