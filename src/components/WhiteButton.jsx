import "../styles/WhiteButton.css";

function WhiteButton({ text, link, style }) {
    return (
        <a href={link} className="white-button" style={style}>
            {text}
        </a>
    );
}

export default WhiteButton;
