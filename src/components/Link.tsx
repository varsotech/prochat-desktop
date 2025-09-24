import React, {ReactNode, CSSProperties} from 'react';
import {useTheme} from "./Theme/Theme";

export type LinkProps = {
    children: React.ReactNode;
    active?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    className?: string;
}

function Link({children, active, style, onClick, className}: LinkProps) {
    const [t] = useTheme();

    const activeStyle: CSSProperties = active ? {
        backgroundColor: t.colors.card.active,
    } : {}

    return (
        <a href={"#"} className={className} onClick={() => onClick?.()} style={{ textDecoration: "none", color: "inherit", borderRadius: 10, ...activeStyle, ...style }}>
            {children}
        </a>
    )
}

export default Link;