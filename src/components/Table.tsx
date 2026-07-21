import clsx from "clsx";
import { useState } from "react";

import { Icons } from "./Icons";
import Button from "./Button";

type Column<T> = {
    label: string;
    accessor: string;
    type?: "date" | "money";
}

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    className?: string;
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
}

export default function Table<T>({
    columns, 
    data, 
    className, 
    onView, 
    onEdit, 
    onDelete
}: TableProps<T>) {
    const getValue = (obj: any, path: string) => {
        return path.split(".").reduce((value, key) => value?.[key], obj);
    };

    const formatValue = (value: any, type?: "date" | "money") => {

        if (type === "date" && Array.isArray(value)) {
            const [year, month, day] = value;

            return new Date(year, month - 1, day).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }

        if (type === "money" && typeof value === "number") {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(value);
        }

        return value;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    return(
        <div className={clsx("w-full overflow-x-auto", className)}>
            <table className="min-w-full border border-[#28B5FB] border-collapse">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.label as string}
                                className="border border-[#28B5FB] px-4 py-2 font-bold text-xl text-[#1A2F43]"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="border border-[#28B5FB] px-4 py-2 font-semibold text-[#1A2F43]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, i) => (
                        <tr
                            key={i}
                            className="bg-white hover:bg-blue-50"
                        >
                            {columns.map((col) => (
                                <td
                                key={col.label as string}
                                className="border border-[#28B5FB] px-4 py-2 text-[#1A2F43]"
                                >
                                {String(formatValue(getValue(row, col.accessor), col.type))}
                               
                                </td>
                            ))}
                                   {/* Action buttons column */}
                            <td className="border border-[#28B5FB] px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="icon" 
                                        title="View"
                                        onClick={() => onView?.(row)}>
                                    <Icons.view />
                                    </Button>
                                    <Button 
                                        variant="icon" 
                                        title="Edit"
                                        onClick={() => onEdit?.(row)}>
                                    <Icons.edit />
                                    </Button>
                                    <Button 
                                        variant="icon" 
                                        title="Delete"
                                        onClick={() => onDelete?.(row)}>
                                    <Icons.delete />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                <span className="text-[#1A2F43] font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <Button
                    onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}