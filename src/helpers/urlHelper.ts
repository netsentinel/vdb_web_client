import endpoints from "../config/endpoints.json"
import { urlJoin } from 'url-join-ts';
import envHelper from './envHelper';


/* Данный класс генерирует URLы для преопредленных
 * в json-файле эндпоинтов.
 */
export default class urlHelper {
    public static getHostUrl = () =>
        envHelper.usePredefinedHost()
            ? endpoints.backend.host
            : window.location.protocol + '//' + window.location.host;

    public static getApiBaseUrl = () => urlJoin(
        this.getHostUrl(),
        endpoints.backend.basePath);

    public static getAuthUrl = () => urlJoin(
        this.getApiBaseUrl(),
        endpoints.backend.authControllerPath);

    public static getConnectionUrl = () => urlJoin(
        this.getApiBaseUrl(),
        endpoints.backend.connectionControllerPath);

    public static getDeviceUrl = () => urlJoin(
        this.getApiBaseUrl(),
        endpoints.backend.deviceControllerPath);
}
