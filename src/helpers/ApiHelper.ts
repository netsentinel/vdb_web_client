import axios from "axios";
import UrlHelper from "./UrlHelper";
import IUserDevice from '../models/Device/IUserDevice';
import GlobalContext from './GlobalContext';
import DeleteDeviceRequest from '../models/Device/DeleteDeviceRequest';
import AuthHelper from './AuthHelper';
import { IPublicNodeInfo } from "src/models/Connection/PublicNodeInfo";
import { IAccessLevelToDevicesLimit } from "src/models/Device/AccessLevelToDevicesLimit";

export default class ApiHelper {
    private static _lastStatus?: number;
    public static get lastStatus(): number | undefined {
        return this._lastStatus;
    }



    public static getNodesList = async () => {
        try {
            var response = await axios.get<IPublicNodeInfo[]>(UrlHelper.getNodesUrl());
        } catch (e: any) {
            console.error("Failed to load nodes.");
            if (e["response"]["status"]) {
                this._lastStatus = e["response"]["status"];
            }
            return undefined;
        }

        if (response.status !== 200) {
            console.error(`Failed to load nodes: HTTP_${response.status}.`);
            this._lastStatus = response.status;
            return undefined;
        }

        return response.data;
    }


    public static getDevicesLimits = async () => {
        try {
            var response = await axios.get<IAccessLevelToDevicesLimit[]>(UrlHelper.getDevicesLimitsUrl());
        } catch (e: any) {
            console.error("Failed to load limits.");
            if (e["response"]["status"]) {
                this._lastStatus = e["response"]["status"];
            }
            return undefined;
        }

        if (response.status !== 200) {
            console.error(`Failed to load limits: HTTP_${response.status}.`);
            this._lastStatus = response.status;
            return undefined;
        }

        return response.data;
    }
}