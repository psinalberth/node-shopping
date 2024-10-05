module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": "./src/modules",
                    "@core": "./src/core",
                    "@shared": "./src/shared",
                    "@infra": "./src/infra",
                    "@config": "./src/config",
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata",
        "@babel/plugin-transform-modules-commonjs",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
    ignore: ["**/*.spec.ts"],
}
