import MatchBuffer from "../MatchBuffer";
import { MatchSummary } from "../types";


test("test for properties", ()=>{
    let matchBuffer = new MatchBuffer(100)

    expect(matchBuffer.max_size).toBe(100)
    expect(matchBuffer).toHaveProperty("push")
})

test('test that max_size param works', ()=>{
    const testSizes = [1,2,10,20]
    let matchBufferArray: MatchBuffer[] = []

    testSizes.forEach(size=>{matchBufferArray.push(new MatchBuffer(size))})

    for (let i = 0; i < testSizes.length ; i++) {
        for (let j = 0; j < 20; j++) {
            matchBufferArray[i].push(1 as unknown as MatchSummary)
        }
        expect(matchBufferArray[i].max_size).toBe(testSizes[i])
    }

}) 

test("test push sort", ()=>{
    let testLength = 5
    let matchBuffer = new MatchBuffer(testLength)
    let testPushes = [
        {timestamp: 1},
        {timestamp: 5},
        {timestamp: 3},
        {timestamp: 2},
        {timestamp: 4},
        {timestamp: 6}
    ]
    
    matchBuffer.push(testPushes[0] as unknown as MatchSummary)
    expect(matchBuffer[0].timestamp).toBe(1)

    matchBuffer.push(testPushes[1] as unknown as MatchSummary)
    expect(matchBuffer[0].timestamp).toBe(5)
    expect(matchBuffer[1].timestamp).toBe(1)

    matchBuffer.push(testPushes[2] as unknown as MatchSummary)
    expect(matchBuffer[0].timestamp).toBe(5);
    expect(matchBuffer[1].timestamp).toBe(3);
    expect(matchBuffer[2].timestamp).toBe(1);

    matchBuffer.push(testPushes[3] as unknown as MatchSummary)
    matchBuffer.push(testPushes[4] as unknown as MatchSummary)
    matchBuffer.push(testPushes[5] as unknown as MatchSummary)

    for (let i =0; i < testLength; i++) {
        expect(matchBuffer[i].timestamp).toBe(testLength + 1 - i)
    }
    expect(matchBuffer[testPushes.length]).toBeUndefined()
    expect(matchBuffer[testLength-1].timestamp).toBe(2)
})

test("test duplicate removal", ()=>{
    let testLength = 6;
    let matchBuffer = new MatchBuffer(testLength);
    let testPushes = [
      { timestamp: 1 },
      { timestamp: 5 },
      { timestamp: 3 },
      { timestamp: 2 },
      { timestamp: 4 },
      { timestamp: 1 },
    ];

    for (let testPush of testPushes) {
        matchBuffer.push((testPush as unknown) as MatchSummary);
    }

    expect(matchBuffer.length).toBe(5)
})