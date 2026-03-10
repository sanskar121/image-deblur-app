import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadBox from "../components/UploadBox";
import CameraCapture from "../components/CameraCapture";
import QRScanner from "../components/QRScanner";
import Comparison from "../components/Comparison";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

export default function Home() {

  const [original, setOriginal] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeImage = () => {
    setOriginal(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">

      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6">

        {/* Hero Section */}
        <Hero />

        {/* Main Card */}
        <div className="mt-16 bg-[#020617] border border-gray-800 rounded-3xl p-10 shadow-2xl">

          {/* Upload Image */}
          <UploadBox
            setOriginal={setOriginal}
            setResult={setResult}
            setLoading={setLoading}
          />

          {/* Laptop Camera */}
          <CameraCapture
            setOriginal={setOriginal}
            setResult={setResult}
            setLoading={setLoading}
          />

          {/* QR Code for Phone Camera */}
          <QRScanner />

          {/* Loading Animation */}
          {loading && <Loader />}

          {/* Image Comparison */}
          <Comparison
            original={original}
            result={result}
            removeImage={removeImage}
          />

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

