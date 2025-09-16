import React from 'react';
import {useTheme} from "./Theme/Theme";
import Link from "./Link";

export interface CommunityItemProps {
    id: string;
    name: string;
    icon: string;
    active?: boolean;
}

function CommunityItem({ name, icon, active }: CommunityItemProps) {
    const [t] = useTheme();

    return (
        <Link style={{ paddingLeft: t.spacing.xs, paddingRight: t.spacing.xs }} active={active}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: t.spacing.xs, paddingBottom: t.spacing.xs }}>
                <img
                    alt={"Community icon"}
                    src={icon}
                    width={34}
                    height={34}
                    style={{ borderRadius: 7, marginRight: t.spacing.s }}
                />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <span style={{ fontSize: t.font.m, fontWeight: 600 }}>{name}</span>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: t.spacing.xxs }}>
                        {/*<span style={{ height: 6, width: 6, backgroundColor: "#4fc421", borderRadius: 10, marginTop: 2 }} />*/}
                        <span style={{ fontSize: t.font.xs, color: t.colors.text.description }}>12 online</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CommunityItem;