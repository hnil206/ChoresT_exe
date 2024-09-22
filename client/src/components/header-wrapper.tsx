'use client'
import useAuth from "@/app/hook/useAuth";
import Header from "./app.header";
import useAuthToken from "@/app/hook/useAuth";

export default function HeaderWrapper() {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} />
        </div>
    )
}