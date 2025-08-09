import { Flag, Minus, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const App = () => {
  let [timer, setTimer] = useState(0);
  let [count , setCount] = useState()
  let [seconds , setSeconds] = useState(0)
  let [history , setHistory] = useState([])


useEffect(() => {
  let interval
  if(count){
    interval = setInterval(() => {
      setSeconds((prev)  => prev + 1 )
      console.log(seconds)
    }, 1000);
   }
   
  history.push({
    timer,
    seconds
  }) 
  
  return ()=> clearInterval(interval)
  
}, [count , seconds])


  return (
    <div className="h-screen flex justify-center items-center bg-white text-black">
      <div className="shadow-2xl shadow-orange-500 w-90 h-100 flex  items-center flex-col gap-15 ">
        <div className="font-semibold text-5xl py-5"> {timer} </div>

        <div className="flex gap-10">
          <div
            onClick={() => {
              setTimer(timer + 1), setCount(true);
            }}
          >
            <Plus />{" "}
          </div>
          <div
            onClick={() => {
              setTimer(timer == 0 ? 0 : timer - 1), setCount(true);
            }}
          >
            {" "}
            <Minus />
          </div>
          <div
            onClick={() => {
              setTimer(0), setCount(false);
            }}
          >
            <Trash />
          </div>
        </div>

          <p className="text-left text-gray-500 w-full pl-3 ">Recent ...</p>
        <div className="flex flex-col w-full gap-6 h-28 text-gray-500 overflow-auto">


          {history.length > 0 ?    history.map((items , index)=>(<div className="flex justify-around h-full">
            {items.timer} <span> {items.count}</span> <Trash strokeWidth={1} />
            </div> 
            )) :  ''} 
        </div>
      </div>
    </div>
  );
};

export default App;
