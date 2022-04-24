import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getGenres } from "service";

const CtxSearch = createContext({});

export const SearchStore = (props) => {
    const [data, setData] = useState({});
    const genersAll = useQuery("geners", getGenres)
    const [loadFeach, setLoadFeach] = useState(false);
    const [errorFeach, setErrorFeach] = useState(false);

    useEffect(() => { }, []);

    return (
        <CtxSearch.Provider
            value={{
                data,
                genersAll
            }}
        >
            {props.children}
        </CtxSearch.Provider>
    );
};

export const useSearchStore = () => useContext(CtxSearch)
