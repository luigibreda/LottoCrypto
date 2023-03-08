const Lottery = artifacts.require("Lottery");

let _subscriptionId = "";
let _coordinatorId = "";
let _keyHash = "";
const _name = "Lotto Crypto";
const _ticketPrice = "1000000000000000" // 0,001 ETH
const _fee = "10" // 10%
const _minTicket = "5"

module.exports = async function (deployer, _network, accounts) {

    switch (_network) {
        case "matic": {
            _subscriptionId = "2331";
            _coordinatorId = "0xAE975071Be8F8eE67addBC1A82488F1C24858067";
            _keyHash = "0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93";
            break;
        }
        case "mumbai": {
            _subscriptionId = "3262";
            _coordinatorId = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
            _keyHash = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
            break;
        }
        default: {
            _subscriptionId = "2331";
            _coordinatorId = "0xAE975071Be8F8eE67addBC1A82488F1C24858067";
            _keyHash = "0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93";
            break;
        }
    }

    await deployer.deploy(Lottery,
        _subscriptionId,
        _coordinatorId,
        _keyHash,
        _name,
        _ticketPrice,
        _minTicket,
        _fee,
    );
};