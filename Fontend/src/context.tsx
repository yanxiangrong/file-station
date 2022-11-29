import React from "react";

interface ILoadingContext {
    setLoading: (v: boolean) => void
}

export const LoadingContext = React.createContext<ILoadingContext | null>(null)
