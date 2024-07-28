import { ethers } from "ethers";
import Database from "../../blockchain/artifacts/contracts/Database.sol/Database.json" assert { type: "json" };

const contractAddress = "0x80bff3474C93c1eA07081cEF6bb87Bc1626ae949";
const rpcUrl = "https://rpc-amoy.polygon.technology/";

function getProvider() {
  return new ethers.providers.JsonRpcProvider(rpcUrl);
}

async function getContract() {
  const provider = getProvider();
  return new ethers.Contract(contractAddress, Database.abi, provider);
}

export async function getAllMembers() {
  const contract = await getContract();
  const members = await contract.getAllMembers();
  console.log(members);
  return members.map((member) => ({
    walletAddress: member.walletAddress,
    name: member.name,
    regno: member.regno,
    enrollmentTime: timeConverter(member.enrollmentTime.toNumber()),
  }));
}

export async function isEnrolled(address) {
  const contract = await getContract();
  return await contract.isEnrolled(address);
}

export async function enrollMember(_name, _email, _phone, _regno, _msg) {
  const contract = await getContract();
  const enrollWithUs = await contract.enroll(
    _name,
    _email,
    _phone,
    _regno,
    _msg
  );
  if (enrollWithUs) {
    alert("Congrats!! you are a part of DAO now");
  } else {
    alert("sorry we couldn't register you; try again.");
  }
}

export async function updateMemInfo(_name, _email, _phoneNumber, _msg) {
  const contract = await getContract();
  const modifyInfo = await contract.enroll(_name, _email, _phone, _msg);
  if (modifyInfo) {
    alert("Modified Successfull");
  } else {
    alert("Could Not Modify the Data");
  }
}

export async function adminUpdatememInfoFunction(
  _member,
  _name,
  _email,
  _phoneNumber,
  _msg
) {
  const contract = await getContract();
  const modifyInfoAdmin = await contract.adminUpdateMemberInfo(
    _member,
    _name,
    _email,
    _phoneNumber,
    _msg
  );
  if (modifyInfoAdmin) {
    alert("Modified successfully");
  } else {
    alert("Could Not Modify the Data");
  }
}

export async function removeMemberFunction(_address) {
  const contract = await getContract();
  const removeMem = await contract.removeMember(_address);
  if (removeMem) {
    alert("member removed");
  } else {
    alert("could not remove member");
  }
}

export async function deactivateMemFunction(_member) {
  const contract = await getContract();
  const deactivateMem = await contract.deactivateMember(_member);
  if (deactivateMem) {
    alert("Member deactivated");
  } else {
    alert("Could Not deactivate Member");
  }
}

export async function reactivateMemFunction(_member) {
  const contract = await getContract();
  const reactivateMem = await contract.reactivateMember(_member);
  if (reactivateMem) {
    alert("Member Reactivated");
  } else {
    alert("Could Not Reactivate Member");
  }
}

export async function addAdmin(_newAdmin) {
  const contract = await getContract();
  const addAdmin = await contract.addAdmin(_newAdmin);
  if (addAdmin) {
    alert("admin added");
  } else {
    alert("could not add admin");
  }
}

export async function removeAdmin(_newAdmin) {
  const contract = await getContract();
  const removeAdmin = await contract.removeAdmin(_newAdmin);
  if (removeAdmin) {
    alert("admin removed");
  } else {
    alert("could not remove admin");
  }
}

export async function getMemberInfo(_member) {
  const contract = await getContract();
  const getMemberInfo = contract.getMemberInfo(_member);
  if (getMemberInfo) {
    return getMemberInfo;
  } else {
    alert("Can Not display member details");
  }
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time =
    date +
    " " +
    month +
    " " +
    year +
    " - " +
    hour.substr(-2) +
    ":" +
    min.substr(-2) +
    ":" +
    sec.substr(-2);
  return time;
}
