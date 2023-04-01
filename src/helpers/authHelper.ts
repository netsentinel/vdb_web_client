import apiHelper from "./apiHelper";
import LoginRequest from '../models/Auth/LoginRequest';
import axios from 'axios';
import IJwtAuthResponse from '../models/Auth/IJwtAuthResponse';
import urlHelper from './urlHelper';
import globalContext from "./globalContext";
import jwtHelper from './jwtHelper';
import { AxiosResponse } from "axios";
import RegistrationRequest from '../models/Auth/RegistrationRequest';

export class authHelper {
    public static tryLoadUserAndRefreshIfNeeded = async () => {
        console.info("Trying to load access token...");
        if (!globalContext.currentUser) {
            console.info("Loading access token from local storage...");
            let jwt = globalContext.getAccessJwtFromStorage();
            if (jwt) {
                console.info("Loaded access token from local storage. Validating...");
                var parsed = authHelper.parseAccessJwtAndUpdateContext(jwt);
                if (parsed) {
                    if (parsed.exp > Date.now()) {  // access token is valid
                        console.info("Successfully validated access token from local storage.");
                        return;
                    }
                    else { // access token expired
                        console.info("Access token from local storage has expired. Refreshing...");
                        await authHelper.performRefreshAsync(); // try to refresh
                    }
                }
                else { // invalid access token
                    console.info("Access token from local storage is invalid. Refreshing...");
                    await authHelper.performRefreshAsync(); // try to refresh
                }
            }
        }
        else {
            console.info("Access token already loaded.");
            if (globalContext.currentUser.exp < Date.now()) { // user expired
                console.info("Access has expired. Refreshing...");
                await authHelper.performRefreshAsync();
            } else {
                console.info("Successfully validated loaded access token.");
            }
        }
    }

    private static parseAccessJwtAndUpdateContext = (accessToken: string) => {
        console.info(`Parsing access token \'${accessToken}\'...`)
        var user = jwtHelper.DecodeAccessToken(accessToken);
        if (!user) {
            console.error("Unable to parse access token.");
            return undefined;
        }

        console.info("Saving JWT into local storage...")
        globalContext.setAccessJwtInStorage(accessToken);
        console.info("Setting current user...");
        globalContext.currentUser = user;
        globalContext.accessJwtExpires = user.exp;

        return user;
    }

    private static parseResponseAndUpdateContext = (result: AxiosResponse<IJwtAuthResponse, any>) => {
        console.info("Parsing response from auth endpoint...");
        this.lastStatus = result.status;
        if (result.status === 200) {
            console.info("Decoding access token...");
            var user = jwtHelper.DecodeAccessToken(result.data.accessToken);
            if (!user) return undefined;

            if (result.data.refreshExpires) {
                console.info(`Server provided refresh token with expiration date: ${result.data.refreshExpires}.`);
                globalContext.refreshJwtExpires = result.data.refreshExpires;
            }

            return this.parseAccessJwtAndUpdateContext(result.data.accessToken);
        } else {
            console.error("Returned status was not equal to 200.");
        }
    }

    public static lastStatus: number;
    public static performLoginAsync = async (request: LoginRequest) => {
        console.info("Trying to log in...");
        try {
            return this.parseResponseAndUpdateContext(
                await axios.post<IJwtAuthResponse>(urlHelper.getAuthUrl(), request));
        } catch (e) {
            console.error(e);
            this.lastStatus = 0;
        }
    }

    public static performRegistrationAsync = async (request: RegistrationRequest, redirectToLogin = true) => {
        console.info("Trying to register user...");
        console.info(`Redirect to login in case of existing user is ${redirectToLogin ? "enabled" : "disabled"}.`);
        try {
            return this.parseResponseAndUpdateContext(
                await axios.put<IJwtAuthResponse>(urlHelper.getAuthUrl() + `?redirectToLogin=${redirectToLogin}`, request));
        } catch {
            this.lastStatus = 0;
        }
    }

    public static performRefreshAsync = async () => {
        console.info("Trying to refresh tokens...");
        try {
            return this.parseResponseAndUpdateContext(
                await axios.patch<IJwtAuthResponse>(urlHelper.getAuthUrl()));
        } catch {
            this.lastStatus = 0;
        }
    }
}