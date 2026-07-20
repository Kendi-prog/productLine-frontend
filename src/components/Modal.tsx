import { ReactNode } from "react";


type ModalProps = {
    isOpen: boolean;
    onClose : () => void;
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children } : ModalProps) {
    if(!isOpen) return null;

    return(
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-6">
            <div className="bg-white rounded-xl border border-[#28B5FB] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                {children}
            </div>
        </div>
    )
}