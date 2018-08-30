function Obstacle(x, y, pwidth, pheight) {
    this.pos = createVector(x, y);
    this.size = createVector(pwidth, pheight);


    this.render = function() {
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    this.contains = function(point) {
        return (
            (point.x > this.pos.x) && (point.x <= this.pos.x + this.size.x)
                                    &&
            (point.y > this.pos.y) && (point.y <= this.pos.y + this.size.y)
                );
    }
}