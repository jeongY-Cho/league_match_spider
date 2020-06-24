import * as log from "loglevel"

export function asyncWait(secs: number) {
  log.info(`Waiting ${secs}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, secs * 1000);
  });
}
