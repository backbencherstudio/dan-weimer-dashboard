"use client";


import { useEffect, useState } from "react";
import { GenericDataTable } from "@/components/reusable/DataTable";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { Plus } from "lucide-react";
import { Supplier, ModalState } from "@/types/supplier.types";
import { useSupplierColumns } from "./getSupplierColumns";
import CustomModal from "@/components/reusable/CustomModal";
import SupplierForm from "./SupplierForm";
import { ConfirmModal } from "@/components/reusable/ConfirmModal";









const mockSuppliers: Supplier[] = [
    { id: "1", name: "Sofa Express", address: "4267 Cherry Tree Drive, Jacksonville, FL 32216", location: "4267 Cherry Tree Drive", street: "4267 Cherry Tree Drive", city: "Jacksonville", zip: "32216", contactNo: "(303) 420-4261", contactPerson: "Daniel Hamilton", status: "Active", ordersFulfilled: 100 },
    { id: "2", name: "Mostow Co.", address: "2900 Ritter Street, Huntsville, AL 35802", location: "2900 Ritter Street", street: "2900 Ritter Street", city: "Huntsville", zip: "35802", contactNo: "(814) 413-9191", contactPerson: "Lorri Warf", status: "Active", ordersFulfilled: 100 },
    { id: "3", name: "Ezhe Source", address: "199 Oakway Lane, Woodland Hills, CA 91303", location: "199 Oakway Lane", street: "199 Oakway Lane", city: "Woodland Hills", zip: "91303", contactNo: "(503) 338-2573", contactPerson: "Kathy Pacheco", status: "Active", ordersFulfilled: 100 },
    { id: "4", name: "J. Brannam", address: "3522 West Fork Street, Missoula, MT 59801", location: "3522 West Fork Street", street: "3522 West Fork Street", city: "Missoula", zip: "59801", contactNo: "(818) 313-7673", contactPerson: "Dennis Callis", status: "Active", ordersFulfilled: 100 },
];


export default function SuppliersList() {
    const [data, setData] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    const [modal, setModal] = useState<ModalState>({
        type: null,
        supplier: null,

    })

    useEffect(() => {
        const fetchSuppliers = async () => {
            setIsLoading(true);
            await new Promise((res) => setTimeout(res, 700));


            setData(mockSuppliers);
            setIsLoading(false);
        };
        fetchSuppliers();
    }, []);


    const closeModal = () => setModal({ type: null, supplier: null });


    // add supplier
    const handleAdd = () => {
        setModal({ type: "create", supplier: null });
    };

    // table actions
    const handleView = (supplier: Supplier) => {
        setModal({ type: "view", supplier });
    };
    const handleEdit = (supplier: Supplier) => {
        setModal({ type: "edit", supplier });
    };
    const handleDelete = (supplier: Supplier) => {
        setModal({ type: "delete", supplier });
    };

    const handleDeleteConfirm = () => {
        if (!modal.supplier) return;

        alert("Delete Supplier");
        closeModal();
        // deleteSupplier(modal.supplier.id, {
        //     onSuccess: closeModal,
        // });
    };

    const columns = useSupplierColumns({ onView: handleView, onEdit: handleEdit, onDelete: handleDelete });

    // const { mutate: deleteSupplier, isPending: isDeleting } = useDeleteSupplier();


    return (
        <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Suppliers List</h2>
                <button onClick={handleAdd} className="flex items-center gap-2 bg-[#FF4D00] hover:bg-[#E64500] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md font-industry">
                    <Plus className="h-5 w-5" />
                    Add Supplier
                </button>
            </div>

            <div className="min-h-[400px]">
                <GenericDataTable columns={columns} data={data} isLoading={isLoading} />
            </div>

            {!isLoading && (
                <div className="mt-6 border-t pt-2">
                    <ReusablePagination totalPages={10} totalEntries={40} />
                </div>
            )}



            {/* modal */}

            {modal.type === "create" && (
                <CustomModal open={modal.type === "create"} onClose={closeModal} title="Add Supplier">
                    <SupplierForm mode="create" onSuccess={closeModal} />
                </CustomModal>
            )}

            {modal.type === "view" && (
                <CustomModal open={modal.type === "view"} onClose={closeModal} title="View Supplier">
                    <div>
                        <SupplierForm mode="view" supplier={modal.supplier} onSuccess={closeModal} />
                    </div>
                </CustomModal>
            )}

            {modal.type === "edit" && (
                <CustomModal open={modal.type === "edit"} onClose={closeModal} title="Edit Supplier">
                    <div>
                        <SupplierForm mode="edit" supplier={modal.supplier} onSuccess={closeModal} />
                    </div>
                </CustomModal>
            )}

            <ConfirmModal
                isOpen={modal.type === "delete"}
                onClose={closeModal}
                // isPending={isDeleting}
                title="Are you sure?"
                description={`Are you sure you want to delete "${modal.supplier?.name}"? This action cannot be undone.`}
                confirmLabel="Confirm"
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}