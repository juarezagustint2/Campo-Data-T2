import { describe, expect, it } from "vitest";
import { usdToArs } from "./currency";

describe("usdToArs", () => {
  it("multiplica el costo en dólares por la cotización del dólar", () => {
    expect(usdToArs(380, 1570)).toBe(596600);
  });
});
