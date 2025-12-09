import React, { useState, useContext } from "react";
import Popup from "./Popup";
import { useAppContext } from "./contextTemplate";
import { db } from "@/app/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface AddOrderPopupProps {
    isOpen: boolean;
    onClose: () => void;
    reLoad: () => void;
}

export default function AddOrderPopup({ isOpen, onClose, reLoad }: AddOrderPopupProps) {
    const { user } = useAppContext();

    const [clientName, setClientName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.TenantId) {
            alert("Tenant ID missing — check context.");
            return;
        }

        await addDoc(collection(db, "Orders"), {
            TenantId: user?.TenantId,
            CustomerName: clientName,
            OrderStatus: "pending",
            createdAt: serverTimestamp(),
        });

        // Reset & close
        setClientName("");
        reLoad();
        onClose();
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Add New Order</h2>

            <div className="">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="border p-2 rounded-lg"
                        required
                    />


                    <button
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                        Submit
                    </button>
                </form>
            </div>
        </Popup>
    );
}