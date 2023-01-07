export type IPSetT = {
    name: string;
    url: string;
    data_url: string;
    interval: string;
    job: string;
};

export const ipLists: IPSetT[] = [{
    name: 'socks_proxy_30d',
    url: 'https://iplists.firehol.org/?ipset=socks_proxy_30d#',
    data_url: 'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/socks_proxy_30d.ipset',
    interval: '1 */2 * * *',
    job: 'socksProxyUpdate',
}, {
    name: 'tor_exit_nodes',
    url: 'https://dan.me.uk/',
    data_url: 'https://www.dan.me.uk/torlist/?exit',
    interval: '2/30 * * * *',
    job: 'torNodesUpdate',
}, {
    name: 'botscout_30d',
    url: 'https://iplists.firehol.org/?ipset=botscout_30d',
    data_url: 'https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/botscout_30d.ipset',
    interval: '0 * * * *',
    job: 'botscoutUpdate'
}];
