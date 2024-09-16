import Image from 'next/image';
import * as React from "react"
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
export default function HomePage() {
  return (
    <>
    <div className='container '>
    <div>
      <Image src="/image/banner2.jpg" alt="Logo" width={500} height={300} className='w-full h-96 object-cover mt-10 mb-10'/>
    </div>
    <div className="min-h-screen flex flex-col">
      

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-blue-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Giúp Việc ở lại nhà</h2>
        <p className="mb-6 max-w-2xl">Đội ngũ nhân viên giúp việc chuyên nghiệp - Tận tâm với công việc, đảm bảo sự hài lòng tuyệt đối từ khách hàng. Các dịch vụ đa dạng và tiện lợi với giá cả phải chăng.</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">Đặt dịch vụ ngay</button>
      </section>

      {/* Main Content Section */}
      <section className="flex flex-col items-center p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded">
              <h3 className="text-xl font-semibold text-center">Lợi ích của Chores?</h3>
              <ul className="list-disc list-inside mt-4">
                <li>Tiết kiệm thời gian</li>
                <li>Nhân viên chuyên nghiệp</li>
                <li>Dịch vụ đa dạng</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded">
              <h3 className="text-xl font-semibold text-center">Dịch vụ nổi bật</h3>
              <p className="mt-4">Chúng tôi cung cấp các dịch vụ giúp việc nhà, vệ sinh công nghiệp, giặt ủi, nấu ăn và chăm sóc cây cảnh tại nhà.</p>
            </div>
          </div>
        </div>
      </section>

     
      
    </div>
    
    {/* Carousel Section */}
    <section className="py-12">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {[
            { src: "/image/download.jpg", alt: "Dịch vụ giúp việc" },
            { src: "/image/banner2.jpg", alt: "Vệ sinh công nghiệp" },
            { src: "/image/giupviec.jpg", alt: "Chăm sóc nhà cửa" }
          ].map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="aspect-[16/9] p-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
    
    </div>
    
    </>
  );
}
