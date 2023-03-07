/**
 * @param {NS} ns
 **/
/*
Gets stats of each hacked server.
RAM: 2.55GB
recommendation: alias stats="run get_stats.js"
*/
function get_all_servers(ns, all = false) {
    /*
    Scans and iterates through all servers.
    If all is false, only servers with root access and have money are returned.
    */
    var servers = ["home"];
    var result = [];
    var i = 0;
    while (i < servers.length) {
        var server = servers[i];
        var s = ns.scan(server);
        for (var j in s) {
            var con = s[j];
            if (servers.indexOf(con) < 0) {
                servers.push(con);
                if (all || (ns.hasRootAccess(con) && parseInt(ns.getServerMaxMoney(con)) > 0)) {
                    result.push(con);
                }
            }
        }
        i += 1;
    }
    return result;
}
function get_action(ns, host) {
    /*
    Gets the first action in the list and returns it.
    */
    var actions = ns.ps(host);
    if (actions.length == 0) {
        return null;
    }
    return actions[0].filename.replace("/scripts/", "").replace(".script", "");
}
function pad_str(string, len) {
    /*
    Prepends the requested padding to the string.
    */
    var pad = "                      ";
    return String(pad + string).slice(-len);
}
function get_server_data(ns, server) {
    /*
    Creates the info text for each server. Currently gets money, security, and ram.
    NOTE: ns.getServer() can return a server object and obtain all of the necessary properties.
    However, ns.getServer() costs 2GB, which doubles the RAM requirement for this script.
    */
    var moneyAvailable = ns.getServerMoneyAvailable(server);
    var moneyMax = ns.getServerMaxMoney(server);
    var securityLvl = ns.getServerSecurityLevel(server);
    var securityMin = ns.getServerMinSecurityLevel(server);
    var ram = ns.getServerMaxRam(server);
    return `${pad_str(server, 17)}` +
        ` money:${pad_str(parseInt(moneyAvailable), 12)}/${pad_str(parseInt(moneyMax), 12)}(${pad_str((moneyAvailable / moneyMax).toFixed(2), 4)})` +
        ` security:${pad_str(securityLvl.toFixed(2), 6)}(${pad_str(securityMin, 2)})` +
        ` RAM:${pad_str(parseInt(ram), 4)}` +
        ` Action:${pad_str(get_action(ns, server), 12)}`;
}
function get_servers(ns) {
    /*
    Gets servers. If specific servers requested, then returns those only.
    Otherwise, scans and returns all servers.
    return: list of servers
    */
    if (ns.args.length >= 1) {
        return ns.args;
    }
    else {
        return get_all_servers(ns, false);
    }
}
export async function main(ns) {
    var servers = get_servers(ns);
    var stats = {};
    // For each server in servers, get the server data and add to our Hash Table.
    for (var server of servers) {
        stats[parseInt(ns.getServerMaxMoney(server))] = get_server_data(ns, server);
    }
    // Sort each server based on how much money it holds.
    var keys = Object.keys(stats);
    keys.sort((a, b) => a - b);
    // Print the results
    for (var i in keys) {
        var key = keys[i];
        ns.tprint(stats[key]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X3N0YXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2dldF9zdGF0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7SUFFSTtBQUNIOzs7O0VBSUU7QUFDSCxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFDLEtBQUs7SUFDckM7OztNQUdFO0lBQ0YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN0QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQzFCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNkLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzlFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQ2hCO2FBQ0Q7U0FDRDtRQUNELENBQUMsSUFBSSxDQUFDLENBQUE7S0FDTjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJ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