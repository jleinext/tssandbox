import { SecuritySocialNumber } from "./securitySocialNumber";

describe("a security social number", () => {
  it("should not allow empty values", () => {
    expect(() => new SecuritySocialNumber("")).toThrowError();
  });

  it("should not allow value > 15 characters", () => {
    expect(() => new SecuritySocialNumber("12354874569874556")).toThrowError();
  });

  it("should not allow value < 15 characters", () => {
    expect(() => new SecuritySocialNumber("1234")).toThrowError();
  });

  it("should allow value == 15 characters", () => {
    const ssn = new SecuritySocialNumber("185057800608436");
    expect(ssn).not.toBeNull();
  });
});
