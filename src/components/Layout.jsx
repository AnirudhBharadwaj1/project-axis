import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBox";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="page-content">{children}</div>
            <Footer />
            <ChatBot />
        </>
    );
}

export default Layout;
