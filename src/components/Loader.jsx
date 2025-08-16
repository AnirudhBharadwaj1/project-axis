import { useState, useEffect } from "react";
import "../styles/Loader.css";

function Loader() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const intervals = [
            setTimeout(() => setStage(1), 500), // expand x-axis
            setTimeout(() => setStage(2), 1000), // collapse
        ];
        return () => intervals.forEach(clearTimeout);
    }, []);

    return (
        <div className="axis-loader">
            <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Y axis */}
                <line
                    x1="50"
                    y1="90"
                    x2="50"
                    y2={stage === 0 ? "90" : "10"}
                    stroke="black"
                    strokeWidth="2"
                    className={`axis-line ${stage >= 0 ? "animate" : ""}`}
                />
                {/* X axis */}
                <line
                    x1="50"
                    y1="50"
                    x2={stage >= 1 ? "90" : "50"}
                    y2="50"
                    stroke="black"
                    strokeWidth="2"
                    className={`axis-line ${stage >= 1 ? "animate" : ""}`}
                />
            </svg>
        </div>
    );
}

export default Loader;
