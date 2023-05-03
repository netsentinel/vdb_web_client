export default interface IUserDevice {
    Id: number;
    UserId: number;
    WireguardPublicKey: string;
    LastConnectedNodeId: number | null;
    LastSeenUtc: string | null;
}