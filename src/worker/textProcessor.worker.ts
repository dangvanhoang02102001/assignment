// src/workers/textProcessor.worker.ts

const ctx: Worker = self as any;

ctx.onmessage = (e) => {
  const fileText = e.data as string;

  const isValid = /^[a-zA-Z.,\s]+$/.test(fileText);
  if (!isValid) {
    ctx.postMessage({ error: "File contains invalid characters." });
    return;
  }

  const cleanText = fileText.toLowerCase().replace(/[.,]/g, "");
  const words = cleanText.split(/\s+/).filter(Boolean);

  const wordCount: Record<string, number> = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const uniqueWords = Object.keys(wordCount);
  if (uniqueWords.length < 3) {
    ctx.postMessage({ error: "File needs 3 different words" });
    return;
  }

  const sorted = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

  ctx.postMessage({
    uniqueCount: uniqueWords.length,
    top3: sorted.slice(0, 3),
  });
};

export default null as any;
