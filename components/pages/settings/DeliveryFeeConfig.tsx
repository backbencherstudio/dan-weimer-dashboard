"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reusable/CustomButton";
import { useDeliveryFee, useSetDeliveryFee } from "@/hooks/useSettings";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // or your toast library

// Schema matching the three fields in the image
const deliveryFeeSchema = z.object({
  baseFee: z.string().min(1, "Base fee is required"),
  weightRate: z.string().min(1, "Weight rate is required"),
  mileRate: z.string().min(1, "Mile rate is required"),
});

type DeliveryFeeValues = z.infer<typeof deliveryFeeSchema>;

export default function DeliveryFeeConfig() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: deliveryFee, isLoading, refetch } = useDeliveryFee();
  const { mutate: setDeliveryFee, isPending: isMutating } = useSetDeliveryFee();

  const methods = useForm<DeliveryFeeValues>({
    resolver: zodResolver(deliveryFeeSchema),
    defaultValues: {
      baseFee: "",
      weightRate: "",
      mileRate: "",
    },
    mode: "onChange", // This enables isDirty tracking
  });

  const { isDirty, isValid, isSubmitting: isFormSubmitting } = methods.formState;

  // Reset form when data loads
  useEffect(() => {
    if (deliveryFee) {
      methods.reset({
        baseFee: deliveryFee.base_delivery_fee?.toString() || "0",
        weightRate: deliveryFee.per_kg_weight_rate?.toString() || "0",
        mileRate: deliveryFee.per_km_rate?.toString() || "0",
      });
    }
  }, [deliveryFee, methods]);

  // Track changes to enable/disable save button
  // useEffect(() => {
  //   // Subscribe to form changes to update isDirty in real-time
  //   const subscription = methods.watch(() => {
  //     // This triggers form state updates
  //   });
  //   return () => subscription.unsubscribe();
  // }, [methods]);

  const onSubmit = (data: DeliveryFeeValues) => {
    if (!isDirty) {
      toast.error("No changes to save");
      return;
    }

    setIsSubmitting(true);
    
    setDeliveryFee(
      {
        base_delivery_fee: parseFloat(data.baseFee),
        per_kg_weight_rate: parseFloat(data.weightRate),
        per_km_rate: parseFloat(data.mileRate),
      },
      {
        onSuccess: () => {
          methods.reset(data); // Reset form with new values, making isDirty false
          refetch(); // Refetch to update the cache
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.error("Failed to update:", error);
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleCancel = () => {
    methods.reset(); // Reset to original values
    toast.error("Changes discarded");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto bg-white p-8 rounded-[20px] border border-[#E9E9EA]">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-8 font-industry">
          Delivery Fee Configuration
        </h1>
        <div className="space-y-6">
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-[20px] border border-[#E9E9EA]">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-8 font-industry">
        Delivery Fee Configuration
      </h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Base Delivery Fee - Full width */}
            <div className="md:col-span-2">
              <FormInput
                name="baseFee"
                label="Base Delivery Fee ($)"
                placeholder="0.00"
                containerClassName="w-full"
              />
            </div>

            {/* Per kg Weight Rate */}
            <FormInput
              name="weightRate"
              label="Per kg Weight Rate ($)"
              placeholder="0.00"
            />

            {/* Per km Rate */}
            <FormInput
              name="mileRate"
              label="Per km Rate ($)"
              placeholder="0.00"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            {isDirty && (
              <CustomButton
                type="button"
                onClick={handleCancel}
                className="h-[54px] min-w-[120px] font-bold text-lg rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </CustomButton>
            )}
            <CustomButton
              type="submit"
              disabled={!isDirty || isSubmitting || isMutating || !isValid}
              className={`h-[54px] min-w-[160px] font-bold text-lg rounded-xl transition-all ${
                isDirty && isValid && !isSubmitting && !isMutating
                  ? "bg-[#FF4D00] text-white hover:bg-[#E04400] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting || isMutating ? "Saving..." : "Save Changes"}
            </CustomButton>
          </div>

          {/* Optional: Show unsaved changes indicator */}
          {isDirty && (
            <div className="text-sm text-amber-600 mt-2 text-right">
              You have unsaved changes
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}