import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("./data/users.json");
const db = new Low(adapter);

export const getUsers = async () => {
  await db.read();
  const { users } = db.data;
  return users;
};

const createUser = async () => {
  await db.read();
  const { users } = db.data;
  users.push({ nombre: "oli" });
  await db.write();
};

export async function setUsers(updatedUser) {
  await db.read();
  console.log(updatedUser);
  const { users } = db.data;
  console.log("setting new data");

  // if the updated user has undefined key, delete it
  Object.keys(updatedUser).forEach(
    (key) => updatedUser[key] === undefined && delete updatedUser[key]
  );

  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === updatedUser._id) {
      users[i] = {
        ...users[i],
        ...updatedUser,
      };
    }
  }

  db.data = { users };
  await db.write();
}
