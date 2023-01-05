const SOCKS_PROXY_DATA = 'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/socks_proxy_30d.ipset';
const DATA_STORE = 'data.json';
const TAG = 'socks_proxy_30d';
const ipList: IP[] = [];

const resetIPList = (ipAddresses: string[]) => {
    // Empty the IP list in order to store the updated values;
    while (ipList.length > 0) {
        ipList.pop();
    }

    ipAddresses.forEach((ipAddr) => {
        ipList.push(new IP(ipAddr));
    });
};

const getList = async () => {
    try {
        const resp = await fetch(SOCKS_PROXY_DATA, { method: 'GET' });
        const text = await resp.text();

        const ipAddresses = await IPList.parse(text);
        resetIPList(ipAddresses);

        await storage.save(DATA_STORE, JSON.stringify(ipAddresses));
    } catch (e) {
        console.error(e);
    }
};

function lookupIP(ip: string) {
    const isSocksProxyIP = ipList.find((ipAddr) => ipAddr.contains(ip));

    if (!isSocksProxyIP) {
        return;
    }

    return {
        info: 'This IP was marked as a socks proxy',
        list: SOCKS_PROXY_DATA,
        tag: TAG,
    };
}

const setup = async () => {
    await storage.init();
    
    try {
        const contents = await storage.read(DATA_STORE);
        const ipAddresses = JSON.parse(contents) as string[];
        resetIPList(ipAddresses);
    } catch (e) {
        await getList();
    }
};

const job = () => {
    getList();
};

const getEndpoint = (req: RequestT, res: ResponseT) => {
    res.json(200, ipList.map((ip) => ip.ip));
};

const install = (): ExtensionConfigT => {
    setup();

    return {
        version: 1,
        name: 'socks_proxy_30d',
        hasLookup: true,
        endpoints: [{
            method: 'GET',
            handler: 'getEndpoint',
            endpoint: '/ipset/list',
        }],
        jobs: [{
            cron: '0 */2 * * *',
            job: 'job',
        }],
    };
};
