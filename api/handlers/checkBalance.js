import { getUsers } from "../../db.js";
import { getBalance } from "../../db.js";

export default async (req, res) => {
  const userId = req.body.id;
  const users = await getUsers();

  if (!users.find((u) => u._id === userId)) {
    return res.status(401).json({ error: "incorrect user" });
  }
  const balance = await getBalance(userId);

  res.status(201).json(balance);
};
