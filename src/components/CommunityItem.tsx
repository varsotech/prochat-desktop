import React from 'react';
import {useTheme} from "./Theme/Theme";
import Link from "./Link";

export interface CommunityItemProps {
    name: string;
    icon: string;
    active?: boolean;
}

function CommunityItem({ name, icon, active }: CommunityItemProps) {
    const [t] = useTheme();

    return (
        <Link style={{ paddingLeft: t.spacing.s, paddingRight: t.spacing.s }} active={active}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: t.spacing.s, paddingBottom: t.spacing.s }}>
                <img
                    alt={"Community icon"}
                    src={icon}
                    width={34}
                    height={34}
                    style={{ borderRadius: 9, marginRight: t.spacing.s }}
                />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <span style={{ fontSize: t.font.l, fontWeight: 600 }}>{name}</span>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: t.spacing.xxs }}>
                        <span style={{ height: 6, width: 6, backgroundColor: "#4fc421", borderRadius: 10, marginTop: 2 }} />
                        <span style={{ fontSize: t.font.s, color: t.colors.text.subtitle }}>12 online</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CommunityItem;