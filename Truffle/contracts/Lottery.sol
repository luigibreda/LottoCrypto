// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./VRFV2Consumer.sol";

contract Lottery is
    Ownable,
    ReentrancyGuard,
    VRFV2Consumer,
    AutomationCompatibleInterface
{
    using Counters for Counters.Counter;

    struct User {
        bool hasTicket;
        bool claimed;
        uint256[] tickets;
    }

    struct LotteryStruct {
        string name;
        uint256 ticketPrice;
        Counters.Counter ticketsCount;
        uint256 balance;
        bool finalized;
        uint256 indexChainLink;
        address winner;
        bool claimed;
        uint32 minTicket;
        bool finishTrigger;
        uint256 timeToFinish;
    }

    mapping(uint256 => mapping(address => User)) ticketOwners;
    mapping(uint256 => mapping(uint256 => address)) tickets;
    mapping(uint256 => LotteryStruct) lottery;

    Counters.Counter public lotteryId;
    uint256 public fee;
    uint256 public configFinishTime;

    event TicketBought(
        address indexed buyer,
        uint256 price,
        uint256 ticketNumber
    );
    event LotteryFinalized(
        address owner,
        uint256 totalValue,
        uint256 ticketAmount
    );
    event ClaimedPrize(address indexed winner, uint256 totalPrize, uint256 fee);
    event ChangedProperties(
        address indexed owner,
        string name,
        uint256 ticketPrize,
        uint256 fee
    );

    constructor(
        uint64 _subscriptionId,
        address _cordinatorAddress,
        bytes32 _keyHash,
        string memory _name,
        uint256 _ticketPrice,
        uint256 _fee
    ) VRFV2Consumer(_subscriptionId, _cordinatorAddress, _keyHash) {
        uint256 currentLottery = lotteryId.current();
        lottery[currentLottery].name = _name;
        lottery[currentLottery].ticketPrice = _ticketPrice;

        fee = _fee;
        configFinishTime = 1 days;
    }

    function buyTicket() external payable nonReentrant {
        uint256 currentLottery = lotteryId.current();
        require(
            !lottery[currentLottery].finalized,
            "This lottery has already finalized, wait for results!"
        );
        require(
            lottery[currentLottery].ticketPrice == msg.value,
            "You need to pay the exactly ticket price."
        );

        uint256 currentLotteryPosition = lottery[currentLottery]
            .ticketsCount
            .current();
        lottery[currentLottery].ticketsCount.increment();

        ticketOwners[currentLottery][msg.sender].hasTicket = true;
        ticketOwners[currentLottery][msg.sender].claimed = false;
        ticketOwners[currentLottery][msg.sender].tickets.push(
            currentLotteryPosition
        );

        tickets[currentLottery][currentLotteryPosition] = msg.sender;
        lottery[currentLottery].balance += msg.value;

        uint256 nextLotteryPosition = lottery[currentLottery]
            .ticketsCount
            .current();

        if (
            !lottery[currentLottery].finishTrigger &&
            nextLotteryPosition >= lottery[currentLottery].minTicket
        ) {
            lottery[currentLottery].finishTrigger = true;
            lottery[currentLottery].timeToFinish =
                block.timestamp +
                configFinishTime;
        }

        emit TicketBought(msg.sender, msg.value, currentLottery);
    }

    function finalizeLottery() private {
        uint256 currentLottery = lotteryId.current();
        uint256 currentLotteryPosition = lottery[currentLottery]
            .ticketsCount
            .current();

        require(
            lottery[currentLottery].minTicket > currentLotteryPosition,
            "It Didnt reach min tickets yet."
        );

        require(
            !lottery[currentLottery].finalized,
            "Lottery already finalized."
        );

        lottery[currentLottery].finalized = true;
        lottery[currentLottery].indexChainLink = requestRandomWords(1);
        emit LotteryFinalized(
            msg.sender,
            lottery[currentLottery].balance,
            lottery[currentLottery].ticketsCount.current()
        );
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        super.fulfillRandomWords(_requestId, _randomWords);
        uint256 currentLottery = lotteryId.current();
        uint256 currentLotteryPosition = lottery[currentLottery]
            .ticketsCount
            .current();
        if (_requestId == lottery[currentLottery].indexChainLink) {
            lottery[currentLottery].winner = tickets[currentLottery][
                _randomWords[0] % currentLotteryPosition
            ];
            resetLottery();
        }
    }

    function claim(uint256 lotteryIndex) external nonReentrant {
        require(
            !lottery[lotteryIndex].claimed,
            "The winner already claimed its prize."
        );
        require(
            lottery[lotteryIndex].finalized,
            "This lottery isn't finalized yet."
        );
        require(
            lottery[lotteryIndex].winner != address(0),
            "This lottery didn't get a winner yet."
        );
        require(
            lottery[lotteryIndex].winner == msg.sender,
            "You're not the winner."
        );
        require(
            ticketOwners[lotteryIndex][msg.sender].hasTicket,
            "You dont have any ticket to claim here."
        );
        require(
            !ticketOwners[lotteryIndex][msg.sender].claimed,
            "You have alread claimed your prize."
        );
        lottery[lotteryIndex].claimed = true;
        ticketOwners[lotteryIndex][msg.sender].hasTicket = false;
        ticketOwners[lotteryIndex][msg.sender].claimed = true;

        uint256 _feeAmount = _calcFee(lottery[lotteryIndex].balance);
        uint256 prize = lottery[lotteryIndex].balance - _feeAmount;

        payable(owner()).transfer(_feeAmount);
        payable(msg.sender).transfer(prize);
        emit ClaimedPrize(msg.sender, prize, _feeAmount);
    }

    function resetLottery() private returns (bool) {
        // Change the pointer to the next position.
        uint256 currentLottery = lotteryId.current();
        lotteryId.increment();
        uint256 nextLottery = lotteryId.current();

        // Get last lottery price and name to set the next one.
        lottery[nextLottery].name = lottery[currentLottery].name;
        lottery[nextLottery].ticketPrice = lottery[currentLottery].ticketPrice;

        return true;
    }

    function _calcFee(uint256 amount) private view returns (uint256) {
        return (amount * fee) / 100;
    }

    function setProperties(
        string memory _name,
        uint256 _ticketPrice,
        uint256 _fee
    ) external onlyOwner {
        uint256 currentLottery = lotteryId.current();
        lottery[currentLottery].name = _name;
        lottery[currentLottery].ticketPrice = _ticketPrice;
        fee = _fee;

        emit ChangedProperties(msg.sender, _name, _ticketPrice, _fee);
    }

    function getLotteryStatus(uint256 _lotteryId)
        public
        view
        returns (LotteryStruct memory _lottery)
    {
        return lottery[_lotteryId];
    }

    function getUserStatus(uint256 _lotteryId, address _user)
        public
        view
        returns (User memory _returnedUser)
    {
        return ticketOwners[_lotteryId][_user];
    }

    // Only if we have some problem to use this
    function getAllBalance() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        uint256 currentLottery = lotteryId.current();
        upkeepNeeded = (lottery[currentLottery].finishTrigger &&
            block.timestamp > lottery[currentLottery].timeToFinish);
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        uint256 currentLottery = lotteryId.current();
        
        require(
            (lottery[currentLottery].finishTrigger &&
                block.timestamp > lottery[currentLottery].timeToFinish),
            "Not read yet"
        );
        finalizeLottery();
    }
}
