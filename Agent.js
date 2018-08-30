function Agent() {
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dna = [];
    this.dnaLen = 0;
    this.isAlive = true;
    this.atGoal = false;
    this.fitness = 0;

    this.init = function(len) {
        this.dnaLen = len;
        for (var i = 0; i < len; ++i) {
            //generate random vectors
            this.dna[i] = createVector(random(-1, 1), random(-1, 1));
            
        }
    }

    this.update = function() {
        //only update agents that are alive and not at the goal
        if (this.isAlive && !this.atGoal) {
            //use modified euler to calculate new position
            this.vel.add(this.acc);
            //this.acc.setMag(0); //dampening

            //make sure to limit the vel so the agent doesnt go to fast
            this.vel.limit(2);

            this.pos.add(this.vel);
        }
    }

    this.render = function() {
        //agent represented as simple ellipse
        ellipse(this.pos.x, this.pos.y, 20, 20);
    }

    this.applyForce = function(i) {

        //check i is in range
        if(i < this.dnaLen && i >= 0) {
            //add the force specified by dna for this frame
            this.acc.add(this.dna[i]); 
        }

    }

    this.eval = function(goal) {
        if (this.atGoal) {
            this.fitness = 1;
        }
        else if (this.isAlive == false) {
            this.fitness = 0;
        }
        else {
            var d2g = dist(this.pos.x, this.pos.y, goal.pos.x, goal.pos.y);
            this.fitness = 1.0 / (d2g * d2g);
        }
    }

    //this will return true if the agent is out of bounds (oob)
    this.oob = function() {
        return ( 
            (this.pos.x < 0 || this.pos.x >= width)
                            ||
            (this.pos.y < 0 || this.pos.y >= height)
                );
    }

}
