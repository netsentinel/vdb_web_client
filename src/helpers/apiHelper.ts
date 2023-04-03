import axios from "axios";
import urlHelper from "./urlHelper";
import IUserDevice from '../models/Device/IUserDevice';
import globalContext from './globalContext';
import DeleteDeviceRequest from '../models/Device/DeleteDeviceRequest';
import AuthHelper from './authHelper';

/* This class must be transient sience it has no ability
 * to refresh access token and will simply fail if it 
 * expire during the instance lifetime.
 */
export default class apiHelper {
    private _lastStatus?: number;
    public get lastStatus(): number | undefined {
        return this._lastStatus;
    }

    private _accessJwt: string;
    constructor() {
        this._accessJwt = "";
    }

    // !reviewed 3 apr 2023
    private onRequest = async () => {
        if ((await AuthHelper.EnsureUserInContext()) && globalContext.lastLoadedAccessJwt) {
            this._accessJwt = globalContext.lastLoadedAccessJwt;
        } else {
            throw Error("No JWT was loaded.");
        }
    }

    // !reviewed 3 apr 2023
    public getUserDevices = async () => {
        await this.onRequest();
        try {
            var response = await axios.get<IUserDevice[]>(urlHelper.getDeviceUrl(), {
                headers: {
                    'Authorization': ('Bearer ' + this._accessJwt)
                }
            });
        } catch (e: any) {
            console.error("Failed to load devices.");
            if (e["response"]["status"]) {
                this._lastStatus = e["response"]["status"];
            }
            return undefined;
        }

        if (response.status !== 200) {
            console.error(`Failed to load devices: HTTP_${response.status}.`);
            this._lastStatus = response.status;
            return undefined;
        }

        console.info("Loaded devices. Ids: "
            + `${response.data.length > 0 ? response.data.map(x => x.Id).join(' ') : "none"}.`);
        this._lastStatus = response.status;
        return response.data;
    }

    // !reviewed 3 apr 2023
    public removeUserDevice = async (devicePubkey: string) => {
        await this.onRequest();
        try {
            var response = await axios.patch<IUserDevice[]>(urlHelper.getDeviceUrl(),
                new DeleteDeviceRequest(devicePubkey), {
                headers: {
                    'Authorization': ('Bearer ' + this._accessJwt)
                }
            });
        } catch (e: any) {
            console.error("Failed to remove device.");
            if (e["response"]["status"]) {
                this._lastStatus = e["response"]["status"];
            }
            return false;
        }

        if (response.status !== 200) {
            console.error(`Failed to load devices: HTTP_${response.status}.`);
            this._lastStatus = response.status;
            return false;
        }

        return true;
    }
}