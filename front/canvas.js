let mouseDown = false;
let ctx = null;
let rect = null;
const vw = window.innerWidth;
const vh = window.innerHeight;
const cvw = 0.8*vw;
const cvh = 0.8*vh;
let currPath = null;
let strokeThiccnessDisplay = null;
let strokeColorDisplay = null;


window.onload = function() {
    initCanvas();
    initControls();
}

function initCanvas() {
    let canvas = document.getElementById('mainCanvas');
    canvas.width = cvw;
    canvas.height = cvh;
    canvas.style.top = Math.trunc((vh - cvh) / 2) + "px";
    canvas.style.left = Math.trunc((vw - cvw) / 2) + "px";
    rect = canvas.getBoundingClientRect();

    document.onmousedown = mouseDownHandler;
    document.onmouseup = mouseUpHandler;
    document.onmousemove = mouseMoveHandler;

    ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.lineWidth = 3
}

function initControls() {
    let buttonThiccer = document.getElementById('thiccer');
    let buttonThiner = document.getElementById('thiner');
    strokeThiccnessDisplay = document.getElementById('strokeThiccnessDisplay');
    let colorInput = document.getElementById('colorInput');
    strokeColorDisplay = document.getElementById('strokeColorDisplay');

    buttonThiccer.onclick = onThiccer;
    buttonThiner.onclick = onThiner;
    colorInput.onchange = onColorInputChange;
}

function onThiccer() {
    ctx.lineWidth += 1;
    strokeThiccnessDisplay.innerText = "Thiccness: "+ctx.lineWidth;
}

function onThiner() {
    ctx.lineWidth = ctx.lineWidth <= 1 ? ctx.lineWidth : ctx.lineWidth - 1;
    strokeThiccnessDisplay.innerText = "Thiccness: "+ctx.lineWidth;
}

function realX(e) {
    return e.x - rect.x;
}

function realY(e) {
    return e.y - rect.y;
}

mouseDownHandler = function(e) {
    if(isMouseInCanvas(e)) {
        mouseDown = true;

        currPath = [[realX(e), realY(e)]];

        ctx.beginPath();
        ctx.arc(realX(e), realY(e), ctx.lineWidth/2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(realX(e), realY(e));
    }
}

mouseUpHandler = function(e) {
    if(mouseDown) {
        ctx.stroke();
        mouseDown = false;

        currPath.push([
            realX(e),
            realY(e)
        ]);

        app.sendPath({
            path: currPath,
            color: ctx.fillStyle,
            thiccness: ctx.lineWidth
        });

        // reset path buffer
        ctx.beginPath();
    }

    /* test path
    ctx.beginPath();
    ctx.moveTo(currPath[0][0], currPath[0][1]+100);
    for(let i = 1; i < currPath.length; i++) {
        ctx.lineTo(currPath[i][0], currPath[i][1]+100)
    }
    ctx.lineTo(currPath[currPath.length-1][0], currPath[currPath.length-1][1]+100)
    ctx.stroke()
    */
}

mouseMoveHandler = function(e) {
    if(mouseDown) {
        ctx.lineTo(realX(e), realY(e));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(realX(e), realY(e), ctx.lineWidth/2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(realX(e), realY(e));

        currPath.push([
            realX(e),
            realY(e)
        ]);
    }

    if(!isMouseInCanvas(e)) mouseUpHandler(e);
}

function isMouseInCanvas(e) {
    return realX(e) >= 0 && realX(e) < e.srcElement.width && realY(e) >= 0 && realY(e) < e.srcElement.height;
}

function onColorInputChange(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    strokeColorDisplay.style.backgroundColor = e.target.value;
}
