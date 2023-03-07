/** @param {import(".").NS } ns */
export async function main(ns, calc) {
	ns.tprint(ns.getPlayer().money);
	ns.tprint(`1024: ${ns.getPurchasedServerCost(1024)}`);
	ns.tprint(`2048: ${ns.getPurchasedServerCost(2048)}`);
	ns.tprint(`4096: ${ns.getPurchasedServerCost(4096)}`);
	ns.tprint(`8192: ${ns.getPurchasedServerCost(8192)}`);
	ns.tprint(`16384: ${ns.getPurchasedServerCost(16384)}`);
}