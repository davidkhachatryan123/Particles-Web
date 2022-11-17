let pointsCount = 100,
    pointsSpeed = 1,
    pointsColor = '#2b8265',
    pointsSize = 5;

let linesColor = '#ffffff',
    lineMaxLength = 150;
    lineThickness = 0.01;


let points = [];


function generatePoints(count) {
  for(let i = 0; i < count; i++) {
    points.push({
      x: getRandomIntInRange(0, canvas.width),
      y: getRandomIntInRange(0, canvas.height),
      direction: Math.random() * 2 * Math.PI
    });
  }
}

function drawCircle(x, y) {
  ctx.beginPath();

  ctx.arc(x, y, pointsSize, 0, 2 * Math.PI);

  ctx.fill();
}

function line(x1, y1, x2, y2, thickness) {
  ctx.beginPath();

  ctx.lineWidth = thickness;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.stroke();
}

function getVectorLength(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getRandomIntInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function map(value, fromSource, toSource, fromTarget, toTarget) {
  return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
}


let canvas = document.getElementById('particles');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = pointsColor;
ctx.strokeStyle = linesColor;


function animation() {
  if(points.length < pointsCount) generatePoints(pointsCount - points.length);

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const point of points) {
    point.x += pointsSpeed * Math.cos(point.direction);
    point.y += pointsSpeed * Math.sin(point.direction);

    if(point.x > canvas.width || point.x < 0 ||
      point.y > canvas.height || point.y < 0) {
        points.splice(points.indexOf(point), 1);
    } else {
      drawCircle(point.x, point.y);
    }
  }

  for(let i = 0; i < points.length; i++) {
    let p1_x = points[i].x,
        p1_y = points[i].y;

    for(let j = 0; j < points.length; j++) {
      if(i === j) continue;
      
      let p2_x = points[j].x,
          p2_y = points[j].y;

      let length = getVectorLength(p1_x, p1_y, p2_x, p2_y);

      if (length < lineMaxLength) {
        line(p1_x, p1_y, p2_x, p2_y, map(length, lineMaxLength, 1, 1, length) * lineThickness);
      }
    }
  }

  window.requestAnimationFrame(animation);
}

animation();
