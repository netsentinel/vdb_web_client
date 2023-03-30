import IJwtInfo from "../Common/IJwtInfo";

export default interface JwtResponse extends IJwtInfo {
    accessToken: string;
    refreshToken: string | null;
}