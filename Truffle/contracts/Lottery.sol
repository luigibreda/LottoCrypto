// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./VRFV2Consumer.sol";

contract Lottery is Ownable, VRFV2Consumer, ReentrancyGuard {
    using Counters for Counters.Counter;

    struct User {
        bool hasTicket;
        bool claimed;
    }

    // TODO: pegar a estrutura daqui e por na tela
    struct LotteryStruct {
        string name;
        uint256 ticketPrice;
        Counters.Counter ticketsCount;
        uint256 balance;
        bool finalized;
        uint256 indexChainLink; // nao
        address winner;
        bool claimed; // nao
    }
    // exibir nossa taxa

    mapping(uint256 => mapping(address => User)) ticketOwners;
    mapping(uint256 => mapping(uint256 => address)) tickets;

    Counters.Counter private lotteryId;
    LotteryStruct public lottery;
    uint256 public fee;

    event TicketBought(address indexed buyer, uint256 price, uint256 ticketNumber);
    event LotteryFinalized(address owner, uint256 totalValue, uint256 ticketAmount);
    event ClaimedPrize(address indexed winner, uint256 totalPrize, uint256 fee);
    event ChangedProperties(address indexed owner, string name, uint256 ticketPrize, uint256 fee);

    constructor(
        uint64 _subscriptionId,
        address _cordinatorAddress,
        bytes32 _keyHash,
        string memory _name,
        uint256 _ticketPrice,
        uint256 _fee
    ) VRFV2Consumer(_subscriptionId, _cordinatorAddress, _keyHash) {
        lottery.name = _name;
        lottery.ticketPrice = _ticketPrice;
        fee = _fee;
    }

    function buyTicket() external payable nonReentrant {
        require(
            !lottery.finalized,
            "This lottery has already finalized, wait for results!"
        );
        require(
            lottery.ticketPrice == msg.value,
            "You need to pay the exactly ticket price."
        );
        require(
            !ticketOwners[lotteryId.current()][msg.sender].hasTicket,
            "This address already buy a ticket."
        );

        uint256 currentLottery = lotteryId.current();
        uint256 currentLotteryPosition = lottery.ticketsCount.current();
        lottery.ticketsCount.increment();

        ticketOwners[currentLottery][msg.sender].hasTicket = true;
        ticketOwners[currentLottery][msg.sender].claimed = false;
        tickets[currentLottery][currentLotteryPosition] = msg.sender;

        lottery.balance += msg.value;

        emit TicketBought(msg.sender, msg.value, currentLottery);
    }

    function finalizeLottery() external onlyOwner {
        require(!lottery.finalized, "Lottery already finalized.");
        lottery.finalized = true;

        lottery.indexChainLink = requestRandomWords(1);
        emit LotteryFinalized(msg.sender, lottery.balance, lottery.ticketsCount.current());
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        super.fulfillRandomWords(_requestId, _randomWords);
        uint256 currentLottery = lotteryId.current();
        uint256 currentLotteryPosition = lottery.ticketsCount.current();
        if (_requestId == lottery.indexChainLink) {
            lottery.winner = tickets[currentLottery][
                _randomWords[0] % currentLotteryPosition
            ];
        }
    }

    function claim() external nonReentrant {
        require(!lottery.claimed, "The winner already claimed its prize.");
        require(lottery.finalized, "This lottery isn't finalized yet.");
        require(
            lottery.winner != address(0),
            "This lottery didn't get a winner yet."
        );

        uint256 currentLottery = lotteryId.current();

        require(
            ticketOwners[currentLottery][msg.sender].hasTicket,
            "You dont have any ticket to claim here."
        );
        require(
            !ticketOwners[currentLottery][msg.sender].claimed,
            "You have alread claimed your prize."
        );
        require(lottery.winner == msg.sender, "You're not the winner.");
        lottery.claimed = true;
        ticketOwners[currentLottery][msg.sender].hasTicket = false;
        ticketOwners[currentLottery][msg.sender].claimed = true;

        uint256 _feeAmount = _calcFee(lottery.balance);
        uint256 prize = lottery.balance - _feeAmount;

        require(resetLottery(), "Lottery needs to be reseted.");

        payable(owner()).transfer(_feeAmount);
        payable(msg.sender).transfer(prize);
        emit ClaimedPrize(msg.sender, prize, _feeAmount);
    }

    function resetLottery() private returns (bool) {
        // Change the pointer to the next position.
        lotteryId.increment();

        // clean up variables
        lottery.balance = 0;
        lottery.claimed = false;
        lottery.finalized = false;
        lottery.indexChainLink = 0;
        lottery.winner = address(0);
        
        lottery.ticketsCount.reset();

        return true;       
    }

    function _calcFee(uint256 amount) private view returns (uint256) {
        return (amount * fee) / 100;
    }

    function setProperties(string memory _name, uint256 _ticketPrice, uint256 _fee)
        external
        onlyOwner
    {
        lottery.name = _name;
        lottery.ticketPrice = _ticketPrice;
        fee = _fee;

        emit ChangedProperties(msg.sender, _name, _ticketPrice, _fee);
    }

    // Only if we have some problem to use this 
    function getAllBalance() external onlyOwner {
       payable(msg.sender).transfer(address(this).balance);
    }
}
