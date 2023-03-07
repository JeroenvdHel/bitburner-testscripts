/** @param {NS} ns */
/* eslint-disable no-unused-vars */
function calcBestRam(ns, numServers) {
    let ramList = [];
    let i = 1;
    while (ramList.length < 20) {
        let result = Math.pow(2, i);
        ramList.push(result);
    }
    const affordableRamList = ramList.filter(ram => (numServers * ns.getPurchasedServerCost(ram)) <= ns.getServerMoneyAvailable('home'));
    const bestRam = ramList[affordableRamList.length - 1];
    return bestRam;
}
function deletePurchasedServers(ns, numServers, newRam) {
    const pservs = ns.getPurchasedServers();
    let pservObjs = pservs.map(server => {
        return {
            'name': server,
            'ram': ns.getServerMaxRam(server)
        };
    });
    pservObjs.sort((a, b) => {
        return a.ram - b.ram;
    });
    let pservNames = [];
    pservObjs.forEach((server, index) => {
        if (ns.getServerMaxRam(server.name) >= newRam) {
            return;
        }
        else if (index < numServers) {
            ns.killall(server.name);
            ns.deleteServer(server.name);
            return pservNames.push(server.name);
        }
    });
    return pservNames;
}
export async function main(ns, numServers = ns.args[0]) {
    const ram = calcBestRam(ns, numServers);
    ns.tprint("bestRam = " + ram);
    const totalServers = ns.getPurchasedServers().length + numServers;
    const maxServers = (ns.getPurchasedServerLimit() < totalServers) ? ns.getPurchasedServerLimit() : totalServers;
    if (totalServers > ns.getPurchasedServerLimit()) {
        if (await ns.prompt('The number of servers requested is not available. Do you want to delete existing servers with the smallest ram to make room?')) {
            const pservNames = deletePurchasedServers(ns, totalServers - ns.getPurchasedServerLimit(), ram);
            pservNames.forEach(name => {
                if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
                    ns.purchaseServer(name, ram);
                }
            });
            while (ns.getPurchasedServers().length < maxServers) {
                if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
                    let host = 'pserv-' + ns.getPurchasedServers().length;
                    ns.purchaseServer(host, ram);
                }
            }
        }
        else {
            return;
        }
    }
    else {
        while (ns.getPurchasedServers().length < maxServers) {
            if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {
                let host = 'pserv-' + ns.getPurchasedServers().length;
                ns.purchaseServer(host, ram);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXNlcnZlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYnV5LXNlcnZlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCO0FBRXJCLG1DQUFtQztBQUVuQyxTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVTtJQUNsQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtRQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFckksTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxPQUFPLE9BQU8sQ0FBQTtBQUNmLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTTtJQUNyRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUV4QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ25DLE9BQU87WUFDTixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztTQUNqQyxDQUFBO0lBQ0YsQ0FBQyxDQUFDLENBQUE7SUFFRixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXBCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDOUMsT0FBTztTQUNQO2FBQU0sSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFO1lBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7SUFDRixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDeEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDN0IsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztJQUNsRSxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBRS9HLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFO1FBQ2hELElBQUksTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLDhIQUE4SCxDQUFDLEVBQUU7WUFDcEosTUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsRUFBRSxFQUFFLFlBQVksR0FBRyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVoRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjtZQUNGLENBQUMsQ0FBQyxDQUFBO1lBRUYsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxFQUFFO2dCQUNwRCxJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hFLElBQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ3RELEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjthQUNEO1NBQ0Q7YUFBTTtZQUNOLE9BQU87U0FDUDtLQUNEO1NBQU07UUFDTixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sR0FBRyxVQUFVLEVBQUU7WUFDcEQsSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4RSxJQUFJLElBQUksR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUN0RCxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM3QjtTQUNEO0tBQ0Q7QUFDRixDQUFDIn0=