import express, { Request, Response } from "express";
import db from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Client } from "twitter-api-sdk";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import abi from "../spookyswap.json";
import abiDecoder from "abi-decoder";

dotenv.config();

export const verifyRouter = express.Router();

const client = new Client(process.env.BEARER_TOKEN as string);

verifyRouter.get("/hellosir", async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      "https://api.ftmscan.com/api?module=account&action=txlist&address=0x013432d70085FA46Be6Aec187BF99551665c1d1e&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=S7NR5WZFXDG4JVPK8M4MRRAMXQJHKF832N"
    );
    const { result: transactions } = await response.json();

    const txn = transactions[3];
    const data = txn.input;

    abiDecoder.addABI(abi);

    const decodedData = abiDecoder.decodeMethod(data);

    const decodeParamsValue = abiDecoder.decodeMethod(
      decodedData.params[0].value[1]
    );

    /*

    check for:
    1. name is "swapExactETHForTokens"
    2. final path is "0x841fad6eae12c286d1fd18d1d525dffa75c7effe" for BOO
     */

    /*
    {
      name: "swapExactETHForTokens",
      params: [
      {
      name: "amountOutMin",
      value: "254803879210303051",
      type: "uint256"
      },
      {
      name: "path",
      value: [
      "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
      "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
      "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
      "0x841fad6eae12c286d1fd18d1d525dffa75c7effe"
      ],
      type: "address[]"
      },
      {
      name: "to",
      value: "0x013432d70085fa46be6aec187bf99551665c1d1e",
      type: "address"
      },
      {
      name: "deadline",
      value: "1678337865",
      type: "uint256"
      }
      ]
      }

check for
1. addLiquidityETH
2. check token 0x841fad6eae12c286d1fd18d1d525dffa75c7effe (BOO)
3. check amount if needed

      {
name: "addLiquidityETH",
params: [
{
name: "token",
value: "0x841fad6eae12c286d1fd18d1d525dffa75c7effe",
type: "address"
},
{
name: "amountTokenDesired",
value: "256842310243985476",
type: "uint256"
},
{
name: "amountTokenMin",
value: "254787571762033592",
type: "uint256"
},
{
name: "amountETHMin",
value: "991166345501020322",
type: "uint256"
},
{
name: "to",
value: "0x013432d70085fa46be6aec187bf99551665c1d1e",
type: "address"
},
{
name: "deadline",
value: "1678337899",
type: "uint256"
}
]
}

check for
1. function name deposit
2. pid = 0
3. check amount if needed

{
name: "deposit",
params: [
{
name: "pid",
value: "0",
type: "uint256"
},
{
name: "amount",
value: "469026256267999502",
type: "uint256"
},
{
name: "to",
value: "0x013432d70085fa46be6aec187bf99551665c1d1e",
type: "address"
},
{
name: "useMCV22",
value: false,
type: "bool"
}
]
}

*/

    console.log(JSON.stringify(decodedData, null, 2));
    res.status(200).send(decodeParamsValue);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// verify quest: http://localhost:8888/api/verify/:questId/:user
