class Bird {
    constructor(x, y, r) {
      var options = {
        restitution: 0.5
      };
      this.body = Matter.Bodies.circle(x, y, r, options);
      Matter.Body.setMass(this.body, this.body.mass * 4);
      Matter.World.add(world, this.body);
      this.r = r;
    }
  
    show() {
      var pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      imageMode(CENTER);
      image(redImg, 0, 0, this.r * 2, this.r * 2);
      pop();
    }
  }