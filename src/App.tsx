import SimulationContainer from "./components/SimulationContainer";
import FullscreenProvider from "./hooks/FullscreenContext";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FullscreenProvider>
        <SimulationContainer />
      </FullscreenProvider>
    </div>
  );
}

export default App;
