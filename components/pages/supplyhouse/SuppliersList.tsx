"use client";

import { useState } from "react";
import { GenericDataTable } from "@/components/reusable/DataTable";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { Plus } from "lucide-react";
import { ModalState, Supplier, SupplierTableRow } from "@/types/supplier.types";
import { useSupplierColumns } from "./getSupplierColumns";
import CustomModal from "@/components/reusable/CustomModal";
import SupplierForm from "./SupplierForm";
import { ConfirmModal } from "@/components/reusable/ConfirmModal";
import {
    useSupplyHouses,
    useDeleteSupplier,
} from "@/hooks/useSupplyHouse";

// {
//     "id": "cmnmxnrqt000gl077a9mnpz4t",
//     "name": "ABC Auto Parts Supplier",
//     "contact_no": "+8801712345678",
//     "contact_persion": "Md. Rahim Uddin",
//     "location": "Uttara, Dhaka",
//     "street": "House 12, Road 7",
//     "city": "Dhaka",
//     "zip_code": "1230",
//     "orders_fulfilled": 0,
//     "status": "ACTIVE",
//     "created_at": "2026-04-06T08:33:16.085Z",
//     "updated_at": "2026-04-06T08:33:16.085Z"
// }
const mapSuppliersToTableData = (suppliers: Supplier[] = []): SupplierTableRow[] => {
    return suppliers.map((supplier, index) => ({
        id: supplier.id || String(index + 1),
        name: supplier.name || "N/A",
        address:
            // supplier.supplierAddress ||
            // [supplier.street, supplier.city, supplier.zip].filter(Boolean).join(", "),
            supplier.street + ", " + supplier.location,
        location: supplier.location || "N/A",
        street: supplier.street || "N/A",
        city: supplier.city || "N/A",
        zip: supplier.zip_code || "N/A",
        contactNo: supplier.contact_no || "N/A",
        contactPerson: supplier.contact_persion || "N/A",
        status: supplier.status === "ACTIVE" ? "Active" : "Inactive",
        ordersFulfilled: supplier.orders_fulfilled ?? 0,
    }));
};

export default function SuppliersList() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const [modal, setModal] = useState<ModalState>({
        type: null,
        supplier: null,
    });

    const { data, isLoading } = useSupplyHouses(page, limit);
    const { mutate: deleteSupplier, isPending: isDeleting } = useDeleteSupplier();

    const suppliers = data?.data || [];
    const tableData = mapSuppliersToTableData(suppliers);

    const closeModal = () => setModal({ type: null, supplier: null });

    const handleAdd = () => {
        setModal({ type: "create", supplier: null });
    };

    const handleView = (supplier: SupplierTableRow) => {
        setModal({ type: "view", supplier });
    };

    const handleEdit = (supplier: SupplierTableRow) => {
        setModal({ type: "edit", supplier });
    };

    const handleDelete = (supplier: SupplierTableRow) => {
        setModal({ type: "delete", supplier });
    };

    const handleDeleteConfirm = () => {
        if (!modal.supplier?.id) return;

        console.log("modal.supplier.id", modal.supplier.id);
        console.log(modal.supplier.id);
        deleteSupplier(modal.supplier.id, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const columns = useSupplierColumns({
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Suppliers List</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-[#FF4D00] hover:bg-[#E64500] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md font-industry"
                >
                    <Plus className="h-5 w-5" />
                    Add Supplier
                </button>
            </div>

            <div className="min-h-[400px]">
                <GenericDataTable columns={columns} data={tableData} isLoading={isLoading} />
            </div>

            {!isLoading && (
                <div className="mt-6 border-t pt-2">
                    <ReusablePagination
                        totalPages={data?.meta?.totalPages || 1}
                        totalEntries={data?.meta?.total || tableData.length}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </div>
            )}

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
                isPending={isDeleting}
                title="Are you sure?"
                description={`Are you sure you want to delete "${modal.supplier?.name}"? This action cannot be undone.`}
                confirmLabel="Confirm"
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}