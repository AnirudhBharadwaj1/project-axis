import "../styles/WhiteButton.css";

function WhiteButton({ text, link }) {
    return (
        <a href={link} className="white-button">
            {text}
        </a>
    );
}

export default WhiteButton;
