export default class envHelper {
    public static isDevelopment = () => process.env.REACT_APP_Environment?.toLowerCase() === "development";
    public static isProduction = () => process.env.REACT_APP_Environment?.toLowerCase() === "production";
    public static isDebugMode = () => process.env.REACT_APP_DebugMode?.toLowerCase() === "true";

    public static usePredefinedHost = () => process.env.REACT_APP_Environment?.toLowerCase() === "true";

    public static readonly logLevels = ["OFF", "ERROR", "WARN", "INFO", "LOG"];
    public static logLevel = (): string => {
        let value = process.env.REACT_APP_Log_Level?.trimStart().toUpperCase() ?? this.logLevels[2]; // warn by default

        for (let i = 0; i < this.logLevels.length; i++)
            if (value.startsWith(this.logLevels[i]))
                return this.logLevels[i];

        return this.logLevels[2];
    }
}