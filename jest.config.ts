import type { Config } from "jest";
import nextJest from "next/jest.js";

const config: Config = {};

const createJestConfig = nextJest({
  dir: "./",
});

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
