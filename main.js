//import * as Hopfield from 'hopfield.js';

let font,
  fontsize = 15;

function preload() {
  font = loadFont('assets/Poppins-Medium.ttf');
}

let heigth = 800, width = 1400, canvasDivition = 5;
let slider;

function setup() {
    createCanvas(width, heigth);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    slider = createSlider(2, 5, 2, 1);
    slider.position(10, 10);
    slider.style('width', '80px');
}

let radius = width / 8, nodeRadius = 40;
let m = [[]];
let matrixSize = heigth / 3;
let matrixStep = 0;
let graphCenter = {
    x: width / canvasDivition,
    y: heigth / 2
}
let weightMatrixCenter = {
    x: (width / canvasDivition) * 4,
    y: heigth / 5
}

let valueMatrixCenter = {
    x: (width / canvasDivition) * 2,
    y: heigth / 3 
}

function draw() {
    clear();
    background(105);
    let val = slider.value();
    step = val;
    matrixStep = matrixSize / step;
    valueMatrixSize = step * step;
    weightMatrix = zeros(step);
    valueMatrix = zeros(step*step);
    list = circleCoordinates(radius,valueMatrixSize,graphCenter);
    printGraph(list, valueMatrixSize);
    printValueMatrix(valueMatrix, valueMatrixCenter, width / canvasDivition);
    
}

function zeros(size) {
    zero = [];
    for (i = 0; i < size; i++) {
        zero.push(Array(size).fill(0));
    }
    return zero;
}

function printGraph(list, size) {
    for (i = 0; i < size; i++) {
        for (j = i + 1; j < size; j++) {
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


function printValueMatrix(matrix, corner, side) {
    offset = side / matrix.length;
    for (i = 0; i < matrix.length; i ++) {
        for (j = 0; j < matrix.length; j ++) {
            if (matrix[i][j] == 1) {
                fill(255,0,0);
            } else {
                fill(255);
            }
            rect(corner.x + (offset * i), corner.y + (offset * j), offset, offset);
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


function generateWeigthMatrix(patterns) {
    M = zeros(patterns.length);
    for (i = 0; i < M.length; i++) {
        for (j = 0; j < M.length; j++) {
            if (i != j) {
                for (k = 0; k < patterns.length; k++) {
                    M[i][j] += (patterns[k][i] + patterns[k][j]);
                }
            } else {
                M[i][j] = 0;
            }
        }
    }
    return M;
}

function nextStep(values, weightMatrix, t) {
    nextValues = [];
    value = 0;
    for (i = 0; i < values[0].length; i++) {
        for (j = 0; j < values[0].length; j++) {
            value += weightMatrix[i][j] * values[t-1][j];
        }
        if (value >=0 ) {
            nextValues.push(1);
        } else {
            nextValues.push(-1)
        }
        value = 0;
    }
    values.push(nextValues);
    return values;
}