verifyRouter.get("/:questId/:address", async (req: Request, res: Response) => {
  try {
    const { questId, address } = req.params;

    // fetch user
    const userDocRef = doc(db, "users", address);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // fetch user current quests
      const { quests, twitter } = userDocSnap.data();
      const questsArray: any[] = Object.values(quests);

      // find requested quest among active
      const activeQuest = questsArray.find((quest: any) => {
        return quest.questId === questId;
      });

      if (activeQuest) {
        const { currentStep, startedAt } = activeQuest;

        // fetch quest
        const questDocRef = doc(db, "quests", questId);
        const questDocSnap = await getDoc(questDocRef);

        if (questDocSnap.exists()) {
          // fetch steps from quest
          const { steps, numSteps } = questDocSnap.data();

          // find user current step details from quest
          const activeStep = steps[currentStep];

          const {
            contract_address,
            amount,
            decimals,
            method,
            contract_addresses,
            methods,
            isTwitter,
            partner_id,
          } = activeStep;

          if (isTwitter) {
            const { data } = await client.users.usersIdFollowing(
              twitter.user_id,
              {
                "user.fields": ["id", "name", "username"],
              }
            );

            const found = data?.find(({ id }) => id === partner_id);

            if (found) {
              res.status(200).send({ message: "Success: Verified!" });
            } else {
              res.status(404).send({ message: "Error: Verification failed" });
            }
          } else {
            const response = await fetch(
              `https://api.trongrid.io/v1/accounts/${address}/transactions`
            );

            const { data: transactions } = await response.json();

            let foundTxn;
            if (contract_addresses && contract_addresses.length > 0) {
              for (let i = 0; i < contract_addresses.length; i++) {
                foundTxn = transactions.find((txn: any) => {
                  if (
                    isValidTimestamp(txn, startedAt) &&
                    isValidContract(txn, contract_addresses[i]) &&
                    isValidMethod(txn, methods[i]) &&
                    isValidAmount(txn, amount, decimals)
                  )
                    return true;
                });
                if (foundTxn) break;
              }
            } else {
              foundTxn = transactions.find((txn: any) => {
                if (
                  isValidTimestamp(txn, startedAt) &&
                  isValidContract(txn, contract_address) &&
                  isValidMethod(txn, method) &&
                  isValidAmount(txn, amount)
                )
                  return true;
              });
            }

            if (foundTxn) {
              res.status(200).send({ message: "Success: Verified!" });
            } else {
              res.status(404).send({ message: "Error: Verification failed" });
            }
          }
        } else {
          res
            .status(404)
            .send({ message: `Error: No quest found with ${questId}` });
        }
      } else {
        res.status(404).send({
          message: `Error: User does not have an active quest with ${questId}`,
        });
      }
    } else {
      res.status(404).send({ message: `Error: No user found with ${address}` });
    }

    return;
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/* QUEST VERIFICATION HELPERS */
function isValidTimestamp(txn: any, startedAt: number) {
  if (!txn.block_timestamp) {
    console.log("is valid timestamp failed");
    console.log("txn.block_timestamp not found");
    return false;
  }

  const result = txn.block_timestamp > startedAt;

  if (!result) {
    console.log("is valid timestamp failed");
    console.log("txn.block_timestamp: ", txn.block_timestamp);
    console.log("startedAt: ", startedAt);
  }
  return result;
}

function isValidContract(txn: any, contractAddress: string) {
  if (!txn.raw_data || !txn.raw_data.contract) {
    console.log("is valid contract failed");
    console.log("txn.raw_data or txn.raw_data.contract not found");
    return false;
  }

  const result =
    txn.raw_data.contract[0].parameter.value.contract_address ===
    contractAddress;

  if (!result) {
    console.log("is valid contract failed");
    console.log(
      "txn.raw_data.contract[0].parameter.value.contract_address: ",
      txn.raw_data.contract[0].parameter.value.contract_address
    );
    console.log("contractAddress: ", contractAddress);
  }
  return result;
}

function isValidMethod(txn: any, method: string) {
  const result =
    txn.raw_data.contract[0].parameter.value.data.slice(0, 8) === method;
  if (!result) {
    console.log("is valid method failed");
    console.log(
      "txn.raw_data.contract[0].parameter.value.data.slice(0, 8): ",
      txn.raw_data.contract[0].parameter.value.data.slice(0, 8)
    );
    console.log("method: ", method);
  }
  return txn.raw_data.contract[0].parameter.value.data.slice(0, 8) === method;
}

function isValidAmount(txn: any, amount: number, decimals = 6) {
  let result = false;

  let txnAmount = txn.raw_data.contract[0].parameter.value.call_value;

  if (!txnAmount) {
    const data = txn.raw_data.contract[0].parameter.value.data;
    const hexAmount = data.substring(data.length - decimals * 2);
    txnAmount = parseInt(hexAmount, 16);
    result = txnAmount >= amount * 10 ** decimals;
  } else {
    result = txnAmount >= amount * 10 ** decimals;
  }

  if (!result) {
    console.log("is valid amount failed");
    console.log("txnAmount: ", txnAmount);
    console.log("verifying amount: ", amount * 10 ** decimals);
  }

  return result;
}
