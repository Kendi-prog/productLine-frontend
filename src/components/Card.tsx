import { ReactNode } from "react";

type CardProps = {
    children : ReactNode,
    className?: String
}

export default function Card({children, className=""}: CardProps) {
    return (
        <div
            className={`bg-white border border-[#28B5FB] rounded-xl shadow-md p-6 ${className}`}
        >
            {children}
        </div>
    )
}