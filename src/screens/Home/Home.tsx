import React, {useEffect} from 'react';
import Sidebar from "@components/Sidebar";
import {Route, Switch, useLocation} from "wouter";
import Community from "./Community";
import Inbox from "./Inbox";
import {useTheme} from "@components/Theme/Theme";
// import {useHomeserver} from "../components/Network/HomeserverProvider";

function Home() {
    const [t] = useTheme();
    const [, navigate] = useLocation();
    // const { subscribe } = useHomeserver();
    // const [highlighted, setHighlighted] = useState(false);
    //
    // useEffect(() => {
    //     return subscribe("highlight", (payload) => {
    //         if (payload.id === "x") {
    //             setHighlighted(true);
    //             setTimeout(() => setHighlighted(false), 2000); // auto-remove highlight
    //         }
    //     });
    // }, [subscribe]);

    useEffect(() => {
        // If not logged in
        const serverAddress = localStorage.getItem("ServerAddress");
        if (serverAddress == null) {
            navigate("/login")
        }
    }, []);

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

                        <Route>404: Page not found</Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Home;