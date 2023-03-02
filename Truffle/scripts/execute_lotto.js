const Lottery = artifacts.require("Lottery");

module.exports = async function (callback) {
    const MAX = 5;
    const accounts = await web3.eth.getAccounts();
    const _instanceLottery = await Lottery.deployed();

    const currentLottery = await _instanceLottery.lotteryId.call();
    const fee = await _instanceLottery.fee.call();
    const lotteryAttributesBefore = await _instanceLottery.getLotteryStatus(currentLottery);

    console.log("Current lottery ", currentLottery.toString());
    console.log("Fee ", fee.toString());
    console.log("Lottery attributes ", lotteryAttributesBefore);
    for (let i = 0; i < MAX; i++) {
        console.log("Buying ticket with user ", accounts[i]);
        await _instanceLottery.buyTicket({ from: accounts[i], value: lotteryAttributesBefore["ticketPrice"] });
        console.log("Done");
    }
    
    console.log("Finalizing lottery");
    await _instanceLottery.finalizeLottery({ from: accounts[0] });
    console.log("Done");
    
    let lotteryAttributesFinished = await _instanceLottery.getLotteryStatus(currentLottery);
    while (lotteryAttributesFinished["winner"] === "0x0000000000000000000000000000000000000000") {
        lotteryAttributesFinished = await _instanceLottery.getLotteryStatus(currentLottery);
        console.log("Winner", lotteryAttributesFinished["winner"]);
    }

    console.log("Claming winner");
    await _instanceLottery.claim(currentLottery.toString(), { from: lotteryAttributesFinished["winner"] });
    console.log("Done");
    const lotteryAttributesClaimed = await _instanceLottery.getLotteryStatus(currentLottery);
    console.log("Lottery status after claim", lotteryAttributesClaimed);

    callback();
}