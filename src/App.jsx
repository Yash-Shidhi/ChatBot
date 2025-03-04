import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [showResult, setShowResult] = useState(true);
  const [input, setInput] = useState("");
  const [ques, setQues] = useState("");
  const [data, setData] = useState("");

  async function onSent() {
    setShowResult(false);
    setQues(input);
    const req = input;
    setInput("");
    setData("");

    // api calling
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = req;
    const result = await model.generateContent(prompt);

    setData(result.response.text());
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950">
        {/* start */}
        <div className="flex justify-between items-center text-3xl p-3 px-11 text-slate-400">
          <p>Chatbot</p>
          <FaUserCircle />
        </div>

        {/* middle */}
        <div className="flex justify-center items-center h-[85vh] w-[95%] mx-auto">
          {showResult ? (
            <>
              <div className="text-[56px] text-slate-400 font-semibold">
                <p>
                  <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                    Hello, Yash Shidhi.
                  </span>
                </p>
                <p className="text-slate-400">How can I help you today?</p>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="mb-5 flex justify-end">
                <div className="bg-slate-400 p-2 rounded-lg">{ques}</div>
              </div>
              <div className="bg-slate-400 p-2 rounded-lg">{data}</div>
            </div>
          )}
        </div>

        {/* end */}
        <div className="flex justify-center">
          <div className="w-[50vw] flex items-center justify-between gap-20 bg-slate-400 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="bg-transparent border-none outline-none p-2 text-lg font-medium w-[95%]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-4 items-center">
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
