import { useState, useEffect } from "react";
import { SimulationModel } from "../models/SimulationModel";
import ChargeCard from "./ChargeCard";
import { Card } from "./ui/Card";
import Slider from "./ui/Slider";
import { SettingsProps } from "../constants/simulationConstants";
import { SimulationProps } from "../constants/simulationConstants";
import MetricBadge from "./ui/MetricBadge";

interface ChargeCardsProps {
  simulation: SimulationModel;
}

export default function ChargeCards({ simulation }: ChargeCardsProps) {
  // mirror the two charges from the sim into React state
  const [distance, setDistance] = useState(simulation.distance);
  const [chargeA, setChargeA] = useState(simulation.chargeModelA.charge);
  const [chargeB, setChargeB] = useState(simulation.chargeModelB.charge);
  const [exercisedForceA, setExercisedForceA] = useState(
    simulation.chargeModelA.exercisedForce
  );
  const [exercisedForceB, setExercisedForceB] = useState(
    simulation.chargeModelB.exercisedForce
  );

  useEffect(() => {
    // every tick, re‑sync our React state with whatever the sim currently has
    const interval = setInterval(() => {
      setDistance(simulation.distance);
      setChargeA(simulation.chargeModelA.charge);
      setChargeB(simulation.chargeModelB.charge);
      setExercisedForceA(simulation.chargeModelA.exercisedForce);
      setExercisedForceB(simulation.chargeModelB.exercisedForce);
    }, 100);

    return () => clearInterval(interval);
  }, [simulation]);

  const handleChargeAChange = (newCharge: number) => {
    simulation.updateChargeA(newCharge);
    setChargeA(newCharge); // update React state immediately
  };

  const handleChargeBChange = (newCharge: number) => {
    simulation.updateChargeB(newCharge);
    setChargeB(newCharge); // update React state immediately
  };

  const handleDistanceChange = (newDistance: number) => {
    simulation.updateDistance(newDistance);
    setDistance(newDistance); // update React state immediately
  };

  return (
    <div
      className={`flex flex-row items-center justify-between bg-slate-100 py-3 px-3 pr-5 gap-5 w-[${SimulationProps.SIMULATION_WIDTH}px] absolute bottom-0 left-0 right-0 z-10 rounded-t-lg shadow-md`}
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
        <div className="flex flex-col items-p-4 space-y-2 px-5 py-3">
          <span className="text-lg text-[#2596be] font-semibold">
            Simulation
          </span>
          <span>
            Distance:
            <MetricBadge value={distance.toFixed(2)} unit="m" />
          </span>
          <Slider
            min={SettingsProps.DISTANCE_MIN}
            max={SettingsProps.DISTANCE_MAX}
            minIndicator={String(SettingsProps.DISTANCE_MIN) + " m"}
            maxIndicator={String(SettingsProps.DISTANCE_MAX) + " m"}
            step={0.01}
            initialValue={distance}
            onChange={handleDistanceChange}
          />
        </div>
      </Card>
    </div>
  );
}
