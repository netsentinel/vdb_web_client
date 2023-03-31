import IJwtInfo from "../Common/IJwtInfo";

export default interface IJwtResponse extends IJwtInfo {
    accessToken: string;
    refreshToken: string | null;
}