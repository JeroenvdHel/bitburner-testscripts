export async function main(ns) {
    let delayTime = ns.args[0] || 1000;
    let thresholdMultiplier = ns.args[1] || 1; //Bigger threshold, the less it spends
    while (true) {
        let ownedNodes = ns.hacknet.numNodes();
        let minValue = ns.hacknet.getPurchaseNodeCost();
        let nodeIndex = ownedNodes;
        let upgradeType = -1; //-1 -> purchase, 0 -> level, 1 -> ram, 2 -> core
        for (let i = 0; i < ownedNodes; i++) {
            let upgrades = [
                ns.hacknet.getLevelUpgradeCost(i, 1),
                ns.hacknet.getRamUpgradeCost(i, 1),
                ns.hacknet.getCoreUpgradeCost(i, 1)
            ];
            let value = Math.min.apply(Math, upgrades);
            if (value < minValue) {
                minValue = value;
                nodeIndex = i;
                upgradeType = upgrades.indexOf(value);
            }
        }
        await waitForMoney(ns, minValue, delayTime, thresholdMultiplier);
        switch (upgradeType) {
            case -1:
                ns.hacknet.purchaseNode();
                break;
            case 0:
                ns.hacknet.upgradeLevel(nodeIndex, 1);
                break;
            case 1:
                ns.hacknet.upgradeRam(nodeIndex, 1);
                break;
            case 2:
                ns.hacknet.upgradeCore(nodeIndex, 1);
                break;
        }
        await ns.sleep(1);
    }
}
async function waitForMoney(ns, targetMoney, delayTime, thresholdMultiplier) {
    while (ns.getPlayer().money / thresholdMultiplier < targetMoney) {
        await ns.sleep(delayTime);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja25ldC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hhY2tuZXQtbWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFO0lBQzVCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ25DLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7SUFFakYsT0FBTyxJQUFJLEVBQUU7UUFDWixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNoRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7UUFFdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLFFBQVEsR0FBRztnQkFDZCxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25DLENBQUM7WUFFRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0MsSUFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFO2dCQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNqQixTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Q7UUFFRCxNQUFNLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pFLFFBQVEsV0FBVyxFQUFFO1lBQ3BCLEtBQUssQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzFCLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07U0FDUDtRQUVELE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtBQUNGLENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG1CQUFtQjtJQUMxRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLEdBQUcsV0FBVyxFQUFFO1FBQ2hFLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQjtBQUNGLENBQUMifQ==