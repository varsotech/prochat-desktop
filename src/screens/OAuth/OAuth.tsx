import React, {useEffect, ReactElement, useRef} from 'react';
import {useTheme} from "../../components/Theme/Theme";
import {useOAuth} from '../../components/OAuth/OAuth';
import {useLocation} from "wouter";
import {TokenResponse} from "../../../../prochat-server/client/prochat/v1/oauth_pb";

type OAuthProps = {
    params: string;
};

function OAuth({ params }: OAuthProps): ReactElement {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    const {state: oauthState, homeserverAddress, tokenResponse, setTokenResponse} = useOAuth();
    const didSendTokenReq = useRef(false);

    useEffect(() => {
        if (tokenResponse != null) {
            navigate("/");
            return;
        }

        if (didSendTokenReq.current) { return; }
        didSendTokenReq.current = true;

        const queryParams = new URLSearchParams(decodeURIComponent(params));

        // Validate state
        const receivedState = queryParams.get("state");
        if (receivedState != oauthState) {
            console.error("unexpected oauth state, receivedState:", receivedState, "wanted state:", oauthState);
            navigate("/login");
            return;
        }

        const code = queryParams.get("code");
        if (code == "") {
            console.error("unexpected empty code");
            navigate("/login");
            return;
        }

            const url = new URL(`/api/v1/oauth/token?grant_type=authorization_code&code=${code}&client_id=https%3A%2F%2Fwww.varso.org%2F.well-known%2Fclient-metadata.json`, homeserverAddress);
        console.log("requesting token from url", url.toString());
        fetch(url.toString())
            .then((response) => response.json())
            .then((data: TokenResponse) => {
                setTokenResponse(data);
                navigate("/");
            })
            .catch((err) => {
                console.error(err.message);
                navigate("/login");
            });
    }, []);

    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.s }}>
                OAuth {params}
            </div>
        </div>
    );
}

export default OAuth;