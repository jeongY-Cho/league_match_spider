import { fetchWrapper } from "../../fetchers/fetchWrapper";
import * as log from "loglevel";

jest.mock("../../utils/asyncWait.ts");


log.setLevel(log.levels.SILENT);

test("normal call", () => {
  let mockfn = jest.fn();

  let wrappedMock = fetchWrapper(mockfn);

  wrappedMock("a", "b");

  expect(mockfn).toBeCalledTimes(1);
  expect(mockfn).toBeCalledWith("a", "b");
});
describe("maxed out retries", () => {
  test("maxout on default", async () => {
    let mockfn = jest.fn();
    mockfn.mockRejectedValue({ code: "ETIMEDOUT" });
    jest.useFakeTimers();
    jest.runAllTimers();

    let wrappedMock = fetchWrapper(mockfn);
    try {
      await wrappedMock("a", "b");
    } catch {}

    expect(mockfn).toBeCalledTimes(3);
    expect(mockfn).toHaveBeenLastCalledWith("a", "b");
  });
  test("maxout on custom: 10", async () => {
    let mockfn = jest.fn();
    mockfn.mockRejectedValue({ code: "ETIMEDOUT" });
    jest.useFakeTimers();
    jest.runAllTimers();

    let wrappedMock = fetchWrapper(mockfn, 10);
    try {
      await wrappedMock("a", "b");
    } catch {}

    expect(mockfn).toBeCalledTimes(10);
    expect(mockfn).toHaveBeenLastCalledWith("a", "b");
  });
});
test("error 429", async () => {
  let mockfn = jest.fn();
  mockfn.mockRejectedValue({ response: {status: 429, headers:{"retry-after": "10"}} });

  let wrappedMock = fetchWrapper(mockfn);
  try {
    await wrappedMock("a", "b");

  } catch {}

  expect(mockfn).toBeCalledTimes(3);
  expect(mockfn).toHaveBeenLastCalledWith("a", "b");
});
test("error 400",async ()=>{
    let mockfn = jest.fn();
    mockfn.mockRejectedValue({
      response: { status: 400 },
    });

    let wrappedMock = fetchWrapper(mockfn);
    try {
      await wrappedMock("a","b")
    } catch (err) {
      expect(mockfn).toHaveBeenLastCalledWith("a", "b");
      expect(mockfn).toBeCalledTimes(3)

    }
});
test("error 403",async ()=>{
    let mockfn = jest.fn();
    mockfn.mockRejectedValue({
      response: { status: 403 },
    });

    let wrappedMock = fetchWrapper(mockfn);
    try {
      await wrappedMock("a", "b");
    } catch (err) {
      expect(mockfn).toHaveBeenLastCalledWith("a", "b");
      expect(mockfn).toBeCalledTimes(1);
    }});
test("error 404", async ()=>{
      let mockfn = jest.fn();
    mockfn.mockRejectedValue({
      response: { status: 404 },
    });

    let wrappedMock = fetchWrapper(mockfn);
    try {
      await wrappedMock("a", "b");
    } catch (err) {
      expect(mockfn).toHaveBeenLastCalledWith("a", "b");
      expect(mockfn).toBeCalledTimes(1);
    }
});
test("error 405",async()=>{
        let mockfn = jest.fn();
        mockfn.mockRejectedValue({
          response: { status: 405 },
        });

        let wrappedMock = fetchWrapper(mockfn);
        try {
          await wrappedMock("a", "b");
        } catch (err) {
          expect(mockfn).toHaveBeenLastCalledWith("a", "b");
          expect(mockfn).toBeCalledTimes(1);
        }
});
test("error 415", async ()=>{
        let mockfn = jest.fn();
        mockfn.mockRejectedValue({
          response: { status: 415 },
        });

        let wrappedMock = fetchWrapper(mockfn);
        try {
          await wrappedMock("a", "b");
        } catch (err) {
          expect(mockfn).toHaveBeenLastCalledWith("a", "b");
          expect(mockfn).toBeCalledTimes(1);
        }
});
test("error 401", async () =>{
        let mockfn = jest.fn();
        mockfn.mockRejectedValue({
          response: { status: 401 },
        });

        let wrappedMock = fetchWrapper(mockfn);
        try {
          await wrappedMock("a", "b");
        } catch (err) {
          expect(mockfn).toHaveBeenLastCalledWith("a", "b");
          expect(mockfn).toBeCalledTimes(1);
        }
});
test("error 500",async()=>{
        let mockfn = jest.fn();
        mockfn.mockRejectedValue({
          response: { status:500 },
        });

        let wrappedMock = fetchWrapper(mockfn);
        try {
          await wrappedMock("a", "b");
        } catch (err) {
          expect(mockfn).toHaveBeenLastCalledWith("a", "b");
          expect(mockfn).toBeCalledTimes(3);
        }
});
test("error 502", async()=>{
      let mockfn = jest.fn();
      mockfn.mockRejectedValue({
        response: { status: 502 },
      });

      let wrappedMock = fetchWrapper(mockfn);
      try {
        await wrappedMock("a", "b");
      } catch (err) {
        expect(mockfn).toHaveBeenLastCalledWith("a", "b");
        expect(mockfn).toBeCalledTimes(3);
      }
});
test("error 504", async()=>{
        let mockfn = jest.fn();
        mockfn.mockRejectedValue({
          response: { status: 504 },
        });

        let wrappedMock = fetchWrapper(mockfn);
        try {
          await wrappedMock("a", "b");
        } catch (err) {
          expect(mockfn).toHaveBeenLastCalledWith("a", "b");
          expect(mockfn).toBeCalledTimes(3);
        }
});
test("error 503", async() =>{
          let mockfn = jest.fn();
          mockfn.mockRejectedValue({
            response: { status: 503 },
          });

          let wrappedMock = fetchWrapper(mockfn);
          try {
            await wrappedMock("a", "b");
          } catch (err) {
            expect(mockfn).toHaveBeenLastCalledWith("a", "b");
            expect(mockfn).toBeCalledTimes(3);
          }

});
test("error ECONNREFUSED", async()=>{
          let mockfn = jest.fn();
          mockfn.mockRejectedValue({
            code: "ECONNREFUSED"
          });

          let wrappedMock = fetchWrapper(mockfn);
          try {
            await wrappedMock("a", "b");
          } catch (err) {
            expect(mockfn).toHaveBeenLastCalledWith("a", "b");
            expect(mockfn).toBeCalledTimes(3);
          }

});
test("error ETIMEDOUT",async()=>{
            let mockfn = jest.fn();
            mockfn.mockRejectedValue({
              code: "ETIMEDOUT",
            });

            let wrappedMock = fetchWrapper(mockfn);
            try {
              await wrappedMock("a", "b");
            } catch (err) {
              expect(mockfn).toHaveBeenLastCalledWith("a", "b");
              expect(mockfn).toBeCalledTimes(3);
            }
});
test("other error", async()=>{
            let mockfn = jest.fn();
          mockfn.mockRejectedValue({
            code: "SOME_OTHER_ERROR"
          });

          let wrappedMock = fetchWrapper(mockfn);
          try {
            await wrappedMock("a", "b");
          } catch (err) {
            expect(mockfn).toHaveBeenLastCalledWith("a", "b");
            expect(mockfn).toBeCalledTimes(1);
          }
});
