/* eslint-disable no-undef */
const { splitSentence } = require('../lib/tokenizer')
const { tests } = require('../config/tests.config')

test("japanese sentences correctly split", async () => {
  console.log(splitSentence)
  const { testCases } = tests

  for (const tc of testCases) {
    expect(await splitSentence(tc.test)).toStrictEqual(tc.result.split(' '))
  }
})