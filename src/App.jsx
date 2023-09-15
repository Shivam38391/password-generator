import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(4);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useof ref
  const passwordRef = useRef(null);

  const copyPassswordtoClip = useCallback(() => {
    //how to select and copy to clipboard
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  let generatPass = function () {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "@#&%$!<=+-_)(*,.)>";
    }

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);

      let char = str[index];
      pass = pass + char;
    }

    setPassword(pass);
  };

  const passGenerator = useCallback(generatPass, [
    length,
    number,
    character,
    setPassword,
  ]);

  useEffect(() => {
    passGenerator();
  }, [length, number, character, passGenerator]);

  return (
    <>
      <h1 className="text-5xl mt-20 text-center shadow-xl font-bold ">
        Passsword Generator
      </h1>

      <div className="w-full max-w-xl mx-auto my-8 py-10 px-4 shadow-md rounded-lg text-orange-600 bg-gray-500 text-center font-bold ">
        
        Generate your pasword
        <div className="flex  shadow-xl rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1  font-semibold"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPassswordtoClip}
            className="bg-cyan-500 px-3  text-slate-950 font-extrabold"
          >
            Copy
          </button>
        </div>
        <div className="pt-5 flex text-sm gap-x-2 text-white font-bold">
          <div className="flex items-center shadow-lg bg-blue-400 px-3 py-1 rounded-lg  gap-x-1">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="cursor-pointer w-20"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              className="cursor-pointer "
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Numbers-Allow</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              className="cursor-pointer "
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label>Character-Allow</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
