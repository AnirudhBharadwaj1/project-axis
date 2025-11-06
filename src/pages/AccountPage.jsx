import { useState, useEffect } from "react";
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

    // NEEDS THE FOLLOWING:
    //     - Account details (email and password)
    //     - Cart
    //     - Purchase history

    return (
        <div className="page scrollbar">
            <div className="account-page-details-container">
                <h3 className="account-page-details-header">Account Details</h3>
            </div>
            {userInfo && (
                <>
                    <h1 style={{ color: "white" }}>TESTING</h1>
                    <h3>Your cart: {userInfo.cart}</h3>
                    <h3>Your purchase history: {userInfo.purchased}</h3>
                </>
            )}
        </div>
    );
}

export default AccountPage;
