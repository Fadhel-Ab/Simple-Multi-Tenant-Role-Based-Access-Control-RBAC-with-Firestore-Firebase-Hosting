"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import type { User,AppContextType } from "../../types";


const AppContext=createContext<AppContextType | undefined>(undefined);

export const useAppContext =()=> {
    const context=useContext(AppContext);
    if(!context) throw new Error("useAppContext must be used inside Wrapper");
    return context;
}

export function Wrapper({children}: {children:ReactNode}){
    const [user, setUser]=useState<User | null>(null);
    return(
        <AppContext.Provider value={{user, setUser}}>
                    {children}
        </AppContext.Provider>
    );

}
