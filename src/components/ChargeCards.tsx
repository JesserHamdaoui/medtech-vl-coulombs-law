import { useState, useEffect } from "react";
import { SimulationModel } from "../models/SimulationModel";
import ChargeCard from "./ChargeCard";
import { Card } from "./ui/Card";
import Slider from "./ui/Slider";
import { SettingsProps } from "../constants/simulationConstants";
import { SimulationProps } from "../constants/simulationConstants";
import MetricBadge from "./ui/MetricBadge";
import { useFullscreen } from "../hooks/FullscreenContext";

interface ChargeCardsProps {
  simulation: SimulationModel;
}

export default function ChargeCards({ simulation }: ChargeCardsProps) {
  const { isFullscreen } = useFullscreen();

  // State for controls
  const [distance, setDistance] = useState(simulation.distance);
  const [chargeA, setChargeA] = useState(simulation.chargeModelA.charge);
  const [chargeB, setChargeB] = useState(simulation.chargeModelB.charge);
  const [exercisedForceA, setExercisedForceA] = useState(
    simulation.chargeModelA.exercisedForce
  );
  const [exercisedForceB, setExercisedForceB] = useState(
    simulation.chargeModelB.exercisedForce
  );

  // Sync state with simulation model
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(simulation.distance);
      setChargeA(simulation.chargeModelA.charge);
      setChargeB(simulation.chargeModelB.charge);
      setExercisedForceA(simulation.chargeModelA.exercisedForce);
      setExercisedForceB(simulation.chargeModelB.exercisedForce);
    }, 100);

    return () => clearInterval(interval);
  }, [simulation]);

  // Handler with fullscreen-aware updates
  const updateHandler =
    (handler: (value: number) => void) => (value: number) => {
      handler(value);
      if (isFullscreen) {
        // Force position update with current dimensions
        simulation.updatePositions(window.innerWidth, window.innerHeight);
      }
    };

  const handleChargeAChange = updateHandler((newCharge) => {
    simulation.updateChargeA(newCharge);
    setChargeA(newCharge);
  });

  const handleChargeBChange = updateHandler((newCharge) => {
    simulation.updateChargeB(newCharge);
    setChargeB(newCharge);
  });

  const handleDistanceChange = updateHandler((newDistance) => {
    simulation.updateDistance(newDistance);
    setDistance(newDistance);
  });

  return (
    <div
      className={`flex flex-row items-center justify-between ${
        isFullscreen ? "h-[300px] py-7 pr-10" : "h-[200px] py-3 pr-5"
      } bg-slate-100 px-3 gap-5 w-[${
        isFullscreen ? "100%" : SimulationProps.SIMULATION_WIDTH + "px"
      }] absolute bottom-0 left-0 right-0 z-10 rounded-t-lg shadow-md`}
    >
      <div className="flex flex-row items-center gap-5">
        <ChargeCard
          name={simulation.chargeModelA.name}
          charge={chargeA}
          exercisedForce={exercisedForceA}
          handleChargeChange={handleChargeAChange}
        />
        <ChargeCard
          name={simulation.chargeModelB.name}
          charge={chargeB}
          exercisedForce={exercisedForceB}
          handleChargeChange={handleChargeBChange}
        />
      </div>
      <Card>
        <div
          className={`flex flex-col p-4 space-y-4 ${
            isFullscreen ? "gap-6" : ""
          }`}
        >
          <span
            className="text-lg text-[#2596be] font-semibold"
            style={isFullscreen ? { fontSize: "2rem" } : {}}
          >
            Simulation Controls
          </span>
          <div className={isFullscreen ? "space-y-6" : "space-y-3"}>
            <div>
              <span style={isFullscreen ? { fontSize: "1.5rem" } : {}}>
                Distance: <MetricBadge value={distance.toFixed(2)} unit="m" />
              </span>
            </div>
            <Slider
              min={SettingsProps.DISTANCE_MIN}
              max={SettingsProps.DISTANCE_MAX}
              minIndicator={`${SettingsProps.DISTANCE_MIN}m`}
              maxIndicator={`${SettingsProps.DISTANCE_MAX}m`}
              step={0.01}
              initialValue={distance}
              onChange={handleDistanceChange}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
