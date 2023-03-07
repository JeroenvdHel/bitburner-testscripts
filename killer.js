// import { showServerData, mineServer } from "./testlibrary";

/** @param {import(".").NS } ns */
export async function main(ns, calc) {
    const script = "early-hack-template.js"
    let ramPerThread = ns.getScriptRam(script);
    let target = "joesguns";

    let servers = [];
    let serversToScan = ns.scan("home");
    while (serversToScan.length > 0) {
        let server = serversToScan.shift();
        if (!servers.includes(server) && server !== "home") {
            servers.push(server);
            
            serversToScan = serversToScan.concat(ns.scan(server));

            
            if (ns.hasRootAccess(server)) {
                // Deploy the 'early-hack-template' script
                if(ns.killall(server)) {
                    ns.tprint("Script(s) killed on server '" + server +"'.");
                } else {
                    ns.tprint("There was no script running on server '" + server +"'.");
                }
            }
        }   
    }
}