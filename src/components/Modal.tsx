import { ReactNode } from "react";
import Button from "./Button";
import { Icons } from "./Icons";

type ModalProps = {
    isOpen: boolean;
    onClose : () => void;
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children } : ModalProps) {
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100">
            <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
                <Button 
                    onClick={onClose}
                    className="absolute top-3 right-3"
                >
                   <Icons.close className="w-20 h-20" />
                </Button>
                {children}
            </div>
        </div>
    )
}