/** @param {import(".").NS } ns */

export function showServerData(ns, name) {
    let server = ns.getServer(name);
    ns.tprint(server);
}

export function mineServer(ns, target) {
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    ns.nuke(target);
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}

function scanServers(ns, servername) {


    // Set starting server
    let servers = ns.scan(servername);
    ns.tprint(servers.length);
    if (servers.length === 0) {
        // continue;
    } else {
        // Iterate through all servernames of last scan.
        for (let i = 0; i < servers.length; i++) {
            const server = servers[i];

            // Check if current servername already exists in checklist.
            if (serverCheckList.includes(server)) {
                //Exists already, skip....
                continue;
            } else {
                // Add current servername to checklist
                serverCheckList.push(server);    
                const servData = ns.getServer(server);
                serverMap[server] = servData;
                serverMap[server]["parentNode"] = servername;
                // ns.tprint(serverMap[server]);
                scanServers(ns, server);
            }
        }
    }
}

export async function storeServers(ns, serverlist) {
    const serverCheckList = [];
    const serverMap = {};
    const filename = 'serverlist.txt';

    if (serverList.length === 0) {
        // continue;
    } else {
        // Iterate through all servernames of the list.
        for (let i = 0; i < serverList.length; i++) {
            const server = serverList[i];

            // Check if current servername already exists in checklist.
            if (serverCheckList.includes(server)) {
                //Exists already, skip....
                continue;
            } else {
                // Add current servername to checklist
                serverCheckList.push(server);    
                const servData = ns.getServer(server);
                serverMap[server] = servData;
                serverMap[server]["parentNode"] = servername;
                // ns.tprint(serverMap[server]);
                scanServers(ns, server);
            }
        }
    }

    // scanServers(ns, "home");
    //     // ns.tprint(serverMap);

    //     for (let s in serverMap) {
    //         if (s != "home"){
    //             const reqHackLvl = serverMap[s]['requiredHackingSkill']
    //             const ownHackLvl = ns.getHackingLevel();
    //             let hackable = ownHackLvl > reqHackLvl;
    //             const isRoot = serverMap[s]['hasAdminRights'];
        
    //             if (hackable) {
    //                 if(isRoot){
    //                     ns.tprint(`*** ${s} ALREADY ROOT ACCESS!!`);
    //                 } else {
    //                     ns.tprint(s);
    //                     ns.tprint(`*** ${serverMap[s]['parentNode']} -> ${s} [${serverMap[s]['ip']}] ***`);
    //                     ns.tprint(` - Root acces: ${isRoot ? "Yes" : "No"}`);
    //                     ns.tprint(` - Required open ports: ${serverMap[s]['numOpenPortsRequired']}`);
    //                     ns.tprint(` - Required hacking level: ${reqHackLvl}`);
    //                     // ns.tprint(` - Currently connected to: ${serverMap[s]['isConnectedTo']}`)
    //                     ns.tprint("\n\n");
    //                 }
    //             }    
    //         }
    //     }
    //     await ns.write(filename, JSON.stringify(serverMap), 'w');
    // }
}