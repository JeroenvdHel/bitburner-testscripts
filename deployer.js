/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/** @param {import(".").NS } ns */
export async function main(ns) {
    let target = ns.args[0];
    let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    let servers = [];
    let ramPerThread = ns.getScriptRam("/shared/weaken.js");
    let serversToScan = ns.scan("home");
    while (serversToScan.length > 0) {
        let server = serversToScan.shift();
        if (!servers.includes(server) && server !== "home") {
            servers.push(server);
            serversToScan = serversToScan.concat(ns.scan(server));
            await ns.scp([
                "/shared/weaken.js",
                "/shared/grow.js",
                "/shared/hack.js"
            ], server);
            let openPorts = 0;
            if (ns.fileExists("BruteSSH.exe")) {
                ns.brutessh(server);
                openPorts++;
            }
            if (ns.fileExists("FTPCrack.exe")) {
                ns.ftpcrack(server);
                openPorts++;
            }
            if (ns.fileExists("RelaySMTP.exe")) {
                ns.relaysmtp(server);
                openPorts++;
            }
            if (ns.fileExists("HTTPWorm.exe")) {
                ns.httpworm(server);
                openPorts++;
            }
            if (ns.fileExists("SQLInject.exe")) {
                ns.sqlinject(server);
                openPorts++;
            }
            if (ns.getServerNumPortsRequired(server) <= openPorts) {
                ns.nuke(server);
            }
        }
    }
    if (ns.hasRootAccess(target)) {
        while (true) {
            let sleepTime = 3000;
            for (let server of servers) {
                if (ns.hasRootAccess(server)) {
                    let ramAvailable = ns.getServerMaxRam(server)
                        - ns.getServerUsedRam(server);
                    let threads = Math.floor(ramAvailable / ramPerThread);
                    if (threads > 0) {
                        if (ns.getServerSecurityLevel(target) > securityThresh) {
                            sleepTime = ns.getWeakenTime(target);
                            ns.exec("/shared/weaken.js", server, threads, target);
                        }
                        else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
                            sleepTime = ns.getGrowTime(target);
                            ns.exec("/shared/grow.js", server, threads, target);
                        }
                        else {
                            sleepTime = ns.getHackTime(target);
                            ns.exec("/shared/hack.js", server, threads, target);
                        }
                    }
                }
            }
            await ns.sleep(sleepTime + 100);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVwbG95ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDO0FBQzFDLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFFbEMsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBRTtJQUN6QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDdEQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXhELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3QixJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUNoRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ1QsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjthQUNwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRVgs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