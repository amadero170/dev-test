import login from "../login.js";

describe("user handler", () => {
  it("should return response ok true with correct username and password", () => {
    expect(
      login({
        username: "henderson.briggs@geeknet.net",
        password: "23derd*334",
      })
    ).toBe(true);
  });
});
