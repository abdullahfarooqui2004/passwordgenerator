import { useState, useRef, useCallback, useEffect } from "react";

const App = () => {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);

    const [password, setPassword] = useState("");

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "1234567890";
        if (charAllowed) str += "!@#$%^&*()_+-={}|[]\:;<>?,./`~";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);

    useEffect(() => {
        passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])
    
    return (
        <>
            <div className="h-screen w-full bg-blue-200">
                <h1 className="text-center text-4xl pt-4">
                    Password Generator
                </h1>

                <div className="max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-blue-800 bg-gray-300">
                    <div className="flex flex-row items-center text-white w-full overflow-hidden mb-4 rounded-lg">
                        <input
                            className="outline-none bg-white text-gray-700 w-full py-1 px-3"
                            type="text"
                            placeholder="password"
                            readOnly
                            value={password}
                        />
                        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
                            Copy
                        </button>
                    </div>
                    <div className="flex flex-row gap-4 justify-center items-center font-normal">
                        <div className="flex items-center justify-center gap-x-1">
                            <input
                                onChange={(e) => setLength(e.target.value)}
                                id="length"
                                type="range"
                                min={8}
                                max={20}
                                value={length}
                                className="cursor-pointer"
                            />
                            <label htmlFor="length">Length : {length}</label>
                        </div>
                        <div className="flex items-center gap-x-1 justify-center">
                            <input
                                type="checkbox"
                                id="number"
                                defaultChecked={numberAllowed}
                                onChange={() => {
                                    setNumberAllowed((prev) => !prev);
                                }}
                            />
                            <label htmlFor="number">Number</label>
                        </div>
                        <div className="flex items-center gap-x-1 justify-center">
                            <input
                                type="checkbox"
                                id="character"
                                defaultChecked={charAllowed}
                                onChange={() => {
                                    setCharAllowed((prev) => !prev);
                                }}
                            />
                            <label htmlFor="character">Character</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
