import endpoints from "../config/endpoints.json"
import { urlJoin } from 'url-join-ts';
import EnvHelper from './EnvHelper';


/* Данный класс генерирует URLы для преопредленных
 * в json-файле эндпоинтов.
 */
export default class UrlHelper {
    public static getHostUrl = () =>
        EnvHelper.usePredefinedHost()
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

    public static getSessionsUrl = () => urlJoin(
        this.getAuthUrl(),
        "/sessions");

    public static getCurrentSessionTerminationUrl = () => urlJoin(
        this.getAuthUrl(),
        "/self");
    public static getPasswordPatchUrl = () => urlJoin(
        this.getAuthUrl(),
        "/password");
}
