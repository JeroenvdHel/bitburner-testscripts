// import { NS } from "@ns";
import { FileHandler } from "/utils/file-handler";
const filename = "/databases/serverlist.txt";
const script = "early-hack-template.js";
const target = "joesguns";
/** @param { NS } ns **/
export async function main(ns) {
    const IGNORE = ["home", "darkweb"];
    let fileHandler = new FileHandler(ns, filename);
    let serverList = await fileHandler.read();
    // ns.tprint(serverList);
    for (let server of serverList) {
        const threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ns.getScriptRam(script));
        ns.tprintf("Loop %s:", server);
        ns.tprint(threads);
        if (threads > 0) {
            ns.tprint(`Launching script '${script}' on server '${server}' with ${threads} threads and the following arguments: ${target}`);
            await ns.scp(script, ns.getHostname(), server);
            ns.exec(script, server, threads, target);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFjay1tYW5hZ2VyMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oYWNrLW1hbmFnZXIxLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRCQUE0QjtBQUM1QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEQsTUFBTSxRQUFRLEdBQUcsMkJBQTJCLENBQUM7QUFDN0MsTUFBTSxNQUFNLEdBQUcsd0JBQXdCLENBQUM7QUFDeEMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBRzFCLHdCQUF3QjtBQUN4QixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFO0lBQzVCLE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxJQUFJLFVBQVUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQyx5QkFBeUI7SUFDekIsS0FBSyxJQUFJLE1BQU0sSUFBSSxVQUFVLEVBQUU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pILEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLE1BQU0sZ0JBQWdCLE1BQU0sVUFBVSxPQUFPLHlDQUF5QyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQy9ILE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekM7S0FDRDtBQUNGLENBQUMifQ==