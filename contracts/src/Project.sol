// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Utils.sol";

contract Project {
    struct Mentor {
        address _address;
        string _name;
    }

    struct Progress {
        string content;
        uint256 timestamp;
    }

    string public name;
    string public paperUri;
    string public topic;

    address public immutable owner;

    mapping(uint256 => string) public feedbacks;
    uint256 totalFeedbacks;

    mapping(uint256 => Mentor) public mentors;
    uint256 totalMentors;

    mapping(uint256 => Progress) public progressReports;
    uint256 totalReports;

    event FundingReceived(uint256 amount, address indexed funder);
    event AmountWithdrawn(uint256 amount);
    event MentorAdded(address indexed);

    constructor(string memory _name, string memory _paperUri, string memory _topic, address _owner) {
        name = _name;
        paperUri = _paperUri;
        owner = _owner;
        topic = _topic;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can withdraw");
        _;
    }

    modifier sufficientBalance(uint256 _amount) {
        require(address(this).balance >= _amount, "Insufficient balance");
        _;
    }

    receive() external payable {}

    fallback() external payable {}

    function fund() external payable {
        require(msg.value > 0, "Value must be more than 0");
        (bool sent,) = (payable(address(this))).call{value: msg.value}("");
        require(sent, "Failed to send funds");
        emit FundingReceived(msg.value, msg.sender);
    }

    function addMentor(string calldata mentorName, address mentorAddress) external payable {
        require(msg.value > Utils.MIN_FEE_FOR_MENTOR, "Value must be more than 0");
        // send value to contract
        (bool sentAmount,) = payable(address(this)).call{value: msg.value - Utils.MIN_FEE_FOR_MENTOR}("");
        require(sentAmount, "Transactions Failed");

        // send value to relayer
        (bool sentFee,) = payable(Utils.RELAYER).call{value: Utils.MIN_FEE_FOR_MENTOR}("");
        require(sentFee, "Transactions Failed");

        Mentor memory mentor = Mentor(mentorAddress, mentorName);
        mentors[totalMentors++] = mentor;

        emit MentorAdded(mentorAddress);
    }

    function withdrawAmount(uint256 amount) external onlyOwner sufficientBalance(amount) {
        (bool sent,) = payable(owner).call{value: amount}("");
        require(sent, "Withdraw Failed");
        emit AmountWithdrawn(amount);
    }

    // TODO: make meta transaction
    function addFeedback(string memory feedback) public {
        unchecked {
            feedbacks[totalFeedbacks++] = feedback;
        }
    }

    // TODO: make meta transaction
    function addProgress(string memory content) public {
        unchecked {
            progressReports[totalReports++] = Progress(content, block.timestamp);
        }
    }

    function getAllMentors() external view returns (Mentor[] memory) {
        Mentor[] memory _m = new Mentor[](totalMentors);

        uint256 _total = totalMentors;
        for (uint256 i = 0; i < _total;) {
            unchecked {
                _m[i] = mentors[i];
                ++i;
            }
        }

        return _m;
    }
}
