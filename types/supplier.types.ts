// types/supplier.types.ts
export type Supplier = {
  status?: "ACTIVE" | "INACTIVE";
  id: string;
  name: string;
  contact_no: string;
  contact_persion: string;
  location: string;
  street: string;
  city: string;
  zip?: string;
  zip_code?: string;
  orders_fulfilled?: number;
  created_at?: string;
  updated_at?: string;
};

export type SupplierTableRow = {
  id: string;
  name: string;
  address: string;
  location: string;
  street: string;
  city: string;
  zip: string;
  contactNo: string;
  contactPerson: string;
  status: "Active" | "Inactive";
  ordersFulfilled: number;
};

export type ModalState = {
  type: "view" | "edit" | "delete" | "create" | null;
  supplier: SupplierTableRow | null;
};