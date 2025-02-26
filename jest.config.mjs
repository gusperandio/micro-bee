import { clear } from "console";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
