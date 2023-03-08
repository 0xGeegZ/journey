import spookyswap_abi from "../abi/spookyswap.json";
import beethoven_abi from "../abi/beethoven.json";
import beethoven_abi2 from "../abi/beethoven2.json";
import beethoven_abi3 from "../abi/beethoven3.json";
import yearn_abi from "../abi/yearn.json";
import geist_abi from "../abi/geist.json";
import abiDecoder from "abi-decoder";
import InputDecoder from "ethereum-input-data-decoder";

export function verifyTransaction(
  questId: string,
  step: number,
  transaction: any,
  startedAt: number
): boolean {
  switch (questId) {
    case "1":
      switch (step) {
        case 0: {
          abiDecoder.addABI(spookyswap_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x31f63a33141ffee63d4b26755430a390acdd8a4d")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (transaction.functionName !== "multicall(bytes[] data)")
            return false;

          const decodedData = abiDecoder.decodeMethod(transaction.input);

          const decodedParamsValue = abiDecoder.decodeMethod(
            decodedData.params[0].value[0]
          );

          if (decodedParamsValue.name !== "swapExactETHForTokens") return false;

          const pathValues = decodedParamsValue.params[1].value;
          if (
            pathValues[pathValues.length - 1] !==
            "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"
          )
            return false;

          console.log("verified!");
          return true;
        }
        case 1: {
          abiDecoder.addABI(spookyswap_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x31f63a33141ffee63d4b26755430a390acdd8a4d")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (transaction.functionName !== "multicall(bytes[] data)")
            return false;

          const decodedData = abiDecoder.decodeMethod(transaction.input);

          if (decodedData.params[0].value.length < 2) return false;

          const decodedParamsValue = abiDecoder.decodeMethod(
            decodedData.params[0].value[1]
          );

          if (decodedParamsValue.name !== "addLiquidityETH") return false;

          if (
            decodedParamsValue.params[0].value !==
            "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"
          )
            return false;

          console.log("verified 2!");
          return true;
        }
        case 2: {
          abiDecoder.addABI(spookyswap_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x31f63a33141ffee63d4b26755430a390acdd8a4d")
            return false;

          if (transaction.functionName !== "multicall(bytes[] data)")
            return false;

          const decodedData = abiDecoder.decodeMethod(transaction.input);

          if (decodedData.params[0].value.length < 2) return false;

          const decodedParamsValue = abiDecoder.decodeMethod(
            decodedData.params[0].value[1]
          );

          if (decodedParamsValue.name !== "deposit") return false;

          if (decodedParamsValue.params[0].value !== "0") return false;

          console.log("verified 3!");
          return true;
        }
      }
    case "2":
      if (transaction.timestamp * 1000 < startedAt) return false;

      if (transaction.to !== "0xb458bfc855ab504a8a327720fcef98886065529b")
        return false;

      if (Number(transaction.value) < 1000000000000000000 - 0.01) return false;

      if (transaction.functionName !== "deposit()") return false;

      console.log("verified!");
      return true;
    case "3":
      switch (step) {
        case 0: {
          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (transaction.functionName !== "deposit()") return false;

          console.log("verified!");
          return true;
        }
        case 1: {
          const decoder = new InputDecoder(beethoven_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x20dd72ed959b6147912c2e529f0a0c651c33c9ce")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (
            transaction.functionName !==
            "batchSwap(uint8 kind, tuple[] swaps, address[] assets, tuple funds, int256[] limits, uint256 deadline)"
          )
            return false;

          const decodedData = decoder.decodeData(transaction.input);

          if (!decodedData || decodedData.inputs.length < 3) return false;
          if (
            decodedData.inputs[2][2] !==
            "0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e"
          )
            return false;

          console.log("verified!");
          return true;
        }
        case 2: {
          const decoder = new InputDecoder(beethoven_abi2);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x419f7925b8c9e409b6ee8792242556fa210a7a09")
            return false;

          if (transaction.functionName !== "multicall(bytes[] data)")
            return false;

          const decodedData = decoder.decodeData(transaction.input);

          const decoder2 = new InputDecoder(beethoven_abi3);

          const decodedData2 = decoder2.decodeData(decodedData.inputs[0][0]);

          if (decodedData2.method !== "joinPool") return false;

          if (
            decodedData2.inputs[4][0][0] !==
            "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          )
            return false;

          if (
            decodedData2.inputs[4][0][1] !==
            "0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e"
          )
            return false;

          console.log("verified!");
          return true;
        }
      }
    case "4":
      switch (step) {
        case 0: {
          const decoder = new InputDecoder(spookyswap_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x31f63a33141ffee63d4b26755430a390acdd8a4d")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (transaction.functionName !== "multicall(bytes[] data)")
            return false;

          const decodedData = decoder.decodeData(transaction.input);

          if (
            !decodedData.inputs ||
            !(decodedData.inputs.length > 0) ||
            !(decodedData.inputs[0].length > 0)
          )
            return false;

          const decodedParamsValue = decoder.decodeData(
            decodedData.inputs[0][0]
          );

          console.log(JSON.stringify(decodedParamsValue, null, 2));
          if (decodedParamsValue.method !== "swapExactETHForTokens")
            return false;

          if (
            decodedParamsValue.inputs[1][1] !==
            "04068DA6C83AFCFA0e13ba15A6696662335D5B75"
          )
            return false;

          console.log("verified!");
          return true;
        }
        case 1: {
          const decoder = new InputDecoder(yearn_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x086865b2983320b36c42e48086dadc786c9ac73b")
            return false;

          if (
            transaction.functionName !==
            "deposit(address _asset, address _from, uint256 _amount)"
          )
            return false;

          const decodedData = decoder.decodeData(transaction.input);

          if (decodedData.method !== "deposit") return false;

          if (
            decodedData.inputs[0] !== "EF0210eB96c7EB36AF8ed1c20306462764935607"
          )
            return false;

          console.log("verified!");
          return true;
        }
      }
    case "5":
      switch (step) {
        case 0: {
          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x47102245fea0f8d35a6b28e54505e9ffd83d0704")
            return false;

          if (Number(transaction.value) < 1000000000000000000 - 0.01)
            return false;

          if (
            transaction.functionName !==
            "depositETH(address lendingPool, address onBehalfOf, uint16 referralCode)"
          )
            return false;

          console.log("verified!");
          return true;
        }
        case 1: {
          const decoder = new InputDecoder(geist_abi);

          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0x9fad24f572045c7869117160a571b2e50b10d068")
            return false;

          if (
            transaction.functionName !==
            "borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)"
          )
            return false;

          const decodedData = decoder.decodeData(transaction.input);

          if (decodedData.method !== "borrow") return false;

          if (
            decodedData.inputs[0] !== "04068DA6C83AFCFA0e13ba15A6696662335D5B75"
          )
            return false;

          console.log("verified!");
          return true;
        }
      }
    case "6":
      switch (step) {
        case 0: {
          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0xf3df7b6dccc267393784a3876d0cbcbdc73147d4")
            return false;

          console.log("verified!");
          return true;
        }
        case 1: {
          if (transaction.timestamp * 1000 < startedAt) return false;

          if (transaction.to !== "0xd19eb6f25de99a993a73a3931c94cf3b299bee03")
            return false;

          if (
            transaction.functionName !==
            "mint(address _creator, address _to, uint256 _amount, string _uri, uint16 _royalty, bool _isNSFW, bool _payingInBrush, address[] _path)"
          )
            return false;

          console.log("verified!");
          return true;
        }
      }
  }
  return false;
}
