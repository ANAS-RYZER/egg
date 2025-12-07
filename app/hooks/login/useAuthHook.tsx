import { useState } from "react";
import api from "@/app/httpClient";

interface AdminUser {
    email: string;
    [key: string]: any; // Allow additional properties
}

interface LoginResponse {
    message: string;
    token: string;
    admin: AdminUser;
}

const useAuthHook = () => {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<AdminUser | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.post("/api/admin/login", {
                email,
                password,
            });

            

            const { token, admin } = res.data;

            // Save token in sessionStorage
            sessionStorage.setItem("token", token);

            // Save user details in React state
            setUser(admin);

            return admin; // optional return
        } catch (err: any) {
            console.error(err);
            // Handle both Axios errors and custom error objects
            const errorMessage = err?.response?.data?.message || err?.message || "Login failed";
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        login, // function to trigger login
    };
};

export default useAuthHook;
