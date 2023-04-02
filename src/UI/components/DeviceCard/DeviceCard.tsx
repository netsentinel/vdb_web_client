export interface UserDevice {
    Id: number;
    UserId: number;
    WireguardPublicKey: string;
    LastConnectedNodeId: number | null;
    LastSeenUtc: string | null;
}

const DeviceCard: React.FC<UserDevice> = (props) => {

    return <span>
        
    </span>;
}