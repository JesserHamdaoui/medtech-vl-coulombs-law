import P5 from "p5";
import { ChargeModel } from "../models/ChargeModel";
import { arrowYOffset } from "../constants/simulationConstants";

export default function sketchCharge(p5: P5, charge: ChargeModel) {
  p5.fill(charge.color);
  p5.noStroke();
  p5.ellipse(
    charge.position.x,
    charge.position.y,
    charge.radius,
    charge.radius
  );

  const forceVector = charge.exercisedForce;
  const arrowSize = 10;

  p5.push();

  // Draw dashed line from center of circle to tail of arrow
  p5.strokeWeight(3);
  p5.stroke(255, 150); // White with some opacity
  p5.drawingContext.setLineDash([8, 8]);
  const yOffset = charge.name === "q1" ? arrowYOffset : -arrowYOffset;
  p5.line(
    charge.position.x,
    charge.position.y,
    charge.position.x,
    charge.position.y + yOffset
  );
  p5.drawingContext.setLineDash([]); // Reset dash

  // Draw the line representing the force vector
  p5.stroke(charge.color);
  p5.strokeWeight(10);
  p5.line(
    charge.position.x,
    charge.position.y + yOffset,
    charge.position.x + forceVector,
    charge.position.y + yOffset
  );

  // Draw the arrowhead
  p5.translate(charge.position.x + forceVector, charge.position.y + yOffset);

  if (forceVector > 0) {
    p5.triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
  } else {
    p5.triangle(0, 0, arrowSize, arrowSize / 2, arrowSize, -arrowSize / 2);
  }

  p5.pop();

  p5.fill(255);
}
