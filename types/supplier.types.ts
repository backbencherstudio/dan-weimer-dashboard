type Supplier = {
    status?: "Active" | "Inactive";
    id: string;
    name: string;
    contactNo: string;
    contactPerson: string;
    location: string;
    street: string;
    city: string;
    zip: string;
    ordersFulfilled?: number;
    address?: string;
    supplierAddress?: string;
  };
// modal state type — clean and explicit
type ModalState = {
    type: "view" | "edit" | "delete" | "create" | null;
    supplier: Supplier | null;
  };
export type { Supplier, ModalState };