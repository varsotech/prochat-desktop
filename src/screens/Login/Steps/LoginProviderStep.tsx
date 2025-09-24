import React, {ReactElement} from 'react';
import {AtSymbolIcon} from '@heroicons/react/24/solid'
import {useTheme} from "../../../components/Theme/Theme";
import CommunityCard from "../../../omponents/CommunityCard";

type LoginProviderStepProps = {
    serverAddress: string;
    setServerAddress: (address: string) => void;
    nextStep: () => void;
    serverIconUrl: string;
    setServerIconUrl: (url: string) => void;
}

function LoginProviderStep({serverAddress, setServerAddress, nextStep, serverIconUrl, setServerIconUrl}: LoginProviderStepProps): ReactElement {
    const [t] = useTheme();

    function selectLoginProvider(address: string, url: string) {
        setServerAddress(address);
        setServerIconUrl(url);
        nextStep();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.m }}>
            <h1 style={{ textAlign: "center", marginBottom: 0 }}>Prochat</h1>
            <div style={{ textAlign: "center", fontSize: t.font.m, color: t.colors.text.subtitle }}>Choose your login provider</div>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.m }} >
                <CommunityCard id={"test"} title={"Custom"} iconRender={<AtSymbolIcon color={t.colors.text.default} width={20} />} subtitle={"Select custom server"} onClick={() => selectLoginProvider("", "")} />
                <CommunityCard id={"test"} title={"Ableton"} iconUrl={"https://cdn.discordapp.com/icons/1019528834317553664/c8d0e57fa5b1c46ad71c4d9ecb22e0b4.png?size=160&quality=lossless"} subtitle={"prochat.ableton.com"} onClick={() => selectLoginProvider("prochat.ableton.com", "https://cdn.discordapp.com/icons/1019528834317553664/c8d0e57fa5b1c46ad71c4d9ecb22e0b4.png?size=160&quality=lossless")} />
                <CommunityCard id={"test"} title={"Political Chat"} iconUrl={"https://cdn.discordapp.com/icons/487060767342854145/a_2053eb4739bc549a95e8d00c77eaeaf5.png?size=160&quality=lossless"} subtitle={"prochat.hasanabi.com"} onClick={() => selectLoginProvider("prochat.hasanabi.com", "https://cdn.discordapp.com/icons/487060767342854145/a_2053eb4739bc549a95e8d00c77eaeaf5.png?size=160&quality=lossless")} />
            </div>

        </div>
    )
}

export default LoginProviderStep;