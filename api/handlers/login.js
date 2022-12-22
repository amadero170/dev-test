import { getUsers } from "../../db.js";

export default async (req, res) => {
  const { username, password } = req.body;

  const users = await getUsers();

  const response = users.find(
    (u) => u.email === username && u.password === password
  ) || { error: "Incorrect username or password" };

  res.status(200).json(response);
  return res.ok;
};
