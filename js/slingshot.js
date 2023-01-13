class SlingShot {
  constructor(x, y, body) {
    var options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  fly() {
    this.sling.bodyB = null;
  }

  show() {
    if (this.sling.bodyB) {
      stroke(0);
      strokeWeight(4);
      var posA = this.sling.pointA;
      var posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }

  attach(body) {
    this.sling.bodyB = body;
  }
}