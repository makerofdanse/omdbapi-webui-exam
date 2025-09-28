import { createContext, useContext, useState } from "react";
import type { PropsWithChildren, FC } from "react";

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    return <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SearchContext.Provider>;
};

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
