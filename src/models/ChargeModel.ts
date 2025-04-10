import { List } from "postcss/lib/list";
import { ChargeProps } from "../constants/simulationConstants";

export class ChargeModel {
  private readonly _id: string;
  private readonly _name: string;

  private _charge: number;
  private _color: number[];

  private _exercisedForce: number = 0;

  private _position: { x: number; y: number };
  private readonly _radius: number;

  private _isDragging: boolean;
  private _isSelected: boolean;

  constructor(id: string, charge: number, position: { x: number; y: number }) {
    this._id = id;
    this._name = "q" + id;
    this._charge = charge;
    this._color = this.getColorByCharge(charge);
    this._position = position;
    this._radius = ChargeProps.RADIUS;
    this._isDragging = false;
    this._isSelected = false;
  }

  private getColorByCharge = (charge: number): number[] => {
    const colorIntensity = (Math.abs(charge) * 255) / 10;
    if (charge > 0) {
      return [colorIntensity, 0, 0]; // Red for positive charge
    } else {
      return [0, 0, colorIntensity]; // Blue for negative charge
    }
  };

  public get name(): string {
    return this._name;
  }

  public get charge(): number {
    return this._charge;
  }

  public set charge(value: number) {
    this._charge = value;
    this._color = this.getColorByCharge(value);
  }

  public get color(): number[] {
    return this._color;
  }

  public get position(): { x: number; y: number } {
    return this._position;
  }

  public set position(value: { x: number; y: number }) {
    this._position = value;
  }

  public get radius(): number {
    return this._radius;
  }

  public set ExercisedForce(value: number) {
    this._exercisedForce = value;
  }

  public get ExercisedForce() {
    return this._exercisedForce;
  }

  public get isDragging(): boolean {
    return this._isDragging;
  }

  public set Dragging(value: boolean) {
    this._isDragging = value;
  }

  public get isSelected(): boolean {
    return this._isSelected;
  }

  public set Selected(value: boolean) {
    this._isSelected = value;
  }
}
