import type { Config } from "jest"

const config: Config = {
    verbose: true,
    clearMocks: true,
    testMatch: ["**/src/test/**/*"],
    preset: "ts-jest",
    setupFiles: ["./jest-setup-file.ts"],
    moduleNameMapper: {
        "^@business/(.*)$": "<rootDir>/src/business/$1",
        "^@application/(.*)$": "<rootDir>/src/application/$1",
    },
}

export default config
