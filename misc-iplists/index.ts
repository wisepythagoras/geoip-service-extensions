import '../index.d';
import { IPSetManager } from './IPSetManager';
import { ipLists } from './lists';

const listManagers: IPSetManager[] = [];

function lookupIP(ip: string) {
    const results: any[] = [];

    listManagers.forEach((manager) => {
        if (manager.hasIP(ip)) {
            results.push(manager.getInfo());
        }
    });

    return results;
}

function install(): ExtensionConfigT {
    const jobs: CronJobT[] = [];

    ipLists.forEach((list) => {
        const manager = new IPSetManager(list);
        manager.loadExistingData();

        listManagers.push(manager);
        jobs.push({
            cron: list.interval,
            job: list.job,
        });
    });

    return {
        version: 1,
        name: 'misc-iplists',
        hasLookup: true,
        endpoints: [],
        jobs,
    };
}
