import { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

type BaseLayoutProps = {
    title: string;
    subtitle?: string;
    className ?: string;
    // onAddClick: () => void;
    children: ReactNode;
}

const BaseLayout = ({
    title,
    subtitle,
    // onAddClick,
    children
}: BaseLayoutProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <PageHeader title={title} subtitle={subtitle}/>
                <div className="flex items-center gap-2">
                    <SearchBar placeholder={`Search ${title}...`}/>
                    <Button>{`Add ${title}`}</Button>
                </div>
            </div>
            <div>{children}</div>    
        </div>
    )
}

export default BaseLayout;