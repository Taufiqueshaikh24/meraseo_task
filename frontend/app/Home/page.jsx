"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Home() {
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:4444/user/me", {
                    method: "GET",
                    credentials: "include", // Sends cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.name);
                } else {
                    setErrorMessage('Failed to fetch user data.');
                    Cookies.remove('token');
                    router.replace('/login');
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching user data.');
                console.error(error);
            } finally {
                setIsLoading(false); // ✅ Stop loading after request
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        setIsLoading(true); // Show loading state
        fetch("http://localhost:4444/user/logout", {
            method: "POST",
            credentials: "include", // Send cookies to the backend
        })
            .then(() => {
                Cookies.remove('token'); // Remove cookie from frontend
                router.replace('/login');
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                Cookies.remove('token'); // Remove cookie even if backend fails
                router.replace('/login');
            })
            .finally(() => {
                setIsLoading(false); // Hide loading state
            });
    };

    if (isLoading) {
        return <div className="text-center text-xl font-semibold">Loading...</div>;
    }

    if (errorMessage) {
        return <div className="text-center text-red-500">{errorMessage}</div>;
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Welcome, {userName}!</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
