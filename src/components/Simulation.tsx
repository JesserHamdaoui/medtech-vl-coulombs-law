import { useRef, useState } from "react";
import { SimulationModel } from "../models/SimulationModel";
import { SimulationProps } from "../constants/simulationConstants";
import Sketch, { SketchProps } from "react-p5";
import sketchCharge from "../sketches/sketchCharge";
import ChargeCards from "./ChargeCards";
import IntroAnimation from "./IntroAnimation";

export default function Simulation() {
  const [simulation] = useState(new SimulationModel());

  const [chargeA] = useState(simulation.chargeModelA);

  const [chargeB] = useState(simulation.chargeModelB);

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

    sketchCharge(pt, chargeA);
    sketchCharge(pt, chargeB);
  };

  return (
    <div className="relative">
      <IntroAnimation />
      <Sketch setup={setup} draw={draw} ref={p5Instance} />
      <ChargeCards simulation={simulation} />
    </div>
  );
}
