import { useFullscreen } from "../hooks/FullscreenContext";
import Simulation from "./Simulation";

export default function SimulationContainer() {
  const { isFullscreen } = useFullscreen();
  return (
    <div
      className={`${
        !isFullscreen &&
        "border-2 border-[#2596be] rounded-lg shadow-lg bg-white overflow-hidden"
      }`}
    >
      <Simulation />
    </div>
  );
}
