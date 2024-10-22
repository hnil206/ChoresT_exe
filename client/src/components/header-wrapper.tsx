'use client'
import useAuth from "@/app/hook/useAuth";
import Header from "./app.header";

export default function HeaderWrapper() {
    const { isAuthenticated, isAdmin } = useAuth();
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        </div>
    )
}
