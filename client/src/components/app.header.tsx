"use client";

import Link from "next/link";
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
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  const handleBookClick = () => {
    if (isUserAuthenticated) {
      router.push('/book');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-blue-500">
      <div className="container mx-auto px-4">
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
              </NavigationMenuItem>
            </div>
            <div className="flex space-x-2">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
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
                <NavigationMenuItem>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavigationMenuItem>
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