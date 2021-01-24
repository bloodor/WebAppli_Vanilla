const canvas = document.getElementById('canvasTest');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

const ctx = canvas.getContext('2d');

const body = document.querySelector('body');

let count = 0;

body.addEventListener('touchstart', (touch) => {
    count += 1;
    if (count % 2 == 0) {
        let obj = document.createElement('div');
        obj.style.width = '80px';
        obj.style.height = '80px';
        obj.style.background = 'red';
        obj.style.position = 'absolute';
        obj.style.borderRadius = '30%';
        obj.style.top = '0px';
        obj.style.left = '0px';
        let posX = (touch.touches[0].clientX - 40).toString();
        let posY = (touch.touches[0].clientY - 40).toString();
    
        obj.style.transform = `translate(${posX}px, ${posY}px)`;
        body.appendChild(obj);    
    }
    else
    {
        let obj = document.createElement('div');
        obj.style.width = '80px';
        obj.style.height = '80px';
        obj.style.background = 'cyan';
        obj.style.position = 'absolute';
        obj.style.borderRadius = '50%';
        obj.style.top = '0px';
        obj.style.left = '0px';
        let posX = (touch.touches[0].clientX - 40).toString();
        let posY = (touch.touches[0].clientY - 40).toString();
    
        obj.style.transform = `translate(${posX}px, ${posY}px)`;
        body.appendChild(obj);
    }
})

body.addEventListener('touchmove', (touchMove) => {
    if (count % 2 == 0) {
        let obj = document.createElement('div');
        obj.style.width = '40px';
        obj.style.height = '40px';
        obj.style.background = 'red';
        obj.style.position = 'absolute';
        obj.style.borderRadius = '30%';
        obj.style.top = '0px';
        obj.style.left = '0px';
        let posX = (touchMove.touches[0].clientX - 20).toString();
        let posY = (touchMove.touches[0].clientY - 20).toString();
    
        obj.style.transform = `translate(${posX}px, ${posY}px)`;
        body.appendChild(obj);    
    }
    else
    {
        let obj = document.createElement('div');
        obj.style.width = '40px';
        obj.style.height = '40px';
        obj.style.background = 'cyan';
        obj.style.position = 'absolute';
        obj.style.borderRadius = '50%';
        obj.style.top = '0px';
        obj.style.left = '0px';
        let posX = (touchMove.touches[0].clientX - 20).toString();
        let posY = (touchMove.touches[0].clientY - 20).toString();
    
        obj.style.transform = `translate(${posX}px, ${posY}px)`;
        body.appendChild(obj);
    }
})

function rect_create(x, y, w, h, color, dx, dy) {
    let obj = {
        x: x,
        y: y,
        w: w,
        h: h,
        color: color,
        dx: dx,
        dy: dy,
    }
    return obj
}

let rect = rect_create(100, 200, 50, 100, 'red', 5, 2)
let rect2 = rect_create(300, 50, 100, 50, 'darkblue', -3, 6)
let rect3 = rect_create(500, 335, 25, 30, 'blue', 4, -2)
let rect4 = rect_create(400, 100, 35, 120, 'purple', -3, -6)
let rect5 = rect_create(220, 175, 80, 80, 'yellow', 5, 1)
let rect6 = rect_create(125, 450, 130, 15, 'cyan', -4, -8)
let rect7 = rect_create(250, 352, 40, 80, 'black', 8, -3)
let rect8 = rect_create(340, 50, 100, 30, 'white', 3, -6)

function gameLoop()
{
    //Draw background
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRect(rect);
    drawRect(rect2);
    drawRect(rect3);
    drawRect(rect4);
    drawRect(rect5);
    drawRect(rect6);
    drawRect(rect7);
    drawRect(rect8);
    drawRect(ball);

    hitBorderRect(rect);
    hitBorderRect(rect2);
    hitBorderRect(rect3);
    hitBorderRect(rect4);
    hitBorderRect(rect5);
    hitBorderRect(rect6);
    hitBorderRect(rect7);
    hitBorderRect(rect8);
    hitBorderRect(ball);

}

let ball = rect_create(canvas.width/2, canvas.height/2, 25, 25, "pink", 0, 0)

let initialOrientation = null;
window.addEventListener('devicemotion', (eventData) => {
    const r = eventData.rotationRate;
    initialOrientation = initialOrientation || Object.assign({}, r); // first time
        if (r.alpha - initialOrientation.alpha > 0)
        {
            ball.w += eventData.accelerationIncludingGravity.z;
            ball.h += eventData.accelerationIncludingGravity.z;
        }
        else if (r.alpha - initialOrientation.alpha < 0)
        {
            ball.w -= eventData.accelerationIncludingGravity.z;
            ball.h -= eventData.accelerationIncludingGravity.z;

        }
        if (r.beta - initialOrientation.beta > 0)
        {
            ball.x += eventData.accelerationIncludingGravity.x;
        }
        else if (r.beta - initialOrientation.beta < 0)
        {
            ball.x -= eventData.accelerationIncludingGravity.x;
        }
        if (r.gamma -initialOrientation.gamma > 0)
        {
            ball.y += eventData.accelerationIncludingGravity.y
        }
        else if (r.gamma -initialOrientation.gamma < 0)
        {
            ball.y -= eventData.accelerationIncludingGravity.y
        }
    }, false);

function drawRect(rect) {
    //Draw cube
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    //Update pos
    rect.x += rect.dx
    rect.y += rect.dy
}

function hitBorderRect(rect)
{
    if (rect.x + rect.w >= canvas.width || rect.x <= 0)
    {
        rect.dx *= -1
    }
    if (rect.y + rect.h >= canvas.height || rect.y <= 0)
    {
        rect.dy *= -1
    }
}

setInterval(gameLoop, 1000 / 60)