function Genetic(spawnPoint, goal) {
    this.agents = [];
    this.agentsLen = 0;
    this.obs = [];
    this.obsLen = 0;
    this.spawnPoint = spawnPoint;
    this.goal = new Obstacle(goal.x - 10, goal.y - 10, 20, 20);
    this.frame = 0;
    this.dnaLen = 100;

    this.init = function(agentsSize, obsSize) {

        this.agentsLen = agentsSize;
        this.obsLen = obsSize;

        for (var i = 0; i < this.obsLen; ++i) {
            this.obs[i] = new Obstacle(random(0, width), 
                                       random(0, height), 
                                       random(0, 100), 
                                       random(0, 100));
        }

        for (var i = 0; i < this.agentsLen; ++i) {
            this.agents[i] = new Agent();
            this.agents[i].init(this.dnaLen);
            this.agents[i].pos = this.spawnPoint.copy();
        }

    }

    this.applyForce = function() {
        for (var i = 0; i < this.agentsLen; ++i) {
            this.agents[i].applyForce(this.frame);
        }
    }

    this.update = function() {
        if (this.frame < this.dnaLen) {
            for (var i = 0; i < this.agentsLen; ++i) {
                this.agents[i].update();

                //check if reached goal
                if (this.goal.contains(this.agents[i].pos)) {
                    this.agents[i].atGoal = true;
                }

                //if agent is alive check if they should be dead
                if (this.agents[i].isAlive) {
                    for (var j = 0; j < this.obsLen; ++j) {
                        if (this.obs[j].contains(this.agents[i].pos) ||
                                this.agents[i].oob()) {
                            this.agents[i].isAlive = false;
                        }
                    }
                }
            }
            this.frame += 1;
        }
        else {
            this.eval();
            this.nextGeneration();


            //this.frame = 0; //reset frames and begin simulation on new population
        }
    }

    this.render = function() {
        
        for (var i = 0; i < this.obsLen; ++i) {
            this.obs[i].render();   
        }

        fill(0, 255, 0);
        this.goal.render();
        fill(255);

        for (var i = 0; i < this.agentsLen; ++i) {
            this.agents[i].render();
        }

    }

    this.eval = function() {
        for(var i = 0; i < this.agentsLen; ++i) {
            this.agents[i].eval(this.goal);
        }
    }

    this.nextGeneration = function() {
        //use the agents fitness to  randomly select (with bias) 
        //the agents to breed and make the next generation
        var weightedPop = Array.from(this.agents);
        weightedPop.sort(function(left, right) { return right.fitness - left.fitness; });
        //weightedPop is a array of the population that is sorted from most fit to least fit

        var bestPool = weightedPop.slice(0, 10);//top 10 best Agents in the current population

        

        console.log(bestPool);

    }


}