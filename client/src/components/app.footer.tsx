'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Mail, Instagram, Linkedin, Github } from 'lucide-react';

export default function App() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <section className="mb-4 flex justify-center space-x-2">
          
        <Button variant="default" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          
          <Button variant="default" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon">
            <Github className="h-4 w-4" />
          </Button>
        </section>

        <section className="mb-4">
          <form className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
            
            <Input type="email" placeholder="Email address" className="w-full md:w-auto" />
            <Button variant="default">Subscribe</Button>
          </form>
        </section>

        

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((column) => (
              <Card key={column} className="bg-gray-800">
                <CardContent>
                  <h5 className="text-lg font-bold mb-2">Links</h5>
                  <ul className="space-y-1">
                    {[1, 2, 3, 4].map((link) => (
                      <li key={link}>
                        <Link href="#!" className="hover:underline">
                          Link {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className="text-center p-3 bg-gray-800">
        © 2024 Copyright:
        
      </div>
    </footer>
  );
}
