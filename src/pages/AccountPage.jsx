import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AccountPage.css";

function AccountPage() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `http://localhost:5000/getUser?uid=${localStorage.getItem(
                        "uid"
                    )}`
                );

                const data = await res.json();

                setUserInfo(data);
            } catch (error) {
                console.error("Error fetching user on frontend side:", error);
            }
        };

        fetchUser();
        setLoading(false);
    }, []);

    return (
        <div className="page scrollbar">
            <Navbar />
            <div>YOUR ACCOUNT!!!</div>
            <Footer />
        </div>
    );
}

export default AccountPage;
