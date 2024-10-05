import chalk from "chalk"

type Log = {
    info: any
    error: any
}

export const log: Log = {
    info: (message: any) =>
        console.log(
            `[${chalk.cyan("INFO")}] [${chalk.gray(new Date().toISOString())}]`,
            message
        ),
    error: (message: any) =>
        console.error(
            `[${chalk.red("ERROR")}] [${chalk.gray(new Date().toISOString())}]`,
            message
        ),
}
