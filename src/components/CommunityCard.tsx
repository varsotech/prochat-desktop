import React from 'react';
import {useTheme} from "./Theme/Theme";
import Link from "./Link";
import css from "./CommunityCard.module.css";

export interface CommunityCardProps {
    id: string;
    title: string;
    subtitle?: string;
    iconUrl?: string;
    iconRender?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

function CommunityCard({ title, subtitle, iconUrl, iconRender, active, onClick }: CommunityCardProps) {
    const [t] = useTheme();

    return (
        <Link className={css.card} style={{ paddingLeft: t.spacing.xs, paddingRight: t.spacing.xs, color: active ? t.colors.text.focused : t.colors.text.unfocused }} active={active} onClick={onClick}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: t.spacing.xs, paddingBottom: t.spacing.xs }}>
                <div style={{ width: 34, height: 34, backgroundColor: t.colors.photo.fallback, marginRight: t.spacing.s, borderRadius: 7, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {iconRender ? iconRender : <img
                        alt={"Community icon"}
                        src={iconUrl}
                        style={{width: "100%", height: "100%"}}
                    />}
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <span style={{ fontSize: t.font.m, fontWeight: 600 }}>{title}</span>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: t.spacing.xxs }}>
                        {/*<span style={{ height: 6, width: 6, backgroundColor: "#4fc421", borderRadius: 10, marginTop: 2 }} />*/}
                        <span style={{ fontSize: t.font.xs, color: t.colors.text.description }}>{subtitle}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CommunityCard;