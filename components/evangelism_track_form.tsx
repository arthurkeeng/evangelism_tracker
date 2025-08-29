"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ShowContacts from "./show_contacts";

interface Person {
  name: string;
  phone: string;
}

interface Data {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}
const EvangelismTrackForm = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [loading, setLoading] = useState(false);

  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;

  const evangelismTrackerSchema = z.object({
    name: z.string(),
    email: z
      .string()
      .email("Invalid email")
      .or(z.literal("")) // allow empty string
      .optional(),
    phone: z.string().regex(phoneRegex, {
      message: "Invalid Nigerian phone number",
    }),
    address: z
      .string()
      .min(5, "Must be more than 5 characters")
      .or(z.literal("")) // allow empty string
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(evangelismTrackerSchema),
  });

  const onSubmit = async (data: Data) => {
    try {
      setLoading(true);
      const fetched = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (fetched.ok) {
        const newPerson = { name: data.name, phone: data.phone };
        const local = JSON.parse(localStorage.getItem("people") || "[]");

        const updatedPeople = [...local, newPerson];
        localStorage.setItem("people", JSON.stringify(updatedPeople));

        // Optional: also update state if you're using it elsewhere
        setPeople(updatedPeople);
      }
      toast.success("Successfully submitted");
    } catch (error) {
      console.error(error);
      toast.error("An Error Occured");
    } finally {
      reset();
      setLoading(false);
    }
  };





  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-4 text-center bg-amber-500 font-bold rounded-3xl p-4">
        <h2>Evangelism Outreach Tracker</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="name" className="mb-3">
                Contact Name
              </Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="e.g. Bolaji Taylor"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="mb-3">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="e.g. johndoe@gmail.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="mb-3">
                Phone
              </Label>
              <Input
                type="text"
                id="phone"
                {...register("phone")}
                placeholder="e.g. 08100000000"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address" className="mb-3">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                // name='address'
                {...register("address")}
                placeholder="e.g. Sangotedo, Abijo GRA"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md flex justify-center items-center"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Submitting...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>
      <ShowContacts person={people} />
    </div>
  );
};

export default EvangelismTrackForm;
