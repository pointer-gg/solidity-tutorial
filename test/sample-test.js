const { expect } = require('chai');

describe('Greeter', function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory('Greeter');

    const greeter = await Greeter.deploy('Hello, world!');

    await greeter.deployed();

    greeter.greet();
    expect(await greeter.greet()).to.equal('Hello, world!');
    console.log('got here');
    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
