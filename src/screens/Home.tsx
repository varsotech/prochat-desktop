import React from 'react';
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";

function Home() {
    return (
        <div style={{ display: "flex", flex: 1 }}>
            <Sidebar />
            <div style={{ flex: 1, background: "#0f0f0f" }}>
            </div>
        </div>
    )
}

export default Home;