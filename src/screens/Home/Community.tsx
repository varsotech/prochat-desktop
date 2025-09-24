import React from 'react';

type CommunityProps = {
    id: string;
}

function Community({id}: CommunityProps) {
    return (
        <div style={{ flex: 1, padding: 15 }}>
            Community {id}
        </div>
    )
}

export default Community;