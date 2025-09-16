import React from 'react';
import CommunityItem from "./CommunityItem";
import {useTheme} from "./Theme/Theme";
import ListCategory from "./ListCategory";
import {ArrowLeftEndOnRectangleIcon, PlusCircleIcon} from '@heroicons/react/24/outline'
import Link from "./Link";

function Sidebar() {
    const [t] = useTheme();

    return (
        <div style={{ backgroundColor: t.colors.sidebarRight.background, width: 200, display: "flex", flexDirection: "column", padding: t.spacing.s, paddingTop: t.spacing.l }}>
            {/*<div style={{ display: "flex", justifyContent: "space-between"}}>*/}

            {/*    <div />*/}
            {/*    <ArrowLeftEndOnRectangleIcon*/}
            {/*        style={{ color: t.colors.text.subtitle, width: t.font.xl, height: t.font.xl, borderRadius: 9 }}*/}
            {/*    />*/}
            {/*</div>*/}

            <ListCategory itemsContainerStyle={{ gap: t.spacing.xxs }} name={"Text Channels"} items={[
                <Link active style={{ padding: t.spacing.xs, paddingLeft: t.spacing.s, paddingRight: t.spacing.s, fontSize: t.font.m, color: t.colors.sidebarRight.text.unread}}>#general</Link>,
                <Link style={{ padding: t.spacing.xs, paddingLeft: t.spacing.s, paddingRight: t.spacing.s, fontSize: t.font.m, color: t.colors.sidebarRight.text.read}}>#news</Link>,
            ]} />
        </div>
    )
}

export default Sidebar;