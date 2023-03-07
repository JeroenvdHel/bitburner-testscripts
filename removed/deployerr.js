/** @param {import("../root").NS } ns */

export async function main(ns) {
    // Set starting server
    var servers = ns.scan("home");
    servers.push("home");
    servers.push("CSEC");
    servers.push("neo-net");
    servers.push("zer0");
    servers.push("phantasy");
    servers.push("max-hardware");
    var target = ns.args[0];
    var ownhackLvl = ns.getHackingLevel();
    ns.tprint(servers);

    for (let serverName of servers) {
        // upload script to server
        if(!ns.fileExists("early-hack-template.js", serverName)) {
            await ns.scp("early-hack-template.js", serverName);
        }
        
        // available amount of usable threads
        let ramAvailable = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
        let ramPerThread = ns.getScriptRam("early-hack-template.js");
        let threads = Math.floor(ramAvailable / ramPerThread);
        

        let isRoot = ns.hasRootAccess(serverName);
        let reqPorts = ns.getServerNumPortsRequired(serverName);
        let security = ns.getServerSecurityLevel(serverName);
        
        ns.tprint("["+serverName+"]: Root="+isRoot+", required Ports="+reqPorts+", security level="+security+".");
        
        // get Root access if not already
        // Check if we aren't already root
        if ( !ns.hasRootAccess(serverName)){
            if(ns.getServerNumPortsRequired === 0){
                ns.nuke(serverName);
            }
        }  
        // Check is target seclevel is lower then our hacklevel
            // if (ownhackLvl > security) {
            //     // Check is target requires open ports for nuking
            //     if (reqPorts > 0) {
                
                    
            //     }
            // }
        else{
            let result = ns.exec("early-hack-template.js", serverName, threads, target);
            if(result != 0) {
                ns.tprint("Script started on server'" + serverName + "' with PID [" + result + 
            "].");
            } else {
                ns.tprint("Couldn't start script on server '" + serverName + "'.");
            }
        }
    }

}