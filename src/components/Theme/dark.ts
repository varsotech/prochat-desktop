import { Theme } from "./Theme";
import {lightTheme} from "./light";

export const darkTheme: Theme = {
    ...lightTheme, // Use light theme for everything but colors
    colors: {
        text: {
            default: "#f5f5f7",
            subtitle: "hsl(0, 0%, 62.35%)",
            description: "hsl(0, 0%, 50%)",
        },
        card: {
            active: 'rgba(255, 255, 255, 0.1)',
        },
        sidebarRight: {
            background: "rgba(0, 0, 0, 0.35)",
            text: {
                read: "hsl(0, 0%, 80%)",
                unread: "hsl(0, 0%, 95%)",
            }
        }
    },
};
