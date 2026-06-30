import {
    createContext,
    useContext,
    useState,
} from "react";

interface SearchContextType {
    query: string;
    setQuery: (value: string) => void;
}

const SearchContext =
    createContext<SearchContextType>({
        query: "",
        setQuery: () => {},
    });

export function SearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [query, setQuery] = useState("");

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}