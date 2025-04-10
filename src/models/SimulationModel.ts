import { SimulationProps, Ke } from "../constants/simulationConstants";
import { ChargeModel } from "./ChargeModel";

export class SimulationModel {
  private readonly _chargeModelA: ChargeModel;
  private readonly _chargeModelB: ChargeModel;
  private _distance: number;

  constructor() {
    this._distance = SimulationProps.DISTANCE;
    const chargeA = SimulationProps.INITIAL_CHARGE_A;
    const chargeB = SimulationProps.INITIAL_CHARGE_B;
    this._chargeModelA = new ChargeModel(
      "1",
      chargeA,
      this.calculateForces()[0],
      {
        x: SimulationProps.SIMULATION_WIDTH / 2 - this._distance / 2,
        y: SimulationProps.SIMULATION_HEIGHT / 2,
      }
    );
    this._chargeModelB = new ChargeModel(
      "2",
      chargeB,
      this.calculateForces()[1],
      {
        x: SimulationProps.SIMULATION_WIDTH / 2 + this._distance / 2,
        y: SimulationProps.SIMULATION_HEIGHT / 2,
      }
    );
  }

  public calculateForces(): number[] {
    const chargeA = this._chargeModelA.charge;
    const chargeB = this._chargeModelB.charge;
    const distance = this._distance;
    const force = (Ke * chargeA * chargeB) / (distance * distance);
    const direction = chargeA * chargeB > 0 ? -1 : 1; // Same sign -> repulsion, different sign -> attraction
    return [force * direction, -force * direction];
  }

  public updateDistance(newDistance: number): void {
    this._distance = newDistance;
    const forces = this.calculateForces();
    this._chargeModelA.exercisedForce = forces[0];
    this._chargeModelB.exercisedForce = forces[1];
  }

  public updateChargeA(newCharge: number): void {
    this._chargeModelA.charge = newCharge;
    const forces = this.calculateForces();
    this._chargeModelA.exercisedForce = forces[0];
    this._chargeModelB.exercisedForce = forces[1];
  }

  public updateChargeB(newCharge: number): void {
    this._chargeModelB.charge = newCharge;
    const forces = this.calculateForces();
    this._chargeModelA.exercisedForce = forces[0];
    this._chargeModelB.exercisedForce = forces[1];
  }

  public get distance(): number {
    return this._distance;
  }

  public get chargeModelA(): ChargeModel {
    return this._chargeModelA;
  }

  public get chargeModelB(): ChargeModel {
    return this._chargeModelB;
  }
}
