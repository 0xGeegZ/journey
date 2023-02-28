import abi from "../spookyswap.json";
import abiDecoder from "abi-decoder";

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
          abiDecoder.addABI(abi);

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
          abiDecoder.addABI(abi);

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
          abiDecoder.addABI(abi);

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
  }
  return false;
}
