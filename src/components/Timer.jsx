import { useState, useRef, useEffect } from "react"

function Timer() {
    // Håller reda på om timern körs eller ej med hjälp av useState
    const [isRunning, setIsRunning] = useState(false);
    // Håller reda på förfluten tid med hjälp av useState
    const [elapsedTime, setElapsedTime] = useState(0);
    // Används för intervall
    const intervalIdRef = useRef(null);
    // Starttiden för timern hålls här
    const startTimeRef = useRef(0);


    // UseEffect används varje gång isRunning ändras. Om isRunning är true uppdateras intervallet var 10 millisekund.
    useEffect(() => {

        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        
        // Denna funktion förstår jag inte helt. Timern funkar utan denna del men har förstått att det bör finnas
        // annars kan det uppstå problem när komponenten unmountas???
        return () => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning]);

    // Funktion som startar timern. Den räknar bort eventuell elapsedTime.
    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    // Stoppar timern. Sätter IsRunning till false med hjälp av setIsRunning i useState
    function stop() {
        setIsRunning(false)
    }

    // Nollställer timern. Sätter elapsedTime till 0 med setElapsedTime i useState. Stoppar timern genom att
    // sätta isRunning till 0 med setIsRunning till false genom useState
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // Formaterar tiden 
    function formatTime() {

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        // Padstart används för att lägga till i det här fallet en nolla till den når 2.
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <section className="timer">
            <section className="title">
                <h1>TIMER</h1>
            </section>
            {/* i display section visa resultatet i formatTime funktionen */}
            <section className="display">{formatTime()}</section>
            <section className="controls">
                {/* Varje knapp är kopplad till respektive funktion */}
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </section>
        </section>
    )
}

export default Timer