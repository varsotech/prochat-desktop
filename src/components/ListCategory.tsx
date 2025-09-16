import React from 'react';
import {useTheme} from "./Theme/Theme";
import ListCategoryTitle from "./ListCategoryTitle";

export type ListCategoryProps = {
    name: string;
    items: React.ReactNode[];
    itemsContainerStyle?: React.CSSProperties;
}

function ListCategory({name, items, itemsContainerStyle}: ListCategoryProps) {
    const [t] = useTheme();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div>
            <ListCategoryTitle name={name} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div style={{display: "flex", flexDirection: "column", gap: t.spacing.s, marginBottom: t.spacing.m, ...itemsContainerStyle}}>
                    {items}
                </div>
            )}
        </div>
    )
}

export default ListCategory;