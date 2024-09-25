'use client'
import Link from 'next/link';
import Image from 'next/image';
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

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
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
          <NavigationMenuList className="hidden md:flex space-x-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:text-blue-200`}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/services" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:text-blue-200`}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:text-blue-200`}>
                  <Info className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:text-blue-200`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <Button asChild variant="secondary" className="hidden md:inline-flex">
            <Link href="/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through our services
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Home className="mr-2 h-4 w-4" />
                  Home
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
