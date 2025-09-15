import React from 'react';

function    WindowTitleBar() {
    return (
        <div
            style={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                WebkitAppRegion: 'drag',
                height: 28,
                position: 'fixed',
                width: '100%',
            }}
        />
    );
}

export default WindowTitleBar;