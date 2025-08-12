import { Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [timer, setTimer] = useState(0);
  const [count, setCount] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [target, setTarget] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("key")) || []);
  }, []);

  useEffect(() => {
    let interval;
    if (count) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev + 1 === 60) {
            setMinutes((m) => {
              if (m + 1 === 60) {
                setHours((h) => (h + 1) % 24);
                return 0;
              }
              return m + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [count]);

  const Wrapup = () => {
    if (count) {
      let storage = JSON.parse(localStorage.getItem("key") || "[]");
      storage.push({ timer, seconds, minutes, hours });
      localStorage.setItem("key", JSON.stringify(storage));

      setCount(false);
      setSeconds(0);
      setHours(0);
      setMinutes(0);
      setTimer(0);
      setHistory(storage);
    }
  };

  const DeleteHistory = (index) => {
    let currentHistory = JSON.parse(localStorage.getItem("key")) || [];
    currentHistory.splice(index, 1);
    localStorage.setItem("key", JSON.stringify(currentHistory));
    setHistory(currentHistory);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 text-black p-4">
      <div className="shadow-xl bg-white rounded-2xl p-6 w-full max-w-md flex flex-col gap-6 animate-fadeIn">
        <div className="flex justify-center items-baseline gap-3">
          <span className="font-bold text-6xl transition-transform duration-300 transform hover:scale-110">
            {timer}
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Target set successfully");
              e.target.reset();
            }}
          >
            <input
              type="text"
              className="outline-none border-b-2 border-gray-400 text-gray-500 w-12 text-center focus:border-orange-500 transition-all"
              placeholder="0"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </form>
        </div>

        <div className="flex justify-center gap-8">
          <button
            onClick={() => {
              setTimer(timer + 1);
              setCount(true);
            }}
            className="p-3 bg-green-200 rounded-full hover:bg-green-300 transition-transform transform hover:scale-110 active:scale-95 shadow-md"
          >
            <Plus />
          </button>
          <button
            onClick={() => {
              setTimer(timer === 0 ? 0 : timer - 1);
              setCount(true);
            }}
            className="p-3 bg-yellow-200 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-110 active:scale-95 shadow-md"
          >
            <Minus />
          </button>
          <button
            onClick={Wrapup}
            className="p-3 bg-red-200 rounded-full hover:bg-red-300 transition-transform transform hover:scale-110 active:scale-95 shadow-md"
          >
            <Trash />
          </button>
        </div>

        {history.length > 0 && (
          <p className="text-left text-gray-500 text-sm">Recent ...</p>
        )}
        <div className="flex flex-col gap-3 max-h-40 overflow-auto pr-2">
          {history.length > 0 &&
            history.map((items, index) => (
              <div
                key={index}
                className={`flex justify-around items-center p-3 rounded-xl shadow-sm transition-all hover:shadow-md ${
                  target <= items.timer
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                <span className="font-semibold text-xl">{items.timer}</span>
                <div className="flex gap-1 items-center text-sm">
                  <span>
                    {items.hours >= 10 ? items.hours : "0" + items.hours}
                  </span>
                  :
                  <span>
                    {items.minutes >= 10 ? items.minutes : "0" + items.minutes}
                  </span>
                  :
                  <span>
                    {items.seconds >= 10 ? items.seconds : "0" + items.seconds}
                  </span>
                </div>
                <Trash
                  strokeWidth={1}
                  className="cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => DeleteHistory(index)}
                />
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
