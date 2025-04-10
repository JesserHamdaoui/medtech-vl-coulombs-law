import { List } from "postcss/lib/list";
import { ChargeProps } from "../constants/simulationConstants";

export class ChargeModel {
  private readonly _id: string;
  private readonly name: string;

  private readonly charge: number;
  private readonly color: number[];

  private readonly exercisedForce: number = 0;

  private readonly position: { x: number; y: number };
  private readonly radius: number;

  private readonly isDragging: boolean;
  private readonly isSelected: boolean;

  constructor(id: string, charge: number, position: { x: number; y: number }) {
    this._id = id;
    this.name = "q" + id;
    this.charge = charge;
    this.color = this.getColorByCharge(charge);
    this.position = position;
    this.radius = ChargeProps.RADIUS;
    this.isDragging = false;
    this.isSelected = false;
  }

  private getColorByCharge = (charge: number): number[] => {
    const colorIntensity = (Math.abs(charge) * 255) / 10;
    if (charge > 0) {
      return [colorIntensity, 0, 0]; // Red for positive charge
    } else {
      return [0, 0, colorIntensity]; // Blue for negative charge
    }
  };
}
