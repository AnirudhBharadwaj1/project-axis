import "../styles/BestSelling.css";

function BestSelling({ products }) {
    // Get the top three products sold
    const getBestSellers = () => {
        return products.sort((a, b) => b.numSold - a.numSold).slice(0, 3);
    };

    return (
        <div className="best-selling-div">
            <h3 className="section-title" style={{ textAlign: "center" }}>
                Best Sellers
            </h3>
            {getBestSellers().map((product, key) => (
                <p key={key}>{product.name}</p>
            ))}
        </div>
    );
}

export default BestSelling;
