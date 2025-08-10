function ProductCard({ product }) {
    return (
        <div className="product-card-div">
            <img
                src={product.image}
                alt="Product Image"
                className="product-card-image"
            />
            <h3 className="product-card-name">{product.name}</h3>
        </div>
    );
}

export default ProductCard;
