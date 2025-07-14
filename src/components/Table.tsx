import clsx from "clsx";
import { Icons } from "./Icons";
import Button from "./Button";

type Column<T> = {
    label: string;
    accessor: keyof T;
}

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    className?: string;
}

export default function Table<T>({columns, data, className}: TableProps<T>) {
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
                    {data.map((row, i) => (
                        <tr
                            key={i}
                            className="bg-white hover:bg-blue-50"
                        >
                            {columns.map((col) => (
                                <td
                                key={col.label as string}
                                className="border border-[#28B5FB] px-4 py-2 text-[#1A2F43]"
                                >
                                {String(row[col.accessor])}
                                </td>
                            ))}
                                   {/* Action buttons column */}
                            <td className="border border-[#28B5FB] px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <Button variant="icon" title="View">
                                    <Icons.view />
                                    </Button>
                                    <Button variant="icon" title="Edit">
                                    <Icons.edit />
                                    </Button>
                                    <Button variant="icon" title="Delete">
                                    <Icons.delete />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}