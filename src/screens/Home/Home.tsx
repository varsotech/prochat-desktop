import React, {useEffect, useRef} from 'react';
import Sidebar from "../../components/Sidebar";
import {Route, Switch, useLocation} from "wouter";
import Community from "./Community";
import Inbox from "./Inbox";
import {useTheme} from "../../components/Theme/Theme";
import {useOAuth} from "../../components/OAuth/OAuth";
import {useHomeserver} from "../../components/Network/HomeserverProvider";
import {create, fromBinary, toBinary} from "@bufbuild/protobuf";
import {
    GetUserCommunitiesResponseSchema,
    GetUserCommunitiesRequestSchema,
    Message_Type, JoinCommunityServerRequestSchema, JoinCommunityServerResponseSchema,
} from "../../../../prochat-server/client/homeserver/v1/homeserver_pb";

function Home() {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    const {isLoggedIn, homeserverAddress} = useOAuth();
    const {request, isOpen} = useHomeserver();
    // const {} = useCommunityServerHttp();

    // Join homeserver community
    useEffect(() => {
        if (!isOpen) return;

        const payload = toBinary(JoinCommunityServerRequestSchema, create(JoinCommunityServerRequestSchema, {
            host: homeserverAddress,
        }));

        return request(Message_Type.JOIN_COMMUNITY_SERVER, payload, (response) => {
            if (response.error?.message) {
                console.error(response.error.message);
                return;
            }
            const resp = fromBinary(JoinCommunityServerResponseSchema, response.payload);
            console.log("join community server response", resp);
        });
    }, [isOpen]);

    // Get user communities
    useEffect(() => {
        if (!isOpen) return;

        const payload = toBinary(GetUserCommunitiesRequestSchema, create(GetUserCommunitiesRequestSchema, {}));

        return request(Message_Type.GET_USER_COMMUNITIES, payload, (response) => {
            if (response.error?.message) {
                console.error(response.error.message);
                return;
            }
            const resp = fromBinary(GetUserCommunitiesResponseSchema, response.payload);
            console.log("get user communities RESPONSE", resp);
        });
    }, [isOpen]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <div style={{ display: "flex", flex: 1 }}>
            <Sidebar />
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <div style={{ display: "flex", height: t.spacing.l, width: "100%", alignItems: "center", justifyContent: "center" }}>
                    {/*<div style={{ fontSize: t.font.s, color: t.colors.text.subtitle }}>Prochat</div>*/}
                </div>
                <div style={{ flex: 1, background: "#0f0f0f", borderRadius: 7 }}>
                    <Switch>
                        <Route path="/inbox" component={Inbox} />

                        <Route path="/community/:id">
                            {(params: {id: string}) => <Community id={params.id} />}
                        </Route>

                        <Route></Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Home;