"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:4444/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // alert(data.message);
                router.push("/login");
            } else {
                setErrorMessage(data.message || "An error occurred.");
            }
        } catch (error) {
            setErrorMessage("Failed to connect to the server.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md w-full max-w-md rounded-[20px]">
                    <h1 className="text-2xl font-bold mb-6">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 mb-4">{errorMessage}</p>
                        )}
                        <button
                            type="submit"
                            className={`bg-green-500 text-white px-4 py-2 rounded w-full ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500">
                            Sign in 
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
