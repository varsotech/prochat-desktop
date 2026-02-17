import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useHomeserver} from "./HomeserverProvider";
import {
    GetIdentityTokenRequestSchema, GetIdentityTokenResponseSchema,
    Message_Type
} from "../../../../prochat-server/client/homeserver/v1/homeserver_pb";
import {create, fromBinary, toBinary} from "@bufbuild/protobuf";

type CommunityServerHttpContextValue = {
    isOpen: boolean;
};

const CommunityServerHttpContext = createContext<CommunityServerHttpContextValue | null>(null);

export function CommunityServerHttpProvider({ children }: { children: ReactNode }){
    const {request, isOpen} = useHomeserver();
    const [identityToken, setIdentityToken] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        if (identityToken !== "") return;

        const payload = toBinary(GetIdentityTokenRequestSchema, create(GetIdentityTokenRequestSchema, {}));

        return request(Message_Type.GET_IDENTITY_TOKEN, payload, (response) => {
            if (response.error?.message) {
                console.error(response.error.message);
                return;
            }
            const resp = fromBinary(GetIdentityTokenResponseSchema, response.payload);
            setIdentityToken(resp.token);
            console.log("get identity token response !", resp);
        });
    }, [isOpen, identityToken]);

    return (
        <CommunityServerHttpContext.Provider value={{ isOpen }}>
            {children}
        </CommunityServerHttpContext.Provider>
    );
}

export const useCommunityServerHttp = () => {
    const ctx = useContext(CommunityServerHttpContext);
    if (!ctx) throw new Error("useHomeserver must be used inside HomeserverProvider");
    return ctx;
};

