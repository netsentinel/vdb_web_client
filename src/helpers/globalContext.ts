import jwtDecode from "jwt-decode";
import { UserInfo } from "os";
import IJwtAuthResponse from "src/models/Auth/IJwtAuthResponse";
import  IUserInfo  from "src/models/Auth/IUserInfo";
import IJwtInfo from '../models/Common/IJwtInfo';
import IUserInfoFromJwt from '../models/Auth/IUserInfoFromJwt';

export default class globalContext {
    public static currentUser: IUserInfoFromJwt;
    public static accessJwtExpires: number;
    public static refreshJwtExpires: number;




    private static readonly accessTokenName:string = "accessTokenJwt";

    public static setAccessJwtInStorage = (token:string) =>{
        localStorage.setItem(globalContext.accessTokenName,token);
    }
    public static getAccessJwtFromStorage = () =>{
        return localStorage.getItem(globalContext.accessTokenName);
    }  
}
