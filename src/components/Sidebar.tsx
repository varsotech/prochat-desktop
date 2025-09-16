import React, {useState} from 'react';
import CommunityItem from "./CommunityItem";
import {useTheme} from "./Theme/Theme";
import ListCategory from "./ListCategory";
import {ArrowLeftEndOnRectangleIcon, PlusCircleIcon} from '@heroicons/react/24/outline'
import SidebarRight from "./SidebarRight";

function Sidebar() {
    const [t] = useTheme();
    const [selectedItem, setSelectedItem] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 200, display: "flex", flexDirection: "column", padding: t.spacing.s, paddingTop: t.spacing.l }}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    {/*<PlusCircleIcon*/}
                    {/*    style={{ color: t.colors.text.subtitle, width: t.font.xl, height: t.font.xl, borderRadius: 9 }}*/}
                    {/*/>*/}
                    <div />
                    <ArrowLeftEndOnRectangleIcon
                        style={{ color: t.colors.text.subtitle, width: t.font.xl, height: t.font.xl, borderRadius: 9 }}
                    />
                </div>

                <ListCategory name={"Favorites"} items={[
                    <CommunityItem id={"ableton"} name={"Ableton"} active icon={"https://cdn.discordapp.com/icons/1019528834317553664/c8d0e57fa5b1c46ad71c4d9ecb22e0b4.png?size=160&quality=lossless"} />,
                    <CommunityItem id={"straftatcomp"} name={"Straftat Competitive"} icon={"https://cdn.discordapp.com/icons/1306435530241609859/d7a2590207d17367ec897f1aa859b06b.png?size=160&quality=lossless"} />,
                ]} />

                <ListCategory name={"Politics"} items={[
                    <CommunityItem id={"hasanabi"} name={"Hasanabi"} icon={"https://cdn.discordapp.com/icons/487060767342854145/a_2053eb4739bc549a95e8d00c77eaeaf5.png?size=160&quality=lossless"} />,
                ]} />
            </div>
            <SidebarRight />
        </div>
    )
}

export default Sidebar;