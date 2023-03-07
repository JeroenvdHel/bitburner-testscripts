/** @param {NS} ns */
export async function main(ns) {
    let infiniteLoopProtection = 9999; // In case you mess with this code, this should save you from getting stuck
    let minHackingLevel = ns.args[0] || 750;
    let maxHackingLevel = ns.args[1] || 850;
    let serversToScan = ["home"]; // Servers we know about, but have no yet scanned
    let discoveredServers = []; // Servers we have scanned
    let hackableServers = []; // Servers we can hack
    while (serversToScan.length > 0 && infiniteLoopProtection-- > 0) { // Loop until the list of servers to scan is empty
        let serverName = serversToScan.pop(); // Get the next server to be scanned
        let serverHackingLevel = ns.getServerRequiredHackingLevel(serverName);
        // Scan all servers that are connected current server)
        for (let connectedServer of ns.scan(serverName)) {
            // If we haven't already scanned this servers, add it to the queue of servers to be scanned  
            if (!discoveredServers.includes(connectedServer))
                serversToScan.push(connectedServer); //  
        }
        // Mark this server as scanned
        discoveredServers.push(serverName);
        if (serverHackingLevel > minHackingLevel && serverHackingLevel < maxHackingLevel) {
            let hackableServer = {};
            hackableServer.serverName = serverName;
            hackableServer.serverHackingLevel = serverHackingLevel;
            hackableServers.push(hackableServer);
        }
    }
    // Sort Hackable Servers by Hacking Level
    hackableServers.sort((a, b) => a.serverHackingLevel - b.serverHackingLevel);
    // Output Display
    for (let server of hackableServers) {
        ns.tprint("------------------------------------");
        ns.tprint("Server: " + server.serverName);
        ns.tprint("Hacking Level: " + server.serverHackingLevel);
    }
    ns.tprint("------------------------------------");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZHNlcnZlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZmluZHNlcnZlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUU7SUFDekIsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQywyRUFBMkU7SUFFOUcsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDeEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7SUFFeEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlEQUFpRDtJQUMvRSxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxDQUFFLDBCQUEwQjtJQUN2RCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBRyxzQkFBc0I7SUFHbEQsT0FBTyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFHLGtEQUFrRDtRQUNsSCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxvQ0FBb0M7UUFDMUUsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsNkJBQTZCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEUsc0RBQXNEO1FBQ3RELEtBQUssSUFBSSxlQUFlLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3Qyw2RkFBNkY7WUFDN0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7Z0JBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDOUY7UUFFRCw4QkFBOEI7UUFDOUIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRW5DLElBQUksa0JBQWtCLEdBQUcsZUFBZSxJQUFJLGtCQUFrQixHQUFHLGVBQWUsRUFBRTtZQUM5RSxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFFeEIsY0FBYyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDdkMsY0FBYyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1lBRXZELGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDeEM7S0FDSjtJQUVELHlDQUF5QztJQUN6QyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVFLGlCQUFpQjtJQUNqQixLQUFLLElBQUksTUFBTSxJQUFJLGVBQWUsRUFBRTtRQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDNUQ7SUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyJ9