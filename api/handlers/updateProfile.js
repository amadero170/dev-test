import { setUsers } from "../../db.js";
import { getUsers } from "../../db.js";

export default async (req, res) => {
  const userUpdated = req.body.updatedUser;
  const users = await getUsers();

  if (!users.find((u) => u._id === userUpdated._id)) {
    res.status(401).json({ error: "incorrect id" });
  }

  await setUsers(userUpdated);
  const ID = { ID: userUpdated._id };
  res.status(200).json(ID);
};
