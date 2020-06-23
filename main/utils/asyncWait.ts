export function asyncWait(secs: number) {
  console.log(`Waiting ${secs}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, secs * 1000);
  });
}
