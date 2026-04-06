"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import CustomButton from "@/components/reusable/CustomButton";
import { Button } from "@/components/ui/button";
import { SupplierTableRow, Supplier } from "@/types/supplier.types";
import {
  useCreateSupplier,
  useUpdateSupplier,
} from "@/hooks/useSupplyHouse";

// ── Schema ──────────────────────────────────────────────
const supplierSchema = z.object({
  name: z
    .string()
    .min(1, "Supplier name is required")
    .max(50, "Must be less than 50 characters"),
  contactNo: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?[0-9\s\-()]{7,15}$/, "Invalid contact number"),
  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .max(50, "Must be less than 50 characters"),
  location: z.string().min(1, "Location is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d{4,10}$/, "Invalid zip code"),
});

type FormValues = z.infer<typeof supplierSchema>;

type FormMode = "create" | "view" | "edit";

interface SupplierFormProps {
  mode?: FormMode;
  supplier?: SupplierTableRow | null;
  onSuccess?: () => void;
}

export default function SupplierForm({
  mode = "create",
  supplier,
  onSuccess,
}: SupplierFormProps) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
  const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier();

  const isPending = isCreating || isUpdating;

  const methods = useForm<FormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: supplier?.name ?? "",
      contactNo: supplier?.contactNo ?? "",
      contactPerson: supplier?.contactPerson ?? "",
      location: supplier?.location ?? "",
      street: supplier?.street ?? "",
      city: supplier?.city ?? "",
      zip: supplier?.zip ?? "",
    },
  });

  const {
    formState: { isDirty },
  } = methods;

  const handleSubmit = (data: FormValues) => {
    const payload: Supplier = {
      id: supplier?.id ?? "",
      name: data.name,
      contact_no: data.contactNo,
      contact_persion: data.contactPerson,
      location: data.location,
      street: data.street,
      city: data.city,
      zip_code: data.zip,
    };

    if (isEdit && supplier?.id) {
      updateSupplier(
        { id: supplier.id, supplier: payload },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createSupplier(payload, {
        onSuccess: () => {
          methods.reset();
          onSuccess?.();
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8 border border-[#E9E9EA] p-5 rounded-[20px] border-solid"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            name="name"
            label="Supplier Name"
            placeholder="Enter your company name"
            readOnly={isView}
          />
          <FormInput
            name="contactNo"
            label="Contact No."
            placeholder="Enter your contact no."
            readOnly={isView}
          />
          <FormInput
            name="contactPerson"
            label="Contact Person Name"
            placeholder="Enter person name"
            readOnly={isView}
          />
        </div>

        <div className="md:space-y-6 space-y-4">
          <h3 className="text-[18px] font-bold text-[#1E293B]">
            Supplier Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name="location"
              label="Location"
              placeholder="Enter your location"
              readOnly={isView}
            />
            <FormInput
              name="street"
              label="Street"
              placeholder="Enter your street"
              readOnly={isView}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name="city"
              label="City"
              placeholder="Enter your city"
              readOnly={isView}
            />
            <FormInput
              name="zip"
              label="Zip"
              placeholder="Enter your zip code"
              readOnly={isView}
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={onSuccess}
            className="h-[54px] min-w-[160px] rounded-xl border-none bg-[#F2F4F7] text-[#475467] font-bold text-lg hover:bg-slate-200"
          >
            Cancel
          </Button>

          {!isView && (
            <CustomButton
              type="submit"
              disabled={isPending || (!isEdit && !isDirty)}
              className="h-[54px] min-w-[160px] rounded-xl bg-[#FF4D00] text-white font-bold text-lg shadow-none"
            >
              {isPending ? "Saving..." : isEdit ? "Update" : "Save"}
            </CustomButton>
          )}
        </div>
      </form>
    </FormProvider>
  );
}