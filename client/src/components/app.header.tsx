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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useAuth from "../app/hook/useAuth";
import { useRouter } from "next/navigation";
import { logout } from "@/app/utils/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import Lucide Icons
import { User, LogOut, Calendar, FileText, Key } from 'lucide-react';

// Add this import
import { useEffect } from 'react';
import { any } from 'zod';

export default function Header({ isAuthenticated, isAdmin }: { isAuthenticated: boolean, isAdmin: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleMyBooking = () => {
    router.push("/user/get-my-booking");
  };
  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push("/book");
    } else {
      router.push("/login");
    }
  };
  const handlebookingrequested = () => {
    router.push("/bookings");
  }
  const isHousemaid = true;
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
          <Link href="/" className="text-white hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Home
          </Link>

          <Link href="/housemaid/gethousemaid" className="text-white hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Housemaid
          </Link>
          <Link href="/service" className="text-white hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Service
          </Link>

          <Link href="/blogs" className="text-white hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 hover:scale-105 transition-transform duration-200">
            Contact
          </Link>
        </nav>

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <div>
              <DropdownMenu modal={true}>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isAdmin ? (

                    <DropdownMenuItem onClick={() => { }}>
                      <a href="/admin">Admin Dashboard</a>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={handleMyBooking}>
                        My Booking
                      </DropdownMenuItem>
                      {isHousemaid && (
                        <DropdownMenuItem onClick={handlebookingrequested}>
                          Booking Requested
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                  <DropdownMenuItem onClick={handleProfile}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <NavigationMenu>
              <NavigationMenuItem>
                <Link href="/login" className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform duration-200">
                  Login
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/signup" className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 transition-transform duration-200">
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
