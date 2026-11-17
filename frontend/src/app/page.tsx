"use client";


import DrawingCanvas from "@/components/CanvasDrawing";
import { useState, type Dispatch, type SetStateAction } from "react";



const Digits: Record<string, string> = {
  0 : '0️⃣',
  1 : '1️⃣',
  2 : '2️⃣',
  3 : '3️⃣',
  4 : '4️⃣',
  5 : '5️⃣',
  6 : '6️⃣',
  7 : '7️⃣',
  8 : '8️⃣',
  9 : '9️⃣'
}

export default function Home() {
  const [ result, setResult ] = useState<{ Digit: number | string } | null>(null);

  const handleResult: Dispatch<SetStateAction<object | null>> = (action) => {
    setResult((previous) => {
      const next = typeof action === "function" ? action(previous) : action;
      if (next !== null && "Digit" in next) {
        const digit = next.Digit;
        if (typeof digit === "number" || typeof digit === "string") {
          return { Digit: digit };
        }
      }
      return null;
    });
  };


  return (
<>
    <div>
      <div className="flex justify-center p-10">
        <p className="p-3 text-8xl tracking-wide font-black underline bg-linear-120 from-red-700 via-yellow-500 to-red-600 text-transparent bg-clip-text">Digit Recognizer</p>
      </div>

      <div className="flex justify-center items-center p-5">
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-3xl font-semibold text-white">write any digit to Test Recognition model</p>
            <div  className="border-4 border-white shadow-[0_8px_7px_6px_rgba(0,0,0,0.5)] rounded-2xl w-150 h-100 bg-gray-400 mb-5">
              <DrawingCanvas setResult={handleResult}/>
            </div>
        </div>

      </div>


      {
        result != null ? (

        <div className="flex flex-col justify-center items-center gap-3 mt-30">

          <p className=" flex text-white  gap-2 font-bold text-4xl">The digit You wrote was : <span className="text-red-600">{Digits[result.Digit]}</span> </p>
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
