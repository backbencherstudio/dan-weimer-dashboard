"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reusable/CustomButton";

// Schema matching the three fields in the image
const deliveryFeeSchema = z.object({
  baseFee: z.string().min(1, "Base fee is required"),
  weightRate: z.string().min(1, "Weight rate is required"),
  mileRate: z.string().min(1, "Mile rate is required"),
});

type DeliveryFeeValues = z.infer<typeof deliveryFeeSchema>;

export default function DeliveryFeeConfig() {
  const methods = useForm<DeliveryFeeValues>({
    resolver: zodResolver(deliveryFeeSchema),
    defaultValues: {
      baseFee: "14.99",
      weightRate: "10.99",
      mileRate: "1.5",
    },
  });

  const { isDirty } = methods.formState;

  const onSubmit = (data: DeliveryFeeValues) => {
    console.log("Configuration Saved:", data);
    methods.reset(data);
  };

  return (
    <div className="container mx-auto bg-white p-8 rounded-[20px] border border-[#E9E9EA] ">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-8 font-industry">
        Delivery Fee Configuration
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Base Delivery Fee - Full width in its row via col-span */}
            <div className="md:col-span-2">
              <FormInput
                name="baseFee"
                label="Base Delivery Fee ($)"
                placeholder="0.00"
                containerClassName="w-full"
              />
            </div>

            {/* Per 5kg Weight Rate */}
            <FormInput
              name="weightRate"
              label="Per 5 kg Weight Rate ($)"
              placeholder="0.00"
            />

            {/* Per Mile Rate */}
            <FormInput
              name="mileRate"
              label="Per Mile Rate ($)"
              placeholder="0.00"
            />
          </div>

          {/* Action Button - Aligned to the right as per image */}
          <div className="flex justify-end pt-4">
            <CustomButton
              type="submit"
              className={`h-[54px] min-w-[160px] font-bold text-lg rounded-xl transition-all ${
                isDirty
                  ? "bg-[#FF4D00] text-white hover:bg-[#E04400]"
                  : "bg-[#FF4D00] opacity-90 text-white cursor-pointer" 
              }`}
            >
              Save
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}