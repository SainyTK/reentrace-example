import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const EtherStore = await ethers.getContractFactory("EtherStore");
  const etherStore = await EtherStore.deploy();

  const [A, B] = await ethers.getSigners();

  const amountA = parseEther("1");
  const amountB = parseEther("2");

  await etherStore.connect(A).deposit({ value: amountA });
  await etherStore.connect(B).deposit({ value: amountB });

  console.log(
    "Balance of A: ",
    await A.provider?.getBalance(A.address).then((res) => formatEther(res))
  );
  console.log(
    "Balance of B: ",
    await A.provider?.getBalance(B.address).then((res) => formatEther(res))
  );

  console.log(
    "Contract Balances: ",
    await etherStore.getBalance().then((res) => formatEther(res))
  );

  await etherStore.connect(A).withdraw();

  console.log(
    "Contract Balances: ",
    await etherStore.getBalance().then((res) => formatEther(res))
  );

  console.log(
    "Balance of A: ",
    await A.provider?.getBalance(A.address).then((res) => formatEther(res))
  );
  console.log(
    "Balance of B: ",
    await A.provider?.getBalance(B.address).then((res) => formatEther(res))
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
