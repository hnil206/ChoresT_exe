"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, Briefcase, Info, Phone, UserPlus } from "lucide-react";
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
    router.push('/login');
  };

  const handleBookClick = () => {
    if (isAuthenticated) {
      router.push('/book');
    } else {
      router.push('/login');
    }
  };


  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <div className="text-3xl font-extrabold text-white">
          <Link href="/" className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-300">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span>ChoresT</span>
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/image/download.jpg"
                alt="Logo"
                width={40}
                height={40}
              />
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Maid Rental
                  </NavigationMenuLink>
                </Link>
                <Link href="/services" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Services
                </Link>
                <Link href="/about" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Info className="mr-2 h-4 w-4" />
                  About
                </Link>
                <Link href="/contact" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </Link>
                <Link href="/signup" className="flex items-center text-blue-600 hover:text-blue-800">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </NavigationMenuItem>
            </div>
            <div className="flex space-x-2">
              <NavigationMenuItem>
                <Button variant="outline" onClick={handleBookClick}>
                  Book a Maid
                </Button>
              </NavigationMenuItem>
              {isAuthenticated ? (
                <>
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
                </>
              ) : (
                <NavigationMenuItem>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}