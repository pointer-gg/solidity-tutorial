async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);

  const Token = await ethers.getContractFactory("Keyboards");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Contract address: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  });