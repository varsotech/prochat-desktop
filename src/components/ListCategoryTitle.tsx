import React from 'react';
import {useTheme} from "./Theme/Theme";
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid'
import Link from "./Link";

export type ListCategoryProps = {
    name: string;
    isOpen: boolean;
    onClick?: () => void;
}

function ListCategoryTitle({name, isOpen, onClick}: ListCategoryProps) {
    const [t] = useTheme();

    return (
        <div style={{display: "flex", marginTop: t.spacing.m}}>
            <Link
                onClick={onClick}
                style={{ fontWeight: 500, fontSize: t.font.s, color: t.colors.text.subtitle, display: "flex", alignItems: "center", gap: t.spacing.xxs, textTransform: "uppercase" }}>
                {isOpen ? <ChevronDownIcon height={t.font.xs} /> : <ChevronRightIcon height={t.font.xs} />}
                {name}
            </Link>
        </div>
    )
}

export default ListCategoryTitle;