import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant ?: "primary" | "secondary" | "ghost";
}

export default function Button ({ variant = "primary", className, ...props }: Props) {
    const base = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
    const variants = {
        primary: "bg-[#4A90E2] text-white hover:bg-[#357BCF] !bg-[#4A90E2]",
        secondary: "bg-[#5B7798] text-white hover:bg-[#4C6A85]",
        ghost: "bg-transparent hover:bg-transparent text-[#1A2F43] p-0 border-none shadow-none",
    }
    return(
        <button
            {...props}
            className={clsx(base, variants[variant], className)}
        />
    )
}

