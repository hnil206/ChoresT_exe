'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  const router = useRouter(); // Initialize the router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, values);
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        const admin = response.data.roles && response.data.roles.includes('admin');
        alert('Login successful');

        if (admin) {
          window.location.href = '/admin'; // Redirect to /admin for admin users
        } else {
          window.location.href = '/'; // Redirect to home for regular users
        }
      } else {
        console.error('No token received:', response.data);
        alert('Login failed: No token received from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'An error occurred during login';
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data?.message || 'Server error';
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your internet connection.';
        } else {
          errorMessage = error.message;
        }
      }
  
      alert(errorMessage);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to ChoresT</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Do not have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">Register here</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;