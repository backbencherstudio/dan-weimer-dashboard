import { useState } from "react";
// import { Supplier } from "@/types/supplier.types";
type Supplier = {
    id: string;
    name: string;
    address: string;
    contactNo: string;
    contactPerson: string;
    ordersFulfilled: number;
    status: "Active" | "Inactive";
  };

// modal state type — clean and explicit
type ModalState = {
  type: "view" | "edit" | "delete" | "add" | null;
  supplier: Supplier | null;
};

export const useSupplierModal = (
  setData: React.Dispatch<React.SetStateAction<Supplier[]>>
) => {
  const [modal, setModal] = useState<ModalState>({
    type: null,
    supplier: null,
  });

  const closeModal = () => setModal({ type: null, supplier: null });

  const handleAdd = () => setModal({ type: "add", supplier: null });
  const handleView = (supplier: Supplier) => setModal({ type: "view", supplier });
  const handleEdit = (supplier: Supplier) => setModal({ type: "edit", supplier });
  const handleDelete = (supplier: Supplier) => setModal({ type: "delete", supplier });

  const handleAddSuccess = (newSupplier: Supplier) => {
    setData((prev) => [newSupplier, ...prev]);
    closeModal();
  };

  const handleEditSuccess = (updated: Supplier) => {
    setData((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    closeModal();
  };

  const handleDeleteSuccess = (id: string) => {
    setData((prev) => prev.filter((s) => s.id !== id));
    closeModal();
  };

  return {
    modal,
    closeModal,
    handleAdd,
    handleView,
    handleEdit,
    handleDelete,
    handleAddSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  };
};