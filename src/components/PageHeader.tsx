import { ReactNode } from "react";

type PageHeaderProps = {
    title : string;
    subtitle?: string;
    action?: ReactNode;
}

export default function PageHeader({title, subtitle, action}: PageHeaderProps) {
    return(
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2F43]">{title}</h1>
        {subtitle && <p className="text-gray-600 text-xl pt-4">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
    )
}