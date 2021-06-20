let font,
  fontsize = 15;

function preload() {
  font = loadFont('assets/Poppins-Medium.ttf');
}

let height = 700, width = 1400, canvasDivition = 4;
let slider;

function setup() {
    createCanvas(width, height);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    slider = createSlider(4, 50, 4, 2);
    slider.position(10, 10);
    slider.style('width', '80px');

}

let nextStep = true;
let radius = width / 8, nodeRadius = 40;
let m = [[]];
let matrixSize = height / canvasDivition;
let matrixStep = 0;
let graphCenter = {
    x: width / canvasDivition,
    y: height / 2
}
let weightMatrixCenter = {
    x: (width / canvasDivition) * 2,
    y: height / 8
}

let valueMatrixCenter = {
    x: (width / canvasDivition) * 2,
    y: (height / 2) 
}
function draw() {
    clear();
    background(105);
    let val = slider.value();
    step = val;
    list = circleCoordinates(radius,step,graphCenter);
    matrixStep = matrixSize / step;
    weightMatrix = null;
    valueMatrix = null;
    printGraph(list);
    printWeightMatrix(weightMatrix, matrixStep, step, weightMatrixCenter);
    printValueMatrix(valueMatrix, matrixStep * 2, step / 2, valueMatrixCenter);
}

function printGraph(list) {
    for (i = 0; i < step; i++) {
        for (j = i + 1; j < step; j++) {
            line(list[i].x, list[i].y, list[j].x, list[j].y);
        }
        if (i%2 == 1) {
            fill(255);
        } else {
            fill(255, 0, 0);
        }
        circle(list[i].x, list[i].y, nodeRadius);
        fill(0);
        text(i+1, list[i].x, list[i].y);
    }
}

function printWeightMatrix(weightMatrix, matrixStep, step, center) {
    for (i = 0; i < step + 1; i++) {
        for (j = 0; j < step + 1; j++) {
            if (i == 0) {
                if (j != 0) {
                    fill(0);
                    centerStepX = (center.x + (matrixStep*i) + center.x + (matrixStep*(i+1))) / 2;
                    centerStepY = (center.y + (matrixStep*j) + center.y + (matrixStep*(j + 1))) / 2;
                    text(j, centerStepX, centerStepY);
                }
            } else {
                if (j == 0) { 
                    if (i != 0) {
                        fill(0);
                        centerStepX = (center.x + (matrixStep*i) + center.x + (matrixStep*(i+1))) / 2;
                        centerStepY = (center.y + (matrixStep*j) + center.y + (matrixStep*(j + 1))) / 2;
                        text(i, centerStepX, centerStepY);
                    }
                } else {
                    fill(200);
                    rect(center.x + (matrixStep*i), center.y + (matrixStep*j), matrixStep, matrixStep);
                }
            }
            
        }
        
    }
}

function printValueMatrix(weightMatrix, matrixStep, step, center) {
    for (i = 0; i < step + 1; i++) {
        for (j = 0; j < step + 1; j++) {
            if (i == 0) {
                if (j != 0) {
                    fill(0);
                    centerStepX = (center.x + (matrixStep*i) + center.x + (matrixStep*(i+1))) / 2;
                    centerStepY = (center.y + (matrixStep*j) + center.y + (matrixStep*(j + 1))) / 2;
                    text(j, centerStepX, centerStepY);
                }
            } else {
                if (j == 0) { 
                    if (i != 0) {
                        fill(0);
                        centerStepX = (center.x + (matrixStep*i) + center.x + (matrixStep*(i+1))) / 2;
                        centerStepY = (center.y + (matrixStep*j) + center.y + (matrixStep*(j + 1))) / 2;
                        text(i, centerStepX, centerStepY);
                    }
                } else {
                    fill(200);
                    rect(center.x + (matrixStep*i), center.y + (matrixStep*j), matrixStep, matrixStep);
                }
            }
            
        }
        
    }
}

function circleCoordinates(radius, number, center) {
    dt = 2 * Math.PI / number;
    t = 0;
    coordinateList = [];
    for (i = 0; i < number; i++) {
        coordinateList.push({x: center.x + radius*Math.sin(t), y: center.y + radius*Math.cos(t + Math.PI)});
        t += dt;
    }
    return coordinateList;
}

function mousePressed() { 
    nextStep = true;
}