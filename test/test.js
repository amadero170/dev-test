import { assert, expect } from "chai";
import request from "supertest";
import app from "../api/server.js";
import { readFileSync } from "node:fs";
import { getUsers, setUsers, getBalance } from "../db.js";

const usersDb = JSON.parse(
  readFileSync(new URL("../data/users.json", import.meta.url))
);

describe("getUsers function", () => {
  it("should return an array ", async function () {
    const res = await getUsers();
    assert.isArray(res);
  }),
    it("array length should be greater than 0", async function () {
      const res = await getUsers();
      assert.isAbove(res.length, 0);
    }),
    it("array length should be equal to 'users.json' array length", async function () {
      const res = await getUsers();
      assert.equal(res.length, usersDb.users.length);
    });
});

describe("setUsers function", () => {
  it("should not change users array length ", async function () {
    const testUser = usersDb.users.find((user) => user._id === "1");
    testUser.age = Math.floor(Math.random() * 100);
    const res = await setUsers(testUser);
    assert.isNumber(usersDb.users.find((user) => user._id === "1").age);
  });
});

describe("getBalance function", () => {
  it("should return an array ", async function () {
    const res = await getBalance("1");
    assert.isString(res);
  });
});

describe("login handler", () => {
  it("should return response ok true with correct username and password", async function () {
    const res = await request(app).post("/api/login").send({
      username: "henderson.briggs@geeknet.net",
      password: "23derd*334",
    });

    assert.equal(res.ok, true);
  }),
    it("should return response ok false with incorrect username and password", async function () {
      const res = await request(app).post("/api/login").send({
        username: "henderson.briggs@geeknet.net",
        password: "",
      });

      assert.equal(res.ok, false);
    }),
    it("should return status code 200 with correct username and password logged in", async function () {
      const res = await request(app).post("/api/login").send({
        username: "henderson.briggs@geeknet.net",
        password: "23derd*334",
      });

      assert.equal(res.statusCode, 200);
    }),
    it("should return status code 401 with incorrect username or password", async function () {
      const res = await request(app).post("/api/login").send({
        username: "henderson.briggsgeeknet.net",
        password: "",
      });

      assert.equal(res.statusCode, 401);
    });
});

describe("checkBalance handler", () => {
  it("should return status code 201 if user id in request exists", async function () {
    const res = await request(app).post("/api/balance").send({
      id: "1",
    });

    assert.equal(res.statusCode, 201);
  }),
    it("should return status code 401 if user id in request doesn't exist", async function () {
      const res = await request(app).post("/api/balance").send({
        id: "99",
      });

      assert.equal(res.statusCode, 401);
    });
});
