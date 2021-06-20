let font,
  fontsize = 15;

function preload() {
  font = loadFont('assets/Poppins-Medium.ttf');
}

let height = 800, width = 1500;
let slider;

function setup() {
    createCanvas(width, height);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    slider = createSlider(5, 50, 5, 1);
    slider.position(10, 10);
    slider.style('width', '80px');

}

let nextStep = true;
let radius = 200, nodeRadius = 40;
let m = [[]];
let matrix = height / 2;
let matrixStep = 0;
function draw() {
    clear();
    background(105);
    let val = slider.value();
    step = val;
    list = circleCoordinates(radius,step);
    matrixStep = matrix / step;
    for (i = 0; i < step; i++) {
        for (j = i + 1; j < step; j++) {
            line(list[i][0], list[i][1], list[j][0], list[j][1]);
        }
        fill(255);
        circle(list[i][0], list[i][1], nodeRadius);
        fill(0);
        text(i+1, list[i][0], list[i][1]);
    }

    for (i = 0; i < step; i++) {
        for (j = 0; j < step; j++) {
            fill(200);
            rect((width/2)+(matrixStep*i), height / 4 + (matrixStep*j), matrixStep, matrixStep);            
        }
        
    }
}

function circleCoordinates(radius, number) {
    dt = 2 * Math.PI / number;
    t = 0;
    coordinateList = [];
    for (i = 0; i < number; i++) {
        coordinateList.push([(width / 4) + radius*Math.sin(t), (height / 2) + radius*Math.cos(t + Math.PI)]);
        t += dt;
    }
    return coordinateList;
}

function mousePressed() { 
    nextStep = true;
}