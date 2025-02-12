import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import Link  from "next/link";

interface AuthCardProps {
    title: string;
    buttonText: string;
    linkText:string;
    linkHref: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, buttonText, linkText, linkHref }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-center items-center mb-4">
                <span className="text-3xl">🔑</span>
            </div>
            <h2 className="text-xl font-semibold text-center">{title}</h2>
            <p className="text-gray-500 text-center text-sm mt-1">
                Akses semua fitur, yuk~
            </p>

            <form className="mt-4">
                <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 mb-2"
                />
                <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 mb-2"
                />

                <div className="text-right text-sm text-blue-500 cursor-pointer">
                    Forgot password?
                </div>
                <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg mt-3 hover:bg-gray-800 transition"
                >
                    {buttonText}
                </button>
            </form>

            <div className="text-center text-gray-500 text-sm mt-4">
                <p>
                    {linkText}{" "}
                    <Link href={linkHref} className="text-blue-500">
                    Click here
                    </Link>
                </p>
            </div>

            <div className="mt-4 flex justify-center gap-4">
                <button className="p-2 border rounded-full">
                    <FaGoogle size={20} />
                </button>
                <button className="p-2 border rounded-full">
                    <FaFacebook size={20} />
                </button>
                <button className="p-2 border rounded-full">
                    <FaApple size={20} />
                </button>
            </div>
        </div>
    );
};

export default AuthCard