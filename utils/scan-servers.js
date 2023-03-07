/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/** @param {NS} ns **/
import { FileHandler } from "/data/file-handler";
/** @param {NS} ns **/
function findChildNodes(ns, servername) {
    let childs = ns.scan(servername);
    let childsList = [];
    for (let child of childs) {
        let chObj = { name: child, parent: servername };
        childsList.push(chObj);
    }
    return childsList;
}
/** @param {NS} ns **/
export async function main(ns) {
    if (ns.args.length < 1) {
        ns.tprint("No arguments");
        return;
    }
    let baseserver = ns.args[0];
    let filename = "/data/servers.txt";
    let fileHandler = new FileHandler(ns, filename);
    let serverMap = [{ name: "home", parent: "/" }];
    for (let node of serverMap) {
        ns.tprintf("Scanning server '%s'", node.name);
        if (serverMap.indexOf(node) === -1) {
            let childsArr = findChildNodes(ns, baseserver);
            // To be continued
            for (let child of childsArr) {
                if (serverMap.indexOf(child) === -1) {
                    serverMap.push(child);
                }
            }
        }
    }
    ns.tprint(serverMap);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi1zZXJ2ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3NjYW4tc2VydmVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLHNCQUFzQjtBQUV0QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHakQsc0JBQXNCO0FBQ3RCLFNBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRSxVQUFVO0lBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXBCLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQ3pCLElBQUksS0FBSyxHQUFHLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUMsVUFBVSxFQUFDLENBQUM7UUFDNUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUM7QUFFRCxzQkFBc0I7QUFDdEIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBRTtJQUM1QixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2QixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFCLE9BQU87S0FDUDtJQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELElBQUksU0FBUyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBSTVDLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRTdDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNuQyxJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLGtCQUFrQjtZQUNsQixLQUFLLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDO29CQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNEO1NBQ0Q7S0FFRDtJQUVELEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7QUFFckIsQ0FBQyJ9