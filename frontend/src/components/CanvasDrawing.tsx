
"use client";

import { useRef, useState } from "react";

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [drawingData, setDrawingData ] = useState("");


  function startDrawing(
    e: React.MouseEvent<HTMLCanvasElement>
  ) {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    setDrawing(true);
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    ctx.stroke();
  }

  function stopDrawing() {
    setDrawing(false);
  }



  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
  

    e.preventDefault();

    const canvas = canvasRef.current!;
    const data = canvas.toDataURL("image/png");

    setDrawingData(data);

    const formData = new FormData(e.currentTarget);
    formData.set("drawing", data);

    // Example: access the submitted drawing data
    console.log(formData.get("drawing"));


  }


  function clearCanvas() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={400}
                            style={{
                            cursor: "crosshair",
                            maxWidth: "100%",
                            }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}

                        />

                        <button 
                            onClick={clearCanvas} 
                            className="bg-red-400 px-2 rounded-2xl text-white font-semibold border-3 border-white"
                            >
                            Clear drawing
                        </button>
                        <button className="bg-black text-white px-3 text-2xl font-bold rounded-2xl shadow-[0_5px_3px_2px_rgba(0,0,0,0.5)] focus:bg-white focus:text-black focus:scale-90 cursor-pointer mt-10">
                            Recognize
                        </button>
                    </form>

  );
}
