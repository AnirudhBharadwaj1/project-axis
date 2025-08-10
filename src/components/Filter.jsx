import "../styles/Filter.css";

function Filter({ selectedFilters, setSelectedFilters }) {
    const filterOptions = [
        "free-kits",
        "drum-kits",
        "one-shot-kits",
        "loop-kits",
    ];

    const filterOptionsDisplay = {
        "free-kits": "Free Kits",
        "drum-kits": "Drum Kits",
        "one-shot-kits": "One Shot Kits",
        "loop-kits": "Loop Kits",
    };

    const handleFilterChange = (e) => {
        //
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
                    />
                    {filterOptionsDisplay[option]}
                </label>
            ))}
        </div>
    );
}

export default Filter;
