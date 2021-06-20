let font,
  fontsize = 15;

function preload() {
  font = loadFont('assets/Poppins-Medium.ttf');
}

function setup() {
    createCanvas(400, 400);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    slider = createSlider(5, 50, 5, 1);
    slider.position(10, 10);
    slider.style('width', '80px');

}

let nextStep = true;
function draw() {
    background(102);
    let val = slider.value();
    step = val;
    list = circleCoordinates(150,step);
    for (i = 0; i < step; i++) {
        for (j = i; j < step; j++) {
            
        }
        line();
        fill(255);
        circle(list[i][0], list[i][1], 20);
        fill(0)
        text(i+1, list[i][0], list[i][1]);
    }
}

function circleCoordinates(radius, number) {
    dt = 2 * Math.PI / number;
    t = 0;
    coordinateList = [];
    for (i = 0; i < number; i++) {
        coordinateList.push([200 + radius*Math.sin(t), 200 + radius*Math.cos(t)]);
        t += dt;
    }
    return coordinateList;
}

function mousePressed() { 
    nextStep = true;
}