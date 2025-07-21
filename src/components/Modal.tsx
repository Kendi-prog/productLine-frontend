import { ReactNode } from "react";
import Button from "./Button";

type ModalProps = {
    isOpen: boolean;
    onClose : () => void;
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children } : ModalProps) {
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg relative">
                <Button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </Button>
                {children}
            </div>
        </div>
    )
}