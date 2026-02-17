import React, {useEffect, useState} from 'react';
import MenuItemCard from "./MenuItemCard";
import {useTheme} from "./Theme/Theme";
import MenuItemList from "./MenuItemList";
import {PlusCircleIcon} from '@heroicons/react/24/solid';
// import SidebarRight from "./SidebarRight";
import {CommunityGroup} from "@varsotech/prochat/prochat/v1/base_pb";
import {useLocation} from "wouter";
import {GetUserCommunitiesResponse_Community} from "../../../prochat-server/client/homeserver/v1/homeserver_pb";

export type SidebarProps = {
    communities: GetUserCommunitiesResponse_Community[];
}

function Sidebar({communities}: SidebarProps) {
    const [t] = useTheme();
    const [selectedCommunityId, setSelectedCommunityId] = useState("");
    const [location, navigate] = useLocation();

    // const communities: CommunityGroup[] = [
    //     {
    //         id: "favorites",
    //         name: "Favorites",
    //         communities: [
    //             {
    //                 "$typeName": "",
    //                 id: "ableton",
    //                 name: "Ableton",
    //                 iconUrl: "https://cdn.discordapp.com/icons/1019528834317553664/c8d0e57fa5b1c46ad71c4d9ecb22e0b4.png?size=160&quality=lossless",
    //                 online: BigInt(403),
    //             },
    //             {
    //                 "$typeName": "",
    //                 id: "straftatcomp",
    //                 name: "Straftat Competitive",
    //                 iconUrl: "https://cdn.discordapp.com/icons/1306435530241609859/d7a2590207d17367ec897f1aa859b06b.png?size=160&quality=lossless",
    //                 online: BigInt(14),
    //             },
    //         ]
    //     },
    //     {
    //         id: "politics",
    //         name: "Politics",
    //         communities: [
    //             {
    //                 "$typeName": "",
    //                 id: "hasanabi",
    //                 name: "Hasanabi",
    //                 iconUrl: "https://cdn.discordapp.com/icons/487060767342854145/a_2053eb4739bc549a95e8d00c77eaeaf5.png?size=160&quality=lossless",
    //                 online: BigInt(2440),
    //             },
    //         ]
    //     }
    // ];

    // On community selection changed
    useEffect(() => {
        // Navigate to community page
        navigate(`/community/${selectedCommunityId}`);
    }, [selectedCommunityId]);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 200, display: "flex", flexDirection: "column", padding: t.spacing.s, paddingTop: t.spacing.l }}>
                {/*<div style={{ display: "flex", justifyContent: "space-between"}}>*/}
                {/*    <div />*/}
                {/*    <ArrowLeftEndOnRectangleIcon*/}
                {/*        style={{ color: t.colors.text.subtitle, width: t.font.xl, height: t.font.xl, borderRadius: 9 }}*/}
                {/*    />*/}
                {/*</div>*/}

                <MenuItemList items={[
                    <MenuItemCard key={1} id={"add"} title={"Add community"} iconRender={<PlusCircleIcon width={20} height={20} color={t.colors.text.focused} />} />,
                    // <MenuItemCard id={"add"} title={"Add folder"} iconRender={<FolderPlusIcon width={20} height={20} color={t.colors.text.focused} />} />
                ]} />

                <MenuItemList name={"Communities"} items={[communities?.map((community: GetUserCommunitiesResponse_Community, communityIndex: number) => {
                    return <MenuItemCard
                        key={communityIndex}
                        id={community.id}
                        title={community.name}
                        subtitle={"17 online"}
                        // iconUrl={community.iconUrl}
                        active={community.id === selectedCommunityId}
                        onClick={() => setSelectedCommunityId(community.id)}
                    />;
                })]} />


            </div>
            {/*<SidebarRight />*/}
        </div>
    );
}

export default Sidebar;