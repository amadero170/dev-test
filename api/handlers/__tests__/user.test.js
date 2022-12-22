import login from "../login.js";

describe("user handler", () => {
  it("should return response ok true with correct username and password", () => {
    const response = async () => {
      await login({
        body: {
          username: "henderson.briggs@geeknet.net",
          password: "23derd*334",
        },
      })
        .expect(response.ok)
        .toBe(true);
    };
  });
});

// NODE_OPTIONS=--experimental-vm-modules npx jest
