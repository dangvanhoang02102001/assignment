import React, { useState } from "react";

const NumberList: React.FC = () => {
  const [list, setList] = useState<number[]>([]);
  const [insertIndex, setInsertIndex] = useState<number>(0);
  const [insertValue, setInsertValue] = useState<number>(0);
  const [queryStart, setQueryStart] = useState<number>(1);
  const [queryEnd, setQueryEnd] = useState<number>(1);
  const [queryResult, setQueryResult] = useState<number | null>(null);

  const handleInsert = (): void => {
    const newList: number[] = [...list];
    newList.splice(insertIndex, 0, insertValue);
    setList(newList);
  };

  const handleQuery = (): void => {
    const subList: number[] = list.slice(queryStart - 1, queryEnd);
    const minValue: number = Math.min(...subList);
    setQueryResult(minValue);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-tramsparent rounded-2xl shadow-md space-y-6">
      {/* Insert Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Insert a Number</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-1 w-1/2"
            placeholder="Index"
            value={insertIndex}
            onChange={(e) => setInsertIndex(Number(e.target.value))}
          />
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-1 w-1/2"
            placeholder="Value"
            value={insertValue}
            onChange={(e) => setInsertValue(Number(e.target.value))}
          />
        </div>
        <button
          onClick={handleInsert}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        >
          Insert
        </button>
      </div>

      {/* Query Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Query Minimum in Range</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-1 w-1/2"
            placeholder="Start (1-based)"
            value={queryStart}
            onChange={(e) => setQueryStart(Number(e.target.value))}
          />
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-1 w-1/2"
            placeholder="End (inclusive)"
            value={queryEnd}
            onChange={(e) => setQueryEnd(Number(e.target.value))}
          />
        </div>
        <button
          onClick={handleQuery}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        >
          Query
        </button>
      </div>

      {/* List Display */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Current List</h2>
        <div className="border border-[#FF4238] p-3 rounded text-sm">
          {list.length ? (
            <>{`[${list.join(", ")}]`}</>
          ) : (
            <span className="italic text-gray-500">[]</span>
          )}
        </div>
      </div>

      {/* Query Result */}
      {queryResult !== null && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Query Result</h2>
          <div className=" p-3 rounded text-sm">
            Min value between index {queryStart} and {queryEnd}:{" "}
            <strong>{queryResult}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberList;
