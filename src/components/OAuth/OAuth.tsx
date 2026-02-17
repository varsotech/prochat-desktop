import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import {useLocation} from "wouter";
import {TokenResponse} from "../../../../prochat-server/client/prochat/v1/oauth_pb";

export interface OAuthContextProps {
    state: string;
    setState: (state: string) => void;
    homeserverAddress: string;
    setHomeserverAddress: (address: string) => void;
    tokenResponse: TokenResponse;
    setTokenResponse: (resp: TokenResponse) => void;
    handleOauthLink: (url: string) => void;
    isLoggedIn: boolean;
}

const OAuthContext = createContext<OAuthContextProps | undefined>(undefined);

export interface OAuthProviderProps {
  children: ReactNode;
}

export const OAuthProvider: React.FC<OAuthProviderProps> = ({
  children,
}) => {
    const [state, setState] = useState("");
    const [homeserverAddress, setHomeserverAddressState] = useState(localStorage.getItem("ServerAddress"));

    const storeTokenResponse = localStorage.getItem("TokenResponse");
    const [tokenResponse, setTokenResponseState] = useState<TokenResponse | undefined>(storeTokenResponse == null ? undefined : JSON.parse(storeTokenResponse));

    const [, navigate] = useLocation();

    function handleOauthLink(message: string) {
        const splitMessage = message.split("://", 2);
        if (splitMessage.length != 2) {
            console.error("unexpected deep link", message);
            return;
        }

        let key = splitMessage[1];
        let params = "";

        const splitKey = key.split("?", 2);
        if (splitKey.length > 1) {
            key = splitKey[0];
            params = splitKey[1];
        }

        switch (key) {
            case "oauth": {
                console.log("navigating to oauth");
                navigate(`/oauth/${encodeURIComponent(params)}`);
                break;
            }
        }
    }

    function setHomeserverAddress(address: string) {
        localStorage.setItem("ServerAddress", address);
        setHomeserverAddressState(address);
    }

    function setTokenResponse(tokenResponse: TokenResponse) {
        console.log("setting token response in local storage", tokenResponse);
        localStorage.setItem("TokenResponse", JSON.stringify(tokenResponse));
        console.log("done setting token response in local storage");
        setTokenResponseState(tokenResponse);
    }

    const isLoggedIn = tokenResponse != null;

    return (
        <OAuthContext.Provider
            value={{
                state,
                setState,
                homeserverAddress,
                setHomeserverAddress,
                tokenResponse,
                setTokenResponse,
                handleOauthLink,
                isLoggedIn,
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
