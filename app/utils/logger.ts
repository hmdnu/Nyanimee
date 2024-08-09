import chalk from "chalk";

const Prefix = {
  debug: `${chalk.bgBlue(chalk.bold(`[DEBUG]`))}`,
  info: `${chalk.bgGreen(chalk.bold(`[INFO]`))}`,
  error: `${chalk.bgRed(chalk.bold(`[ERROR]`))}`,
};

function getTimeStamp() {
  return `${chalk.bgBlack(chalk.bold(new Date().toLocaleString()))}`;
}

function info(text: unknown, fileName?: string) {
  console.info(`${getTimeStamp()} ${fileName || ""} ${Prefix.info} ${text}`);
}

function error(text: unknown, fileName?: string) {
  console.error(chalk.red(`${getTimeStamp()}  ${fileName || ""} ${Prefix.error} ${text}`));
}

function debug(text: unknown, fileName?: string) {
  console.debug(chalk.green(`${getTimeStamp()}  ${fileName || ""} ${Prefix.debug} ${text}`));
}

export const Logger = {
  info,
  error,
  debug,
};
