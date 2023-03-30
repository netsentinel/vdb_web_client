import jwtDecode from "jwt-decode";
import JwtInfo from "src/models/Common/IJwtInfo";



export default class jwtHelper {
    public static Validate = (jwt: string) => {
        if (!jwt) return false;

        var decodedJwt;
        try {
            decodedJwt = jwtDecode<JwtInfo>(jwt);
        } catch {
            return false;
        }
        if (decodedJwt.exp && (decodedJwt.exp! < Date.now())) return false;

        return true;        
    }

    public static Decode = (jwt:string) =>{
        return jwtDecode<JwtInfo>(jwt); 
    }
}
