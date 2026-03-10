import ReactCompareImage from "react-compare-image";

export default function Comparison({ original, result, removeImage }) {

  if (!original || !result) return null;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = "enhanced-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center mt-12 px-4">

      {/* BEFORE / AFTER LABELS */}
      <div className="flex justify-between w-full max-w-5xl text-sm text-gray-400 mb-2 px-2">
        <span>Before</span>
        <span>After</span>
      </div>

      {/* IMAGE COMPARISON CARD */}
      <div className="w-full max-w-5xl bg-[#020617] rounded-2xl p-4 shadow-xl border border-gray-800">

        <ReactCompareImage
          leftImage={original}
          rightImage={result}
          sliderLineWidth={3}
          handleSize={40}
        />

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadImage}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Download Enhanced Image
        </button>

        {/* REMOVE BUTTON */}
        <button
          onClick={removeImage}
          className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition"
        >
          Remove Image
        </button>

      </div>

    </div>
  );
}

