import { useState } from "react";
import "./App.css";
import NumberList from "./feature/number-list";
import FileDropper from "./feature/drag-drop";
import RainWaterVisualizer from "./feature/rainwater";

const TABS = [
  {
    id: 1,
    name: "Test 1",
    value: 1,
  },
  {
    id: 2,
    name: "Test 2",
    value: 2,
  },
  {
    id: 3,
    name: "Test 3",
    value: 3,
  },
];

function App() {
  const [currentTab, setCurrentTab] = useState(1);

  const getComponent = (tab: number) => {
    if (tab === 1) {
      return <NumberList />;
    }
    if (tab === 2) {
      return <FileDropper />;
    }
    if (tab === 3) {
      return <RainWaterVisualizer />;
    }
  };

  return (
    <div className="h-screen w-full ">
      <div className="flex items-center justify-center gap-x-3">
        {TABS.map((tab) => (
          <div
            className={`px-8 py-4 ${
              currentTab === tab.value
                ? "bg-[#FF4238]/50"
                : "border border-[#FF4238]/50"
            } text-white rounded-md cursor-pointer`}
            key={tab.id}
            onClick={() => setCurrentTab(tab.value)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mt-20 w-full min-h-[600px] border border-[#FF4238]/50 flex items-center justify-center">
        {getComponent(currentTab)}
      </div>
    </div>
  );
}

export default App;
