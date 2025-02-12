"use client"

import AuthCard from "../page"

const Login = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
            <AuthCard
            title="Sign in with email"
            buttonText="Get started"
            linkText="Don't have an account?"
            linkHref="/register"
            />
        </div>
    );
};

export default Login