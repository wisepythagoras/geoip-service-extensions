import '../index.d';
import { IPSetT } from './lists';

export class IPSetManager {
    #ipSet: IPSetT;
    #ipAddresses: IP[];

    constructor(set: IPSetT) {
        this.#ipSet = set;
        this.#ipAddresses = [];
        globalThis[set.job] = () => this.updateData();
    }

    async loadExistingData() {
        try {
            const fileName = `${this.#ipSet.name}.json`;
            const contents = await storage.read(fileName);
            const ipAddresses = JSON.parse(contents) as string[];

            this.#resetStore(ipAddresses);
        } catch (e) {}
    }

    async updateData() {
        try {
            const resp = await fetch(this.#ipSet.data_url, { method: 'GET' });
            const text = await resp.text();

            const ipAddresses = await IPList.parse(text);
            const fileName = `${this.#ipSet.name}.json`;

            await storage.save(fileName, JSON.stringify(ipAddresses));
            this.#resetStore(ipAddresses);
        } catch (e) {
            console.log('GET Error:', e);
        }
    }

    hasIP(ip: string): boolean {
        return !!this.#ipAddresses.find((ipAddr) => ipAddr.contains(ip));
    }

    getInfo() {
        return {
            name: this.#ipSet.name,
            url: this.#ipSet.url,
            data_url: this.#ipSet.data_url,
        };
    }

    #resetStore(ips: string[]) {
        this.#ipAddresses = ips.map((ip) => new IP(ip));
    }
}
