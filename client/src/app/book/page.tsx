"use client";
import axios from "axios";
import { useState } from "react";
import { useAddressData } from "../hook/useAddressData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Tạo schema validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  province: z.string().min(1, {
    message: "Vui lòng chọn tỉnh/thành phố.",
  }),
  district: z.string().min(1, {
    message: "Vui lòng chọn quận/huyện.",
  }),
  ward: z.string().min(1, {
    message: "Vui lòng chọn phường/xã.",
  }),
  address: z.string().min(5, {
    message: "Địa chỉ phải có ít nhất 5 ký tự.",
  }),
  service: z.string().min(1, {
    message: "Vui lòng chọn dịch vụ.",
  }),
  squareMeters: z.string().min(1, {
    message: "Vui lòng chọn diện tích.",
  }),
  phone: z.string().min(10, {
    message: "Số điện thoại phải có ít nhất 10 số.",
  }),
  price: z.string().min(1, {
    message: "Vui lòng chọn giá.",
  }),
});

// Form booking dịch vụ
const Booking = () => {
  const { districts, wards, fetchDistricts, fetchWards } = useAddressData();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [total, setTotal] = useState(0); // Quản lý tổng giá

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      service: "",
      squareMeters: "",
      phone: "",
      price: "",
    },
  });

  const handleProvinceChange = (value: string) => {
    form.setValue("province", value);
    form.setValue("district", "");
    form.setValue("ward", "");
    fetchDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    form.setValue("district", value);
    form.setValue("ward", "");
    fetchWards(value);
  };

  const handleWardChange = (value: string) => {
    form.setValue("ward", value);
  };

  const handleSquareMetersChange = (value: string) => {
    form.setValue("squareMeters", value);

    // Tính toán giá dựa trên diện tích đã chọn
    let price = 0;
    switch (value) {
      case "30":
        price = 100; // Giá cho 0-30m
        break;
      case "60":
        price = 200; // Giá cho 30-60m
        break;
      case "100":
        price = 300; // Giá cho 60-100m
        break;
      case "101": // Giá cho hơn 100m
        price = 400;
        break;
      default:
        price = 0;
    }
    setTotal(price);
    form.setValue("price", price.toString()); // Set giá vào form
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Bạn phải đăng nhập để đặt dịch vụ.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Đặt dịch vụ thành công!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Lỗi khi đặt dịch vụ: ${error.response.data.message}`);
      } else {
        setError("Có lỗi xảy ra khi đặt dịch vụ. Vui lòng thử lại.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Đặt Dịch Vụ
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập tên của bạn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Section */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    onValueChange={handleProvinceChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="48">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    onValueChange={handleDistrictChange}
                    defaultValue={field.value}
                    disabled={!districts.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {district.district_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Ward Field */}
          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phường/Xã</FormLabel>
                <Select
                  onValueChange={handleWardChange}
                  defaultValue={field.value}
                  disabled={!wards.length}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập địa chỉ của bạn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service and Square Meters */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dịch vụ</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn dịch vụ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cleaning">Dọn dẹp</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                      <SelectItem value="gardening">Chăm sóc vườn</SelectItem>
                      <SelectItem value="laundry">Giặt là</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="squareMeters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diện tích</FormLabel>
                  <Select
                    onValueChange={handleSquareMetersChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn diện tích" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">0-30m</SelectItem>
                      <SelectItem value="60">30-60m</SelectItem>
                      <SelectItem value="100">60-100m</SelectItem>
                      <SelectItem value="101">100m+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập số điện thoại" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tổng giá</FormLabel>
                <FormControl>
                  <Input {...field} disabled placeholder="Tổng tiền" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Error and Success Alerts */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="mt-4">
              <AlertTitle>Thành công</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 py-3 px-6 rounded-lg"
          >
            Đặt Dịch Vụ
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Booking;
