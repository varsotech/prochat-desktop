import React from 'react';
import {useTheme} from "./Theme/Theme";
import ListCategoryTitle from "./ListCategoryTitle";

export type ListCategoryProps = {
    name: string;
    items: React.ReactNode[];
}

function ListCategory({name, items}: ListCategoryProps) {
    const [t] = useTheme();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div>
            <ListCategoryTitle name={name} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div style={{display: "flex", flexDirection: "column", gap: t.spacing.s, marginTop: t.spacing.s}}>
                    {items}
                </div>
            )}
        </div>
    )
}

export default ListCategory;