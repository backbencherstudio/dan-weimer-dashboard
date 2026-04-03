"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reusable/CustomButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, X } from "lucide-react";
import { useState, useRef } from "react";

const profileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "Zip code is required"),
  profileImage: z.any().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const personalInfoFields: { name: string; label: string; placeholder: string; colSpan?: string }[] = [
  { name: "companyName", label: "Company Name", placeholder: "Enter company name", colSpan: "md:col-span-2" },
  { name: "phoneNumber", label: "Phone Number", placeholder: "(000) 000-0000" },
  { name: "email", label: "Email Address", placeholder: "name@example.com" },
];

const addressFields: { name: string; label: string; placeholder: string }[] = [
  { name: "location", label: "Location", placeholder: "Enter location" },
  { name: "street", label: "Street", placeholder: "Enter street name" },
  { name: "city", label: "City", placeholder: "Enter city" },
  { name: "zip", label: "Zip", placeholder: "Enter zip code" },
] as const;

export default function ProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "B. Cooper",
      phoneNumber: "(207) 555-0119",
      email: "B.Cooper@example.com",
      location: "Dhanmondi",
      street: "New Market Road",
      city: "Dhaka",
      zip: "1280",
      profileImage: undefined,
    },
  });

  const { isDirty } = methods.formState;

  const onSubmit = (data: ProfileValues) => {
    if (!isDirty) {
      console.log("No changes to save");
      return;
    }
    
    console.log("Profile Updated:", data);
    // Here you would typically upload the image file and other data to your backend
    
    // Reset dirty state after successful save
    methods.reset(data);
    setImagePreview(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error("Please upload an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error("File size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        methods.setValue("profileImage", file, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    methods.setValue("profileImage", undefined, { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const companyName = methods.watch("companyName");

  return (
    <div className="mx-auto bg-white p-6 rounded-[20px] border border-[#E9E9EA]">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-8 font-industry">Profile</h1>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
            <AvatarImage src={imagePreview || "/path-to-user-img.jpg"} alt="Profile" />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-2xl font-bold">
              {getInitials(companyName)}
            </AvatarFallback>
          </Avatar>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          
          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-[#FF4D00] rounded-full border-2 border-white text-white hover:bg-[#E04400] transition-colors"
            aria-label="Change profile picture"
          >
            <Pencil size={14} />
          </button>
          
          {/* Remove image button (only shows when image is uploaded) */}
          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full border-2 border-white text-white hover:bg-red-600 transition-colors"
              aria-label="Remove profile picture"
            >
              <X size={12} />
            </button>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">{companyName}</h2>
          <p className="text-sm text-slate-500">Admin</p>
          {imagePreview && (
            <p className="text-xs text-green-600 mt-1">New image selected</p>
          )}
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-10">
          {/* Personal Information Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-[#1E293B] border-b pb-2">Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalInfoFields.map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  containerClassName={field?.colSpan as string}
                />
              ))}
            </div>
          </section>

          {/* Company Address Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-[#1E293B] border-b pb-2">Company Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addressFields.map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            {isDirty && (
              <CustomButton
                type="button"
                onClick={() => {
                  methods.reset();
                  setImagePreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="h-[54px] min-w-[120px] bg-gray-100 text-gray-700 font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </CustomButton>
            )}
            <CustomButton
              type="submit"
              disabled={!isDirty}
              className={`h-[54px] min-w-[180px] font-bold text-lg rounded-xl transition-colors ${
                isDirty 
                  ? "bg-[#FF4D00] text-white hover:bg-[#E04400]" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Changes
            </CustomButton>
          </div>

          {/* Dirty state indicator */}
          {isDirty && (
            <p className="text-sm text-amber-600 text-right">
              You have unsaved changes
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
}