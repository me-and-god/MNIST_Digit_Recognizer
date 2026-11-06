"use client";


import DrawingCanvas from "@/components/CanvasDrawing";
import { useState } from "react";



export default function Home() {
  const [ result, setResult ] = useState<object | null>(null);


  return (
<>
    <div>
      <div className="flex justify-center p-10">
        <p className="p-5 text-7xl font-black underline bg-linear-120 from-red-900 via-orange-500 to-gray-600 text-transparent bg-clip-text">Digit Recognizer</p>
      </div>

      <div className="flex justify-center items-center p-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-2xl font-semibold">write any digit to Test Recognition model</p>
            <div  className="border-4 border-white shadow-[0_8px_7px_6px_rgba(0,0,0,0.5)] rounded-2xl w-150 h-100 bg-gray-400 mb-5">
              <DrawingCanvas setResult={setResult}/>
            </div>
        </div>

      </div>


      {
        result != null ? (

        <div className="flex flex-col justify-center items-center gap-3 mt-30">

          <p className=" flex  gap-2 font-bold text-2xl">The digit You wrote was : <span className="text-red-600">{result["Digit"]}</span> </p>
          {/* <div className="flex gap-5">
            <p className="font-semibold">Is this corect ?</p>
            <button className="bg-green-600 font-bold text-white px-3 rounded-2xl active:scale-105 cursor-pointer">Yes</button>
            <button className="bg-red-600 font-bold text-white px-3 rounded-2xl active:scale-105 cursor-pointer">No</button>
          </div> */}
        </div>
        
        ) : null
      }


    </div>
</>
  );
}
