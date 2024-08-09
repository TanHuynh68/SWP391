import Login from "@/components/Login";
import Header from "./header";

export default function AdminLoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <Header
                    heading="Welcome back, Admin"
                    paragraph=""
                />
                <Login />
            </div>
        </div>
    );
}
