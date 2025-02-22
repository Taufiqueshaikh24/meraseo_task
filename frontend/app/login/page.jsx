"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:4444/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.replace("/Home");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Invalid credentials.");
            }
        } catch (error) {
            setErrorMessage("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md rounded-[20px]">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="mb-2 font-medium">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg" required />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="mb-2 font-medium">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg" required />
                    </div>
                    <button type="submit" className={`bg-green-500 text-white px-4 py-2 rounded w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <a href="/" className="text-blue-500">
                        Sign up 
                    </a>
                </p>
            </div>
        </div>
    );
}
