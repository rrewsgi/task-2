"use client"

import AuthCard from "../page"

const Register = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
            <AuthCard 
            title="Create an account"
            buttonText="Sign Up"
            linkText="Already have an account?"
            linkHref="/login"
            />
        </div>
    );
};

export default Register