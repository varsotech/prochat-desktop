import { Theme } from "./Theme";
import {lightTheme} from "./light";

export const darkTheme: Theme = {
    ...lightTheme, // Use light theme for everything but colors
    colors: {
        text: {
            default: "#f5f5f7",
            subtitle: "#b2b2b2",
        },
        card: {
            active: 'rgba(255, 255, 255, 0.1)',
        }
    },
};
