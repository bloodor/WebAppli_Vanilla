const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');


let cube = {
    x: 100,
    y: 200,
    xspeed: 3,
    yspeed: 3,
    xsize : 50,
    ysize : 50
};

function gameLoop()
{
    //Draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Draw red cube
    ctx.fillStyle = 'red';
    ctx.fillRect(cube.x, cube.y, 100, 100);
    //Update pos
    cube.x += cube.xspeed
    cube.y += cube.yspeed
    hitBorder();
}

function hitBorder()
{
    if (cube.x + 100 >= canvas.width || cube.x <= 0)
    {
        cube.xspeed *= -1
    }
    if (cube.y + 100 >= canvas.height || cube.y <= 0)
    {
        cube.yspeed *= -1
    }
}

setInterval(gameLoop, 1000 / 60)