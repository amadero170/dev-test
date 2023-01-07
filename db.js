import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("./data/users.json");
const db = new Low(adapter);

export const getUsers = async () => {
  await db.read();
  const { users } = db.data;
  return users;
};

export async function setUsers(updatedUser) {
  await db.read();
  const usersDb = db.data.users;

  delete updatedUser.balance;
  console.log(updatedUser);
  // if the updated user has undefined key, delete it
  Object.keys(updatedUser).forEach(
    (key) => updatedUser[key] === undefined && delete updatedUser[key]
  );

  const users = [];
  usersDb.map((user) => {
    if (user._id != updatedUser._id) {
      users.push(user);
    } else {
      users.push({ ...user, ...updatedUser });
    }
  });

  db.data = { users };
  await db.write();
}

export const getBalance = async (userId) => {
  await db.read();
  const { users } = db.data;
  let balance = users.find((u) => u._id === userId).balance;

  return balance;
};
