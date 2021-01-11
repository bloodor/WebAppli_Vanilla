const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 1000);

let frame = 0;
let variable = "Hello";

function gameLoop()
{
    console.log("Hello");
}

setInterval(gameLoop, 1000)