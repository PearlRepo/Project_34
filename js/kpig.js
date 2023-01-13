class KPig {
    constructor(x, y, w, h) {
      var options = {
        restitution: 0.7
      };
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.World.add(world, this.body);
      this.w = w;
      this.h = h;
    }
  
    show() {
      var pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      fill(255);
      rectMode(CENTER);
      imageMode(CENTER);
      image(kpigImg, 0, 0, this.w, this.h);
      pop();
    }
  }