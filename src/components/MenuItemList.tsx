import React from 'react';
import {useTheme} from "./Theme/Theme";
import ListCategoryTitle from "./ListCategoryTitle";

export type ListCategoryProps = {
    name?: string;
    items: React.ReactNode[];
    itemsContainerStyle?: React.CSSProperties;
}

function MenuItemList({name, items, itemsContainerStyle}: ListCategoryProps) {
    const [t] = useTheme();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div>
            {name ? <ListCategoryTitle name={name} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} /> : null}
            {isOpen && (
                <div style={{display: "flex", flexDirection: "column", gap: t.spacing.s, marginBottom: t.spacing.m, ...itemsContainerStyle}}>
                    {items}
                </div>
            )}
        </div>
    )
}

export default MenuItemList;