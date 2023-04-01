import jwtDecode from "jwt-decode";
import { UserInfo } from "os";
import IJwtAuthResponse from "src/models/Auth/IJwtAuthResponse";
import IJwtInfo from '../models/Common/IJwtInfo';
import IUserInfoFromJwt from '../models/Auth/IUserInfoFromJwt';

export default class jwtHelper {
    // while the refresh jwt must be passed as is
    public static DecodeAccessToken = (accessJwt:string) =>{
        console.info("Deconding access token using jwtHelper...");
        var decoded = jwtDecode<IUserInfoFromJwt>(accessJwt);
        console.info("Decoded into object:");
        console.info(decoded);
        if(!this.ValidateLifetime(decoded)){
            console.info("Lifetime validation failed.");
            return undefined;
        }
        console.info("Returning from jwtHelper...");
        return decoded;
    }



    public static Validate = (jwt: string) : IJwtInfo | null => {
        if (!jwt) return null;

        var decodedJwt : IJwtInfo;
        try {
            decodedJwt = jwtDecode<IJwtInfo>(jwt);
        } catch {
            return null;
        }
        
        if (!this.ValidateLifetime(decodedJwt)) return null;
    
        return decodedJwt;        
    }

    public static ValidateLifetime = (decodedJwt:IJwtInfo) => {
        let exp = new Date(decodedJwt.exp* 1000);
        let nbf = new Date(decodedJwt.nbf* 1000);
        let now = new Date(Date.now());
        console.info(`Validating token lifetime:\nexp=${exp},\nnbf=${nbf},\nnow=${now}.`);

        if (exp < now) return false;
        if (nbf > now) return false;

        return true;
    }
}
