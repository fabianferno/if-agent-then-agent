import { ethers } from "hardhat";


async function main() {

    await deployOracle();
}


async function deployOracle(): Promise<string> {
    const oracle = await ethers.deployContract("ChatOracle", [], {});

    await oracle.waitForDeployment();

    console.log(
        `Oracle deployed to ${oracle.target}`
    );
    // only for local dev
    // await oracle.updateWhitelist((await ethers.getSigners())[0].address, true)

    return oracle.target as string;
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
