import { asyncWait } from "../utils";

describe("test asyncWait", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.useFakeTimers();
  test("test 4 seconds", () => {
    let res = asyncWait(4);
    jest.runAllTimers()
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 4000);
    expect(res).resolves.toBeUndefined()
  });
  
  test("test 30 seconds", () => {
    let res = asyncWait(30);
    jest.runAllTimers()
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 30000);
    expect(res).resolves.toBeUndefined()
  });
});
