import "../styles/ProductModal.css";

function ProductModal({ product }) {
    // TODO: ADD A WAY TO CLOSE THIS MODAL, AND ADD THE ONCLICKS
    return (
        <div className="product-modal">
            <h3 className="product-modal-header">{product.name}</h3>
            <p className="product-modal-desc">{product.desc}</p>
            <button className="product-modal-button">Add to Cart</button>
            <button className="product-modal-button">
                <a
                    href={`product/` + product.id}
                    style={{ textDecoration: "none" }}
                >
                    View More
                </a>
            </button>
        </div>
    );
}

export default ProductModal;
