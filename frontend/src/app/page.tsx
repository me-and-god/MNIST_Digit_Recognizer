"use client";

import { useState } from "react";



export default function Home() {
  const [ result, setResult ] = useState(null);

  return (
<>
    <div>
      <div className="flex justify-center items-center p-10">
        <p className="text-5xl font-black underline">Digit Recognizer</p>
      </div>

      <div className="flex justify-center items-center p-10">
        <form action="" className="flex flex-col justify-center items-center gap-5">
          <p className="text-2xl font-semibold">write any digit/letter to Test Recognition model</p>
          <div  className="border-4 border-white shadow-[0_8px_7px_6px_rgba(0,0,0,0.5)] rounded-2xl w-150 h-100 bg-gray-400">

          </div>
          <button className="bg-black text-white px-3 text-2xl font-bold rounded-2xl shadow-[0_5px_3px_2px_rgba(0,0,0,0.5)] focus:bg-white focus:text-black focus:scale-90 cursor-pointer">
              Recognize
          </button>
        </form>
      </div>


      {
        result != null && (

        <div className="flex flex-col justify-center items-center gap-3">
          <p className="font-semibold">The digit/letter You wrote was : {}</p>
          <div className="flex gap-5">
            <p className="font-semibold">Is this corect ?</p>
            <button className="bg-green-600 font-bold text-white px-3 rounded-2xl active:scale-105 cursor-pointer">Yes</button>
            <button className="bg-red-600 font-bold text-white px-3 rounded-2xl active:scale-105 cursor-pointer">No</button>
          </div>
        </div>
        
        )
      }


    </div>
</>
  );
}
