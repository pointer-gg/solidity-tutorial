async function main() {
  const provider = hre.ethers.getDefaultProvider()
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn.wait();

  const tipTxn = await keyboardsContract.connect(somebodyElse).tip(0, {value: hre.ethers.utils.parseEther("1")})
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
