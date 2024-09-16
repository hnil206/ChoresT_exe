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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  province: z.string().min(1, {
    message: "Please select a province.",
  }),
  district: z.string().min(1, {
    message: "Please select a district.",
  }),
  ward: z.string().min(1, {
    message: "Please select a ward.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  service: z.string().min(1, {
    message: "Please select a service.",
  }),
  squareMeters: z.string().min(1, {
    message: "Please select square meters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  // Remove validation for price field since it's calculated automatically
});

const Booking = () => {
  const { districts, wards, fetchDistricts, fetchWards } = useAddressData();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [total, setTotal] = useState(0); // State to manage total amount

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

    // Calculate price based on selected square meters
    let price = 0;
    switch (value) {
      case "30":
        price = 100; // Example price for 0-30m
        break;
      case "60":
        price = 200; // Example price for 30-60m
        break;
      case "100":
        price = 300; // Example price for 60-100m
        break;
      case "101": // Example price for more than 100m
        price = 400;
        break;
      default:
        price = 0;
    }
    setTotal(price); // Set the calculated price to total state
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");

    // Set the price value from total before submitting the form
    const updatedValues = {
      ...values,
      price: total.toString(), // Add total as the price
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/books/create",
        updatedValues
      );
      setSuccess("Booking created successfully!");
    } catch (error) {
      setError("Error creating booking. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={handleProvinceChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="48">Da Nang</SelectItem>
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
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={handleDistrictChange}
                    defaultValue={field.value}
                    disabled={!districts.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
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

          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ward</FormLabel>
                <Select
                  onValueChange={handleWardChange}
                  defaultValue={field.value}
                  disabled={!wards.length}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Ward" />
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

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="gardening">Gardening</SelectItem>
                    <SelectItem value="laundry">Laundry</SelectItem>
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
                <FormLabel>Square Meters</FormLabel>
                <Select
                  onValueChange={handleSquareMetersChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Square Meters" />
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display total price */}
          <FormField
            control={form.control}
            name="price"
            render={() => (
              <FormItem>
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input value={`${total}`} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Booking;
