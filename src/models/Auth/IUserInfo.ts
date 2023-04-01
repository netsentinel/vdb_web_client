export default interface IUserInfo {
    id: number;
    isAdmin: boolean;
    email: string;
    isEmailConfirmed: boolean;
    payedUntilUtc: string;
}