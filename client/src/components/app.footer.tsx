'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Mail, Instagram, Linkedin, Github } from 'lucide-react';

export default function App() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <section className="mb-8 flex justify-center space-x-4">
          <Button variant="default" size="icon" className="hover:bg-blue-600 border-blue-600">
            <Facebook className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="hover:bg-blue-400 border-blue-400">
            <Twitter className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="hover:bg-red-600 border-red-600">
            <Mail className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="hover:bg-pink-600 border-pink-600">
            <Instagram className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="hover:bg-blue-700 border-blue-700">
            <Linkedin className="h-6 w-6" />
          </Button>
          <Button variant="default" size="icon" className="hover:bg-gray-800 border-gray-800">
            <Github className="h-6 w-6" />
          </Button>
        </section>

        {/* Subscribe Form */}
        <section className="mb-8">
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input
              type="email"
              placeholder="Email address"
              className="w-full md:w-1/2 px-4 py-2 text-black border rounded-md"
            />
            <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md">
              Subscribe
            </Button>
          </form>
        </section>

        {/* Single Link & Images */}
        <section className="flex justify-center items-center flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <Card className="bg-gray-800">
            <CardContent className="text-center">
              <h5 className="text-lg font-bold mb-4 text-white">Our Products</h5>
              <Link href="#!" className="hover:underline text-gray-400">
                Visit our store
              </Link>
            </CardContent>
          </Card>

          {/* Image Section */}
          <div className="flex justify-center items-center space-x-4">
            <img src="/image/logo.jpg" alt="Product 1" className="w-24 h-24 rounded-md object-cover" />
            <img src="/image/download.jpg" alt="Product 2" className="w-24 h-24 rounded-md object-cover" />
            <img src="/image/giupviec.jpg" alt="Product 3" className="w-24 h-24 rounded-md object-cover" />
          </div>
        </section>
      </div>

      {/* Copyright Section */}
      <div className="text-center p-6 bg-gray-800 mt-8">
        <p className="text-gray-500">
          © 2024 Copyright:
          <Link href="#" className="text-blue-400 hover:underline"> Your Company Name</Link>
        </p>
      </div>
    </footer>
  );
}
