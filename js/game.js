const canvas = document.getElementById('canvasTest');

canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

const ctx = canvas.getContext('2d');

function arc_create(x, y, r, start, end, dx, dy){
    let obj = {
        x: x,
        y: y,
        r: r,
        start: start,
        end: end,
        dx: dx,
        dy: dy
    }
    return obj
}

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

let rect = rect_create(100, 200, 50, 100, 'red', 5, -2)
let rect2 = rect_create(300, 50, 100, 50, 'green', -3, 6)

let circle = arc_create(130, 55, 50, 0, 2 * Math.PI)
let circle2 = arc_create(90, 150, 75, 0, 2 * Math.PI)

function gameLoop()
{
    //Draw background
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRect(rect);
    drawRect(rect2);
    hitBorder(rect);
    hitBorder(rect2);
    drawCircle(circle);
    drawCircle(circle2);

}

function drawRect(rect) {
    //Draw cube
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    //Update pos
    rect.x += rect.dx
    rect.y += rect.dy
}

function drawCircle(circle) {
    //Draw circle
    ctx.arc(circle.x, circle.y, circle.r, circle.start, circle.end)
    ctx.fill()
    //Update pos
    circle.x += circle.dx
    circle.y += circle.dy
}

function hitBorder(rect)
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