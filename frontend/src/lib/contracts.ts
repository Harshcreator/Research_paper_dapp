import ProjectFactory from "./abis/projectFactory.json";
import Project from "./abis/project.json";
import Users from "./abis/users.json";

export const PROJECT_FACTORY_CONTRACT_ABI = ProjectFactory.abi;
export const PROJECT_FACTORY_CONTRACT_ADDRESS =
  "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

export const USERS_CONTRACT_ADDRESS =
  "0xA15BB66138824a1c7167f5E85b957d04Dd34E468";
export const USERS_CONTRACT_ABI = Users.abi;

export const PROJECT_ABI = Project.abi;