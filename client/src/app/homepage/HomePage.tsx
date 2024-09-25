import Image from 'next/image';
import * as React from "react"
import Link from 'next/link';

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
export default function HomePage() {
  
  return (
    <>
    <div className='container mx-auto 2xl:max-w-full'>
  
      <Card className="mt-10 mb-10 relative overflow-hidden p-20 bg-gradient-to-r from-blue-100 to-blue-300 shadow-xl rounded-2xl">
        <CardContent className="flex flex-col justify-center items-center h-full">
          <h2 className="text-6xl font-extrabold text-blue-800 mb-4 animate-fade-in-down">ChoresT</h2>
          <p className="text-2xl text-blue-600 font-semibold animate-fade-in-up">Your Trusted Maid Hiring Platform</p>
          <div className="mt-6 w-32 h-1 bg-blue-500 rounded-full animate-pulse"></div>
        </CardContent>
      </Card>
      
      
          <Carousel className="w-full max-w-xs mx-auto mb-10">
            <CarouselContent>
              <CarouselItem>
                <div className="p-1">
                  <Image 
                    src="/image/carousel1.png" 
                    alt="Chores 1" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Image 
                    src="/image/carousel2.png" 
                    alt="Chores 2" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Image 
                    src="/image/carousel3rm.png" 
                    alt="Chores 3" 
                    width={300} 
                    height={300} 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        
      

      <div className="min-h-screen flex flex-col">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 py-24 text-center rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-blue-800">Giúp Việc ở lại nhà</h2>
          <p className="mb-8 max-w-2xl text-lg text-blue-700">Đội ngũ nhân viên giúp việc chuyên nghiệp - Tận tâm với công việc, đảm bảo sự hài lòng tuyệt đối từ khách hàng. Các dịch vụ đa dạng và tiện lợi với giá cả phải chăng.</p>
          
          
            <button className=" bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
              <Link href="/book">
              Đặt dịch vụ ngay
              </Link>
            </button>
          
        </section>

        {/* Main Content Section */}
        <section className="flex flex-col items-center justify-center bg-white py-24 text-center">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
              <div className="w-full md:w-1/2 bg-blue-50 p-8 shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">Lợi ích của Chores?</h3>
                <ul className="list-none mt-4 space-y-4">
                  <li className="flex items-center text-blue-700">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Tiết kiệm thời gian
                  </li>
                  <li className="flex items-center text-blue-700">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Nhân viên chuyên nghiệp
                  </li>
                  <li className="flex items-center text-blue-700">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Dịch vụ đa dạng
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 bg-blue-50 p-8 shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">Dịch vụ nổi bật</h3>
                <p className="mt-4 text-blue-700 leading-relaxed">Chúng tôi cung cấp các dịch vụ giúp việc nhà, vệ sinh công nghiệp, giặt ủi, nấu ăn và chăm sóc cây cảnh tại nhà. Với đội ngũ nhân viên được đào tạo chuyên nghiệp, chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho mọi khách hàng.</p>
              </div>
            </div>
          </div>
        </section>
      
      </div>
    
    </div>
    
    </>
  );
}
