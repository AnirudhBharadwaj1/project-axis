import "../styles/Filter.css";

function Filter({ selectedFilters, setSelectedFilters }) {
    const filterOptions = [
        "free-kits",
        "drum-kits",
        "one-shot-kits",
        "loop-kits",
        "fx-kits",
    ];

    const filterOptionsDisplay = {
        "free-kits": "Free Kits",
        "drum-kits": "Drum Kits",
        "one-shot-kits": "One Shot Kits",
        "loop-kits": "Loop Kits",
        "fx-kits": "FX Kits",
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
                <label key={option} className="filter-checkbox-label">
                    <input
                        type="checkbox"
                        value={option}
                        onChange={handleFilterChange}
                        className="filter-checkbox"
                        active={option in selectedFilters}
                    />
                    {filterOptionsDisplay[option]}
                </label>
            ))}
        </div>
    );
}

export default Filter;
