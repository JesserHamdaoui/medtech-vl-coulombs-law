import { useRef, useState } from "react";
import { SimulationModel } from "../models/SimulationModel";
import { SimulationProps } from "../constants/simulationConstants";
import Sketch, { SketchProps } from "react-p5";

export default function Simulation() {
  const [simulation] = useState(new SimulationModel());

  const [chargeA, setChargeA] = useState(simulation.chargeModelA);

  const [chargeB, setChargeB] = useState(simulation.chargeModelB);

  const [distance, setDistance] = useState(simulation.distance);

  const p5Instance = useRef<any>(null);

  const setup: SketchProps["setup"] = (pt, canvasParentRef) => {
    const width = SimulationProps.SIMULATION_WIDTH;
    const height = SimulationProps.SIMULATION_HEIGHT;

    pt.createCanvas(width, height).parent(canvasParentRef);
    pt.background(0);
    pt.frameRate(60);
  };

  const draw: SketchProps["draw"] = (pt) => {
    pt.background(0);
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} ref={p5Instance} />
    </div>
  );
}
