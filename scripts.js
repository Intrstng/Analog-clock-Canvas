let canvas;
let radius;
let fontSize;
let canvasPadding;
let angle;
const date = new Date();
let hour = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();

window.onload = function() {
  canvas = document.getElementById('clock');
  adaptiveResizeCanvas();
  drawClockCanvas();
}
window.onresize = function() {
  adaptiveResizeCanvas();
  drawClockCanvas();
}

function adaptiveResizeCanvas() {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  canvas.width = screenWidth > screenHeight ? screenHeight : screenWidth;
  canvas.height = screenHeight > screenWidth ? screenWidth : screenHeight;
  radius = canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2;
  fontSize = radius * 0.12 + 'px';
  canvasPadding = radius * 0.08;
}

function drawClockCanvas() {
  if (canvas && canvas.getContext('2d')) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let xpos = canvas.width / 2;
    let ypos = canvas.height / 2;

    function createClockFace() {
      // draw clock face
      ctx.beginPath();
      // draw gradient in center of clockface
      const grad = ctx.createRadialGradient(xpos, ypos, 1, xpos, ypos, radius / 1.25);
      grad.addColorStop(0,'rgb(255, 255, 255)');
      grad.addColorStop(1,'rgb(238, 62, 61)');
      ctx.fillStyle = grad;
      // draw light green colored watermelon rind
      ctx.strokeStyle = 'rgb(200, 207, 145)';
      ctx.lineWidth = radius * 0.09;
      ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2 - canvasPadding, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // draw green colored watermelon rind
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(74, 147, 77)';
      ctx.lineWidth = radius * 0.03;
      ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2 - canvasPadding, 0, 2 * Math.PI);
      ctx.stroke();
    }
    createClockFace()

    function fillClockFace() {             
      ctx.translate(xpos, ypos);
      for(let i = 1; i <= 12; i++) {
        // draw clock face digits
        ctx.save();
        ctx.beginPath();
        angle = i * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius * 0.63);
        ctx.font = `bold ${fontSize} Lobster`;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.rotate(-angle);
        ctx.fillText(i, 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, radius * 0.63);
        ctx.rotate(-angle);
        ctx.restore();
          // draw hour dashes - set styles
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = 'rgb(0, 0, 0)';
          ctx.fillStyle = 'rgb(0, 0, 0)';
          ctx.lineWidth =  radius * 0.015;
          ctx.rotate(angle);
          ctx.strokeStyle = 'rgb(0, 0, 0)';
          // draw hour dashes (watermelon seed styled)
            let degreesStart = 270;
            let radiansStart = (Math.PI / 180) * degreesStart;
            let degreesEnd = 90;
            let radiansEnd = (Math.PI / 180) * degreesEnd;
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(radius * 0.78, radius * 0.015);
            ctx.lineTo(radius * 0.73, 0);
            ctx.lineTo(radius * 0.78, -radius * 0.015);
            ctx.arc(radius * 0.78, 0, radius * 0.015, radiansStart, radiansEnd);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
      }
        // draw minute dashes
        for(let i = 1; i <= 60; i++) {
            ctx.save();
            let angle2 = i * Math.PI / 30;
            ctx.beginPath();
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.lineWidth = radius * 0.0065;
            ctx.lineCap = 'round';
            ctx.rotate(angle2);
            ctx.moveTo(radius * 0.745, 0);
            ctx.lineTo(radius * 0.78,0);
            ctx.stroke();
            ctx.restore();
        }
    }

    function showTimeDigitalClock() {
      let fontSizeDigitalClock = parseInt(fontSize) * 0.9 + 'px';
      const time = String(hour).padStart(2, 0) + ':' + String(min).padStart(2, 0) + ':' + String(sec).padStart(2, 0);
      ctx.beginPath();
      ctx.fillStyle = 'rgb(255, 0, 0)';
      ctx.font = `bold ${fontSizeDigitalClock} 'Rubik Iso'`;
      ctx.fillText(time, -radius * 0.25, -radius * 0.28);
    }

    function showAnalogTime() {
      let hourAnalog = date.getHours() % 12 || 12;
      const secDegree = sec * 6;
      let minDegree = min * 6;
      let hourDegree = hourAnalog * 30 + minDegree / 12;
      secDegree === 360 && (secDegree = 0);
      minDegree === 360 && (minDegree = 0);
        const secRadians = sec * 6 * (Math.PI / 180);
        const minRadians = min * 6 * (Math.PI / 180);
        const hourRadians = hourDegree * (Math.PI / 180);
      drawHand(ctx, hourRadians, radius * 0.48, radius * 0.011, 'rgb(0, 0, 0)');
      drawHand(ctx, minRadians, radius * 0.6, radius * 0.008, 'rgb(0, 0, 0)');
      drawHand(ctx, secRadians, radius * 0.7, radius * 0.0035, 'rgb(74, 147, 77)');
    }
    showAnalogTime()
    

    function drawHand(ctx, pos, length, width, color) {
      ctx.save();
      ctx.translate(xpos, ypos);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(-width, 0);
      ctx.lineTo(0, -length);
      ctx.lineTo(width, 0);
      ctx.stroke();
      ctx.fill();
      ctx.rotate(-pos);
      ctx.restore();
    }

    function drawCenterCircle(ctx, radius) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(xpos, ypos, radius * 0.02, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgb(238, 65, 64)';
      ctx.fill();
      ctx.restore();
    }
    drawCenterCircle(ctx, radius);
}

fillClockFace()
showTimeDigitalClock()
}