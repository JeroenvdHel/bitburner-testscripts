/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/** @param {import(".").NS } ns */
export async function main(ns) {
    let target = ns.args[0];
    ns.run("deployer.js", 1, target);
    // ns.run("purchase-servers.js", 1, target);
    ns.run("buy-servers.js", 25);
    ns.run("hacknet-upgrades,js", 25, 15);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGFydHVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBRWxDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUU7SUFDekIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QixFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakMsNENBQTRDO0lBQzVDLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsQ0FBQyJ9