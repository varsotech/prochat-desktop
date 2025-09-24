import { Theme } from "./Theme";

export const lightTheme: Theme = {
    colors: {
        text: {
            default: "#000000",
            focused: "#000000",
            unfocused: "hsl(240, 2.04%, 19.22%)",
            subtitle: "hsl(240, 2.04%, 19.22%)",
            description: "#hsl(240, 2.04%, 19.22%)",
        },
        background: "rgba(0, 0, 0, 0.2)",
        photo: {
            fallback: "hsl(0,0%,57%)",
        },
        card: {
            active: 'rgba(0, 0, 0, 0.1)',
        },
        sidebarRight: {
            background: "rgba(0, 0, 0, 0.2)",
            text: {
                read: "#hsl(240, 2.04%, 19.22%)",
                unread: "#hsl(240, 2.04%, 40%)",
            }
        }
    },
    font: {
        xs: '0.67em',
        s: '0.8em',
        m: '0.83em',
        l: '0.9em',
        xl: '1.2em',
    },
    spacing: {
        xxs: 3,
        xs: 5,
        s: 8,
        m: 15,
        l: 30,
    }
};
