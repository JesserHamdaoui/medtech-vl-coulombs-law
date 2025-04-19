import { useEffect, useRef, useState } from "react";
import { SimulationModel } from "../models/SimulationModel";
import { SimulationProps } from "../constants/simulationConstants";
import Sketch, { SketchProps } from "react-p5";
import sketchCharge from "../sketches/sketchCharge";
import ChargeCards from "./ChargeCards";
import IntroAnimation from "./IntroAnimation";
import Button from "./ui/Button";
import { useFullscreen } from "../hooks/FullscreenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

export default function Simulation() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const p5Instance = useRef<any>(null);

  const [simulation] = useState(() => new SimulationModel());
  const [chargeA] = useState(simulation.chargeModelA);
  const [chargeB] = useState(simulation.chargeModelB);

  const getCanvasSize = () => ({
    width: isFullscreen
      ? p5Instance.current?.windowWidth || window.innerWidth
      : SimulationProps.SIMULATION_WIDTH,
    height: isFullscreen
      ? p5Instance.current?.windowHeight || window.innerHeight
      : SimulationProps.SIMULATION_HEIGHT,
  });

  const setup: SketchProps["setup"] = (pt, canvasParentRef) => {
    const { width, height } = getCanvasSize();
    pt.createCanvas(width, height).parent(canvasParentRef);
    pt.background(0);
    pt.frameRate(60);
    p5Instance.current = pt;
  };

  const draw: SketchProps["draw"] = (pt) => {
    pt.background(0);
    sketchCharge(pt, chargeA, isFullscreen);
    sketchCharge(pt, chargeB, isFullscreen);
  };

  const windowResized: SketchProps["windowResized"] = (pt) => {
    const { width, height } = getCanvasSize();
    pt.resizeCanvas(width, height);
    simulation.updatePositions(width, height);
  };

  useEffect(() => {
    if (p5Instance.current) {
      const { width, height } = getCanvasSize();
      p5Instance.current.resizeCanvas(width, height);
      simulation.updatePositions(width, height);
    }
  }, [isFullscreen]);

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out ${
        isFullscreen
          ? "w-screen h-screen"
          : `max-h-[${SimulationProps.SIMULATION_HEIGHT}px]`
      }`}
    >
      <IntroAnimation />

      <Button
        handleClick={() => toggleFullscreen()}
        className={`absolute z-10 duration-0 ${
          isFullscreen ? "bottom-[315px]" : "bottom-[210px]"
        }`}
        style={{
          left: isFullscreen
            ? (p5Instance.current?.windowWidth || window.innerWidth) - 50
            : SimulationProps.SIMULATION_WIDTH - 50,
        }}
      >
        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
      </Button>

      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        style={{ display: "block" }}
      />

      <ChargeCards simulation={simulation} />
    </div>
  );
}
