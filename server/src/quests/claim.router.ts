import express, { Request, Response } from "express";
import db from "../../firebase/firebase";
import * as dotenv from "dotenv";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ethers } from "ethers";
import abi from "../abi/rewarder.json";
dotenv.config();

export const claimRouter = express.Router();

const JOURNEY_REWARDER_ADDRESS = "0xa44F2043a2df26737ACc22a6b6De35280e8E2D6F";
const JOURNEY_NFT_ADDRESS = "0xE60841d51BBAAd1bA3D9fec01f9D1c6a35B937e2";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.fantom.network/"
);

const privateKey = process.env.PRIVATE_KEY ?? "";
const signer = new ethers.Wallet(privateKey, provider);
const RewarderContract = new ethers.Contract(
  JOURNEY_REWARDER_ADDRESS,
  abi,
  signer
);

// fetch all quests: https://journey-server.onrender.com/api/quests/
claimRouter.get("/", async (req: Request, res: Response) => {
  try {
    const query = collection(db, "quests");
    const querySnap: any = await getDocs(query);

    const fetchedQuests: any = [];

    if (querySnap) {
      querySnap.forEach((doc: any) => {
        fetchedQuests.push(doc.data());
      });
    }

    res
      .status(200)
      .send({ message: "Successfully fetched", quest: fetchedQuests });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "server error" });
  }
});

claimRouter.get("/:questId/:address", async (req: Request, res: Response) => {
  try {
    const { questId, address } = req.params;

    const docRef = doc(db, "quests", questId);
    const docSnap = await getDoc(docRef);

    if (questId === "journey") {
      if (docSnap.exists()) {
        const { nft_reward, completed_users } = docSnap.data();

        // SEND NFT REWARD
        const nftResult = await RewarderContract.reward(
          JOURNEY_NFT_ADDRESS,
          address,
          nft_reward.token_uri
        );

        // add user to completed_users array
        const prevCompletedUsers = JSON.parse(JSON.stringify(completed_users));
        prevCompletedUsers.push(address);

        await updateDoc(docRef, {
          completed_users: prevCompletedUsers,
        });

        res.status(200).send({
          message: "Reward successfully claimed",
          nftTxn: nftResult,
        });
      } else {
        res.status(404).send({ message: "Journey not found" });
      }
      return;
    }

    if (docSnap.exists()) {
      const {
        token_reward,
        nft_reward,
        xp: questXP,
        completed_users,
      } = docSnap.data();

      // SEND REWARD
      const nftResult = await RewarderContract.reward(
        JOURNEY_NFT_ADDRESS,
        address,
        nft_reward.token_uri,
        {
          value: ethers.utils.parseEther(token_reward.amount),
        }
      );

      // UPDATE XP
      const userDocRef = doc(db, "users", address);

      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const { quests, xp: userXP } = userDocSnap.data();
        const newQuests = JSON.parse(JSON.stringify(quests));
        newQuests[questId as string].status = "rewarded";

        await updateDoc(userDocRef, {
          quests: newQuests,
          xp: userXP + questXP,
        });
      }

      // add user to completed_users array
      const prevCompletedUsers = JSON.parse(JSON.stringify(completed_users));
      prevCompletedUsers.push(address);

      await updateDoc(docRef, {
        completed_users: prevCompletedUsers,
      });

      res.status(200).send({
        message: "Reward successfully claimed",
        tokenTxn: nftResult,
        nftTxn: nftResult,
      });
    } else {
      res.status(404).send({ message: "Quest not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "server error" });
  }
});
