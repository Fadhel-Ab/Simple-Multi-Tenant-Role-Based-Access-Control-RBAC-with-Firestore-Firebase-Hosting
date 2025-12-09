import React from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">


                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl">
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}
