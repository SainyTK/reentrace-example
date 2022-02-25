//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IEtherStore {
    function deposit() external payable;
    function withdraw() external;
}
