// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Keyboards {
  enum KeyboardKind { 
    SixtyPercent, 
    SeventyFivePercent, 
    EightyPercent, 
    Iso105 
  }

  struct Keyboard {
    KeyboardKind kind; 
    // ABS = false, PBT = true
    bool isPBT;
    // tailwind filters to layer over
    string filter;
    // user who created it! 
    address owner;
  }

  Keyboard[] public createdKeyboards;

  event KeyboardCreated(
    Keyboard keyboard
  );

  function create(
    KeyboardKind _kind,
    bool _isPBT,
    string calldata _filter
  ) external {
    Keyboard memory newKeyboard = Keyboard({
      kind: _kind,
      isPBT: _isPBT,
      filter: _filter,
      owner: msg.sender
    });

    createdKeyboards.push(newKeyboard);
    emit KeyboardCreated(newKeyboard);
  }

  function tip(address payable _owner) external payable  {
    _owner.transfer(msg.value);
  }

  function getKeyboards() view public returns (Keyboard[] memory) {
    return createdKeyboards;
  } 
}
