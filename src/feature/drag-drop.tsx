import React, { useCallback, useRef, useState } from "react";
import TextProcessorWorker from "../worker/textProcessor.worker?worker";

const FileDropper = () => {
  const [result, setResult] = useState<null | {
    uniqueCount: number;
    top3: [string, number][];
  }>(null);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const handleFile = useCallback((file: File) => {
    setResult(null);
    setError(null);

    if (!file.name.endsWith(".txt")) {
      setError("Only accept file .txt");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;

      if (!workerRef.current) {
        workerRef.current = new TextProcessorWorker();
        workerRef.current.onmessage = (e: MessageEvent) => {
          const data = e.data;
          if (data.error) {
            setError(data.error);
          } else {
            setResult(data);
          }
        };
      }

      workerRef.current.postMessage(text);
    };

    reader.onerror = () => {
      setError("Can not read this file.");
    };

    reader.readAsText(file);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-blue-500 p-8 text-center rounded-md max-w-xl mx-auto "
    >
      <div className="py-10  mb-4 text-lg font-medium">
        Drag and drop .txt file to here
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 text-left">
          <p>
            <strong>Total words:</strong> {result.uniqueCount}
          </p>
          <p>
            <strong>Top 3 popular words:</strong>
          </p>
          <ul className="list-disc pl-6">
            {result.top3.map(([word, count]) => (
              <li key={word}>
                {word} – {count} times
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileDropper;
