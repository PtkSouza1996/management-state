import {createContext, useState, useContext} from 'react';
import { LoadingOverlay } from '../Components/Loading';

interface LoadingContextProps{
    state: boolean;
    setLoadingState: (newState: boolean) => void;
}

const LoadingContext = createContext({} as LoadingContextProps);

interface LoadingProps {
    children: React.ReactNode;
}

export function LoadingProvider({children}: LoadingProps){
    const [loading, setLoading] = useState(false);

    const setLoadingState = (newState: boolean) => {
        setLoading(newState)
    };

    return (
        <LoadingContext.Provider value={{state: loading, setLoadingState }}>
            {loading && <LoadingOverlay /> }
            {children}
        </LoadingContext.Provider>
    )
}
export function useLoading(){
    return useContext(LoadingContext);
}