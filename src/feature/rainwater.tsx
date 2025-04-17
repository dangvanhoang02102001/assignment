import { useRef, useState } from "react";

const blockSize = 30;

const RainWaterVisualizer = () => {
  const [input, setInput] = useState("");
  const svgRef = useRef<SVGSVGElement | null>(null);

  const draw = () => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = "";

    const heights = input
      .split(",")
      .map((str) => parseInt(str.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 0);

    if (heights.length === 0) {
      alert("Please type valid input, ex: 3,0,2,0,4");
      return;
    }

    const maxHeight = Math.max(...heights);
    const n = heights.length;

    const leftMax: number[] = new Array(n).fill(0);
    const rightMax: number[] = new Array(n).fill(0);
    const water: number[] = new Array(n).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    for (let i = 0; i < n; i++) {
      water[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
    }

    for (let i = 0; i < n; i++) {
      for (let h = 0; h < heights[i]; h++) {
        drawRect(svg, i, maxHeight - h - 1, "white", "black");
      }

      for (let w = 0; w < water[i]; w++) {
        drawRect(svg, i, maxHeight - heights[i] - w - 1, "#3b82f6"); // Tailwind blue-500
      }

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", (i * blockSize + 10).toString());
      text.setAttribute("y", (maxHeight * blockSize + 15).toString());
      text.setAttribute("font-size", "14px");
      text.textContent = i.toString();
      svg.appendChild(text);
    }

    const totalWater = water.reduce((sum, w) => sum + w, 0);
    alert(`Result: ${totalWater} m³`);
  };

  const drawRect = (
    svg: SVGSVGElement,
    x: number,
    y: number,
    fill: string,
    stroke: string = "none"
  ) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", (x * blockSize).toString());
    rect.setAttribute("y", (y * blockSize).toString());
    rect.setAttribute("width", blockSize.toString());
    rect.setAttribute("height", blockSize.toString());
    rect.setAttribute("fill", fill);
    rect.setAttribute("stroke", stroke);
    svg.appendChild(rect);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-2 items-center mb-4">
        <input
          type="text"
          className="border px-4 py-2 rounded w-full max-w-md"
          placeholder="Type number: 3,0,2,1,4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-[#FF4238]/50 text-white px-4 py-2 cursor-pointer rounded hover:brightness-90"
          onClick={draw}
        >
          Drawer
        </button>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height={blockSize * 10}
        className="border bg-white"
      ></svg>
    </div>
  );
};

export default RainWaterVisualizer;
