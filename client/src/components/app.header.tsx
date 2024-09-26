"use client";
import Link from 'next/link';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useAuth from "../app/hook/useAuth";
import { useRouter } from "next/navigation";
import { logout } from "@/app/utils/logout";

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push("/book");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="bg-blue-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        <div className="text-2xl font-bold">
          <Link href="/">
          <Image
              src="/image/logo.jpg"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span>ChoresT</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link href="/housemaid/gethousemaid" className="text-white hover:text-gray-200">
            Housemaid
          </Link>
          <Link href="/service" className="text-white hover:text-gray-200">
            Service
          </Link>
          <Link href="/blog" className="text-white hover:text-gray-200">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
        </nav>

      
        <div className="flex space-x-4">
        {isAuthenticated ? (
                <NavigationMenu>
                  <NavigationMenuItem>
                    <Link href="/profile" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Profile
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenu>
              ):(
                <NavigationMenu>
                  <NavigationMenuItem>
                    <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700">
                      Login
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/signup" className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700">
                      Sign Up
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenu>
              )}
        </div>
      </div>
    </header>
  );
}