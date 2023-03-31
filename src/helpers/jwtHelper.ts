import jwtDecode from "jwt-decode";
import IJwtResponse from "src/models/Auth/IJwtResponse";

export default class jwtHelper {
    public static Validate = (jwt: string) : IJwtResponse | null => {
        if (!jwt) return null;

        var decodedJwt : IJwtResponse;
        try {
            decodedJwt = jwtDecode<IJwtResponse>(jwt);
        } catch {
            return null;
        }
        
        if (decodedJwt.exp && (decodedJwt.exp! < Date.now())) return null;

        return decodedJwt;        
    }
}
