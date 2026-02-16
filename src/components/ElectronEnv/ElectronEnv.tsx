import React, {
    createContext,
    useContext,
    useState,
    ReactNode, useEffect,
} from "react";

export interface ElectronEnv {
    isDev: boolean;
}

export interface ElectronEnvContextProps {
    env: ElectronEnv;
    setEnv: (state: ElectronEnv) => void;
}

const ElectronEnvContext = createContext<ElectronEnvContextProps | undefined>(undefined);

export interface ElectronEnvProviderProps {
    children: ReactNode;
}

export const ElectronEnvProvider: React.FC<ElectronEnvProviderProps> = ({
                                                                children,
                                                            }) => {
    const [env, setEnv] = useState<ElectronEnv>({
        isDev: false,
    });

    useEffect(() => {
        window.electronAPI.envReply((event: Electron.IpcRendererEvent, message: string) => {
            const env = JSON.parse(message);
            setEnv(env as ElectronEnv);
        });
        window.electronAPI.envRequest();
    }, []);


    return (
        <ElectronEnvContext.Provider
            value={{
                env,
                setEnv,
            }}
        >
            {children}
        </ElectronEnvContext.Provider>
    );
};

export const useElectronEnv = (): [ElectronEnv, (state: ElectronEnv) => void] => {
    const context = useContext(ElectronEnvContext);

    if (!context) {
        throw new Error("useElectronEnv must be used within a ElectronEnvProvider");
    }

    return [context.env, context.setEnv];
};
