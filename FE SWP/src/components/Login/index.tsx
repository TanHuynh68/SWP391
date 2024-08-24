import { useState, ChangeEvent, FormEvent } from 'react';
import { loginFields } from "../../constants/form";
import Input from "@components/Input";
import FormExtra from '../FormExtra';
import FormAction from '../FormAction';
import { login } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { decodeJWT } from '@/configs/decode-jwt';
import { message } from 'antd';


interface LoginState {
    [key: string]: string;
}

interface DataLogin {
    token?: string;
}

const fields = loginFields;
const fieldsState: LoginState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState<LoginState>(fieldsState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authenticateUser(loginState);
    };

    const authenticateUser = async (loginData: LoginState) => {
        try {
            const response = await login(loginData.email, loginData.password);

            // Kiểm tra xem phản hồi có thuộc tính token hay không
            if ('token' in response) {
                const { token } = response as DataLogin;  // Type assertion
                if (token) {
                    const decodeToken =  decodeJWT(token);
                    console.log("decodeToken: ", decodeToken)
                    if (decodeToken.role === "ADMIN") {
                        console.log("decodeToken: ", decodeToken)
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(decodeToken));
                        navigate("/admin/dashboard");
                        message.success("Admin Login Successfully")
                    } else {
                        message.error("Unauthorized!")
                        navigate("/");
                    }
                }
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <form className="mt-8" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map(field => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}
