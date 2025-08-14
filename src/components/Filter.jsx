import "../styles/Filter.css";

function Filter({ selectedFilters, setSelectedFilters }) {
    const filterOptions = [
        "drum-kits",
        "one-shot-kits",
        "fx-kits",
        "loop-kits",
    ];

    const filterOptionsDisplay = {
        "drum-kits": "Drum Kits",
        "one-shot-kits": "One Shot Kits",
        "fx-kits": "FX Kits",
        "loop-kits": "Loop Kits",
    };

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        setSelectedFilters((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((f) => f !== value);
            }
        });
    };

    return (
        <div className="filter-div">
            {filterOptions.map((option) => (
                // <label key={option} className="filter-checkbox-label">
                <label
                    key={option}
                    className={`filter-checkbox-label ${
                        selectedFilters.includes(option) ? "active" : ""
                    }`}
                >
                    <input
                        type="checkbox"
                        value={option}
                        onChange={handleFilterChange}
                        className="filter-checkbox"
                        checked={selectedFilters.includes(option)}
                    />
                    {filterOptionsDisplay[option]}
                </label>
            ))}
        </div>
    );
}

export default Filter;
