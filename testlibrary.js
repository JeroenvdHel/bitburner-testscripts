/** @param {import(".").NS } ns */
export function showServerData(ns, name) {
    let server = ns.getServer(name);
    ns.tprint(server);
}