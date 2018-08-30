var genetic;
var frame = 0;

function setup() {

    createCanvas(window.innerWidth - 10, window.innerHeight - 20);

    genetic = new Genetic(
        createVector(width/2, height*9/10),
        createVector(width/2, height*1/10)
    );

    genetic.init(100, 20);

}

function draw() {

    background(0);

    genetic.applyForce();
    genetic.update();
    genetic.render();

    //console.log(frameRate());

}