import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import Button from "./Button";
import { Icons } from "./Icons";

type SearchProps = {
    placeholder?: string;
}

export default function SearchBar({ placeholder= "Search ..."} : SearchProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const[isOpen, setIsOpen] = useState(false);
    const[search, setSearch] = useState(searchParams.get("q") || "");
    const inputRef = useRef<HTMLInputElement>(null);

    //focusing the input when opened
    useEffect(() => {
        if(isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    //updating the url when the input changes
    useEffect(() => {
        if(search) {
            setSearchParams({ q : search });
        } else {
            searchParams.delete("q");
            setSearchParams(searchParams);
        }
    }, [search]);

    return(
        <div className="flex items-center gap-2 relative">
            {!isOpen ? (
                <Button 
                    onClick={() => setIsOpen(true)}
                    title="Search"
                >
                    <Icons.search />
                </Button>
            ) : (
                <>
                    <input 
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="transition-all duration-300 border border-[#28B5FB] rounded- px-4 py-1 text-sm w-48 h-10"
                    />
                    <Button 
                        onClick={() => {
                            setIsOpen(false);
                            setSearch("");
                        }}
                        title="CLose search">
                        <Icons.close />
                    </Button>
                </>
            )}
        </div>
    );

    
}