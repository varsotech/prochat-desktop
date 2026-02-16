import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface OAuthContextProps {
  state: string;
  setState: (state: string) => void;
  homeserverAddress: string;
  setHomeserverAddress: (address: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const OAuthContext = createContext<OAuthContextProps | undefined>(undefined);

export interface OAuthProviderProps {
  children: ReactNode;
}

export const OAuthProvider: React.FC<OAuthProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState("");
  const [homeserverAddress, setHomeserverAddress] = useState("");
  const [token, setToken] = useState("");

  return (
    <OAuthContext.Provider
      value={{
        state,
        setState,
        homeserverAddress,
        setHomeserverAddress,
        token,
        setToken
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};

export const useOAuth = (): OAuthContextProps => {
  const context = useContext(OAuthContext);

  if (!context) {
    throw new Error("useOAuth must be used within a OAuthProvider");
  }

  return context;
};
