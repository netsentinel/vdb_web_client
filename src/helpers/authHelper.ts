import UserApiHelper from "./apiHelper";
import LoginRequest from '../models/Auth/LoginRequest';
import axios from 'axios';
import IJwtAuthResponse from '../models/Auth/IJwtAuthResponse';
import urlHelper from './urlHelper';
import globalContext from "./globalContext";
import jwtHelper from './jwtHelper';
import { AxiosResponse } from "axios";
import RegistrationRequest from '../models/Auth/RegistrationRequest';

/* This static class provides actions which affects
 * globalContext fields.
 */
export default class AuthHelper {
    private static _lastStatus?: number;
    public static get lastStatus(): number | undefined {
        return this._lastStatus;
    }

    // !reviewed 3 apr 2023
    private static ParseAccessJwtAndUpdateContext = (accessToken: string): boolean => {
        console.info(`Parsing access token \'${accessToken}\'...`)

        var user = jwtHelper.DecodeAccessToken(accessToken);
        if (!user) {
            console.error("Unable to parse access token.");
            return false;
        }

        console.info("Saving JWT into local storage...")
        globalContext.setAccessJwtInStorage(accessToken);

        console.info("Setting last loaded token...");
        globalContext.lastLoadedAccessJwt = accessToken;

        console.info("Setting current user...");
        globalContext.currentUser = user;

        console.info(`Current user: ${globalContext.currentUser.Email}.\n` +
            `Access JWT expires: ${new Date(user.exp * 1000)}.`)

        return true;
    }

    // !reviewed 3 apr 2023
    private static ParseResponseAndUpdateContext = (result: AxiosResponse<IJwtAuthResponse, any>): boolean => {
        console.info("Parsing response from auth endpoint...");
        this._lastStatus = result.status;

        if (result.status === 200) {
            if (result.data.refreshExpires) {
                console.info(`Server provided refresh token with expiration date: ${result.data.refreshExpires}.`);
                globalContext.refreshJwtExpires = result.data.refreshExpires;
                globalContext.setRefreshExpInStorage(result.data.refreshExpires)
            }
            return this.ParseAccessJwtAndUpdateContext(result.data.accessToken);
        } else {
            console.error("Returned status was not equal to 200.");
            return false;
        }
    }

    // !reviewed 3 apr 2023
    public static EnsureUserInContext = async (): Promise<boolean> => {
        console.info("Trying to load access token...");
        const curr = globalContext.currentUser;

        if (curr) { // loaded user already exists
            // 10% of JWT lifespan
            const minimumMilliseconds = (curr.exp - curr.nbf) / 10 * 1000;
            const currExpMs = curr.exp * 1000;

            if (currExpMs < Date.now()) { // token expired
                console.info("Access token already loaded, but expired. Refreshing...");
                try { await this.PerformRefreshAsync(); }
                catch { return false; }
                return true;
            }
            else if (currExpMs < Date.now() + minimumMilliseconds) { // token will expire soon
                console.info("Access token already loaded, but wiil expire soon. Refreshing...");
                try { await this.PerformRefreshAsync(); } catch { }
                return true;
            }
            else { // enough time remains
                console.info("Access token already loaded.");
                return true;
            }
        }

        // no current user, try to load from localstorage
        const jwt = globalContext.getAccessJwtFromStorage();
        if (jwt && AuthHelper.ParseAccessJwtAndUpdateContext(jwt)) {
            console.info("Loading token from local storage...");
            return await this.EnsureUserInContext();
        }

        // no current user and no JWT found in storage
        console.info("No access token found. Refreshing...");
        let result: boolean = false;
        try {
            if (await AuthHelper.PerformRefreshAsync()) {
                result = true;
            }
        } catch { }
        return result;
    }

    // !reviewed 3 apr 2023
    private static HandleLoginOrRegisterRenpose = (response?: AxiosResponse<IJwtAuthResponse, any>): boolean => {
        if (response) {
            this._lastStatus = response.status;
            try {
                return this.ParseResponseAndUpdateContext(response);
            }
            catch (e) {
                console.error(e);
            }
        }
        return false;
    }

    // !reviewed 3 apr 2023
    public static PerformLoginAsync = async (request: LoginRequest): Promise<boolean> => {
        console.info("Trying to log in...");
        this._lastStatus = 0;

        try {
            var response = await axios.post<IJwtAuthResponse>(urlHelper.getAuthUrl(), request);
        } catch (e: any) {
            console.error("Failed to login.");
            let code = e["response"]["status"];
            if (code) this._lastStatus = code;
            return false;
        }

        return this.HandleLoginOrRegisterRenpose(response);
    }

    // !reviewed 3 apr 2023
    public static PerformRegistrationAsync = async (request: RegistrationRequest, redirectToLogin = true) => {
        console.info("Trying to register user...");
        console.info(`Redirect to login in case of existing user is ${redirectToLogin ? "enabled" : "disabled"}.`);
        this._lastStatus = 0;

        try {
            var response = await axios.put<IJwtAuthResponse>(urlHelper.getAuthUrl() + `?redirectToLogin=${redirectToLogin}`, request);
        } catch (e: any) {
            console.error("Failed to register.");
            let code = e["response"]["status"];
            if (code) this._lastStatus = code;
            return false;
        }

        return this.HandleLoginOrRegisterRenpose(response);
    }

    // !reviewed 3 apr 2023
    public static PerformRefreshAsync = async () => {
        console.info("Trying to refresh tokens...");
        this._lastStatus = 0;

        try {
            var response = await axios.patch<IJwtAuthResponse>(urlHelper.getAuthUrl());
        } catch (e: any) {
            console.error("Failed to refresh tokens.");
            let code = e["response"]["status"];
            if (code) this._lastStatus = code;
            return false;
        }

        return this.HandleLoginOrRegisterRenpose(response);
    }
}