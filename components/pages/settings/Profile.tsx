"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reusable/CustomButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUpdateProfile } from "@/hooks/useSettings";
import { useAuth } from "@/hooks/use-auth";

const profileSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  profile_image: z.any().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const personalInfoFields: { name: keyof ProfileValues; label: string; placeholder: string; colSpan?: string }[] = [
  { name: "name", label: "Company Name", placeholder: "Enter company name" },
  { name: "phone_number", label: "Phone Number", placeholder: "(000) 000-0000" },
];

const addressFields: { name: keyof ProfileValues; label: string; placeholder: string }[] = [
  { name: "address", label: "Location", placeholder: "Enter location" },
  { name: "street", label: "Street", placeholder: "Enter street name" },
  { name: "city", label: "City", placeholder: "Enter city" },
  { name: "zip_code", label: "Zip", placeholder: "Enter zip code" },
];

export default function ProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user: authUser } = useAuth();
  console.log("Auth User:", authUser);


  const methods = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: authUser?.name || "",
      phone_number: authUser?.phone_number || "",
      address: authUser?.location || "",
      street: authUser?.street || "N/A",
      city: authUser?.city || "",
      zip_code: authUser?.zip_code || "",
      profile_image: authUser?.avatar || null,
    },
  });


  useEffect(() => {
    if (authUser) {
      methods.reset({
        name: authUser?.name || "",
        phone_number: authUser?.phone_number || "",
        address: authUser?.location || "",
        street: authUser?.street || "N/A",
        city: authUser?.city || "",
        zip_code: authUser?.zip_code || "",
        profile_image: authUser?.avatar || null,
      });
    }
  }, [authUser, methods]);
  

  const { isDirty } = methods.formState;
  const { mutate: updateProfile } = useUpdateProfile();

  const onSubmit = async (data: ProfileValues) => {
    if (!isDirty) {
      console.log("No changes to save");
      return;
    }

    console.log("Profile Updated:", data);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone_number", data.phone_number);
    formData.append("address", data.address);
    formData.append("street", data.street);
    formData.append("city", data.city);
    formData.append("zip_code", data.zip_code);
    
    if (data.profile_image instanceof File) {
      formData.append("profile_image", data.profile_image);
    }

    await updateProfile({
      name: data.name,
      phone_number: data.phone_number,
      address: data.address,
      street: data.street,
      city: data.city,
      zip_code: data.zip_code,
      image: data.profile_image,
    });  
    
    // Reset dirty state after successful save
    methods.reset(data);
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
        methods.setValue("profile_image", file, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    methods.setValue("profile_image", undefined, { shouldDirty: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const name = methods.watch("name");
  const phone_number = methods.watch("phone_number");
  const address = methods.watch("address");
  const street = methods.watch("street");
  const city = methods.watch("city");
  const zip_code = methods.watch("zip_code");

  return (
    <div className="mx-auto bg-white p-6 rounded-[20px] border border-[#E9E9EA]">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-8 font-industry">Profile</h1>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
            <AvatarImage src={imagePreview || "/path-to-user-img.jpg"} alt="Profile" />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-2xl font-bold">
              {getInitials(name)}
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
          <h2 className="text-xl font-bold text-[#1E293B]">{name}</h2>
          <p className="text-sm text-slate-500">{phone_number}</p>
          <p className="text-sm text-slate-500">{address}, {street}, {city}, {zip_code}</p>
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
                  containerClassName={field?.colSpan}
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