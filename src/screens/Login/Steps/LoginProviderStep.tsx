import React, {ReactElement} from 'react';
import {AtSymbolIcon} from '@heroicons/react/24/solid'
import {useTheme} from "../../../components/Theme/Theme";
import CommunityCard from "../../../components/CommunityCard";
import {useElectronEnv} from "../../../components/ElectronEnv/ElectronEnv";

type LoginProviderStepProps = {
    onSelection: (address: string) => void;
}

function LoginProviderStep({onSelection}: LoginProviderStepProps): ReactElement {
    const [t] = useTheme();
    const [electronEnv] = useElectronEnv();

    function selectLoginProvider(address: string) {
        onSelection(address);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.m }}>
            <h1 style={{ textAlign: "center", marginBottom: 0 }}>Prochat</h1>
            <div style={{ textAlign: "center", fontSize: t.font.m, color: t.colors.text.subtitle }}>Choose your login provider</div>
            <div style={{ display: "flex", flexDirection: "column", gap: t.spacing.m }} >
                <CommunityCard id={"test"} title={"Custom"} iconRender={<AtSymbolIcon color={t.colors.text.default} width={20} />} subtitle={"Select custom server"} onClick={() => selectLoginProvider("")} />
                {electronEnv.isDev ? <CommunityCard id={"test"} title={"Localhost"} iconRender={<AtSymbolIcon color={t.colors.text.default} width={20} />} subtitle={"Localhost"} onClick={() => selectLoginProvider("https://emersyn-tetradrachmal-gerardo.ngrok-free.dev")} /> : null }
                <CommunityCard id={"test"} title={"Ableton"} iconUrl={"https://cdn.discordapp.com/icons/1019528834317553664/c8d0e57fa5b1c46ad71c4d9ecb22e0b4.png?size=160&quality=lossless"} subtitle={"prochat.ableton.com"} onClick={() => selectLoginProvider("")} />
                <CommunityCard id={"test"} title={"Political Chat"} iconUrl={"https://cdn.discordapp.com/icons/487060767342854145/a_2053eb4739bc549a95e8d00c77eaeaf5.png?size=160&quality=lossless"} subtitle={"varso.org"} onClick={() => selectLoginProvider("prochat.hasanabi.com")} />
            </div>

        </div>
    )
}

export default LoginProviderStep;