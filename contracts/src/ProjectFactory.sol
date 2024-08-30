// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Project.sol";

contract ProjectFactory {
    mapping(uint256 => address) projects;
    uint256 public totalProjects;

    event ProjectCreated(address indexed);

    function createProject(string memory name, string memory paperUri, string memory topic) external {
        address newProject = address(new Project(name, paperUri, topic, msg.sender));
        projects[totalProjects++] = newProject;
        emit ProjectCreated(newProject);
    }

    function getAllProjects() external view returns (address[] memory) {
        address[] memory allProjects = new address[](totalProjects);
        uint256 _total = totalProjects;
        for (uint256 i = 0; i < _total;) {
            unchecked {
                allProjects[i] = projects[i];
                ++i;
            }
        }
        return allProjects;
    }
}
