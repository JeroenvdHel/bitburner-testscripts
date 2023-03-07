/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/** @param {import(".").NS } ns */
export async function main(ns) {
    let ram = 8;
    let servers = ns.getPurchasedServers();
    while (true) {
        for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
            let name = "pserv-" + i;
            while (ns.getPurchasedServerCost(ram) > ns.getServerMoneyAvailable("home")) {
                await ns.sleep(3000);
            }
            if (servers.includes(name)) {
                if (ns.getServerMaxRam(name) < ram) {
                    ns.killall(name);
                    ns.deleteServer(name);
                }
                else {
                    continue;
                }
            }
            ns.purchaseServer(name, ram);
        }
        ram *= 2;
        servers = ns.getPurchasedServers();
        await ns.sleep(1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyY2hhc2Utc2VydmVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wdXJjaGFzZS1zZXJ2ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBRWxDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUU7SUFDekIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFdkMsT0FBTyxJQUFJLEVBQUU7UUFDVCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUN4QixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtZQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtvQkFDaEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakIsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0gsU0FBUztpQkFDWjthQUNKO1lBQ0QsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDaEM7UUFFRCxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ1QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ25DLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QjtBQUNMLENBQUMifQ==