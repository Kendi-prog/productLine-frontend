import { ReactNode } from "react";

type CardProps = {
    children : ReactNode;
    className?: string;
}

export default function Card({children, className=""}: CardProps) {
    return (
        <div
            className={`bg-white border border-[#28B5FB] rounded-xl shadow-lg p-6 ${className}`}
        >
            {children}
        </div>
    )
}