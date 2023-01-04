/**
 * The storage module provides access to the `.store` folder and the files within it.
 */
declare module storage {
    /**
     * Before accessing the storage, `init()` needs to be called. The best place to run
     * it is within the `install` function.
     * @example
     * function install() {
     *     storage.init();
     *     return { ... };
     * }
     */
    function init(): Promise<void>;
    /**
     * The save function atempts to save `contents` to `fileName`. If it fails the promise
     * is rejected, otherwise it silently resolves.
     * @param fileName The name of the file in the `.store` folder.
     * @param contents The contents to write to the file.
     */
    function save(fileName: string, contents: string): Promise<void>;
    /**
     * Removes a file from the `.store` folder.
     * @param fileName The name of the file in `.store` to remove.
     */
    function remove(fileName: string): Promise<void>;
    /**
     * Attempts to read a file from `.store`.
     * @param fileName The name of the file to read.
     */
    function read(fileName: string): Promise<string>;
}

declare module IPList {
    /**
     * Parses a string containing an IP set/list into a string array.
     * @param blob The blob to parse.
     */
    function parse(blob: string): Promise<string[]>;
}

declare class IP {
    ip: string;
    /**
     * This class is used to parse IP addresses and CIDR ranges.
     * @param ip The IP address string to parse.
     */
    constructor(ip: string);
    /**
     * Returns whether the IP address that was parsed is valid or not.
     */
    isValid(): boolean;
    /**
     * Returns whether the parsed string is a CIDR range or not.
     */
    isCIDRRange(): boolean;
    /**
     * Returns whether the parsed string is a loopback address or not.
     */
    isLoopback(): boolean;
    /**
     * Returns whether the parsed string is a private IP or not.
     */
    isPrivate(): boolean;
    /**
     * Returns whether the parsed string is unspecified or not.
     */
    isUnspecified(): boolean;
    /**
     * Returns the address' mask.
     */
    getMask(): boolean;
    /**
     * If the parsed address is an IP, this will return `true` if `ip` matches the IP
     * that was parsed. If the parsed address is a CIDR range then it will return
     * `true` if `ip` is within this CIDR range.
     */
    contains(ip: string): boolean;
}

type HTTPMethodT = 'GET' | 'POST' | 'PUT' | 'DELETE';

type EndpointT = {
    /**
     * All endpoints are added under the `/api` route, so your definition
     * should omit the `/api` part. Also, these endpoints are not specific
     * to any extension or reserved for any extension. Make sure to pick
     * something unique.
     * @example
     * `/list` will translate to `/api/list`
     */
    endpoint: string;
    method: HTTPMethodT;
    /**
     * This should be the name of the function that you defined to handle the request.
     */
    handler: string;
};

type CronJobT = {
    /**
     * The format for this is the same as the crontab on Linix. You can use https://cron.help
     * to craft these.
     */
    cron: string;
    /**
     * This should be the name of the function that you defined to handle the job.
     */
    job: string;
};

type ExtensionConfigT = {
    version: number;
    name: string;
    endpoints: EndpointT[];
    jobs: CronJobT[];
};
