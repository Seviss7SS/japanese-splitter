/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// ** Tokenize Japanese sentences by inserting spaces between words **

import TinySegmenter from 'tiny-segmenter'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji"

const tokenizer = () => {
  const segmenter = new TinySegmenter()

  /**
   * async wrapper for initializing Kuroshiro
   * @returns kuroshiro object
   */
  const initKuroshiro = async () => {
    const kuroshiro = new Kuroshiro()
    await kuroshiro.init(new KuromojiAnalyzer())
    return kuroshiro
  }

  /**
   * 
   * @param {string} kanji Japanese word containing Kanji, Hiragana, Katakana
   * @param {string} hiragana kanji parameter converted into hiragana
   * @returns proper split of kanji parameter
   */
  const matchKanji = async (kanji, hiragana) => {
    const splitKanji = []
    const kuroshiro = await initKuroshiro()
    const kanjiArr = kanji.split('').reverse()
    const hiraArr = hiragana.split(' ')

    if (kanjiArr.length === hiraArr.length) return kanjiArr.reverse()

    for (const h of hiraArr) {
      let tmp = ''

      while (kanjiArr.length) {
        tmp += kanjiArr.pop()

        const hira = await kuroshiro.convert(tmp, { to: 'hiragana' })

        console.log(hira, h)

        if (hira === h) {
          splitKanji.push(tmp)
          break
        }
      }
    }

    return splitKanji
  }

  /**
   * use Kuroshiro to validate TinySegment result
   * @param {string} word Japanese word to validate
   * @return array of correctly-split Japanese words
   */
  const validate = async (word) => {
    const kuroshiro = await initKuroshiro()
    const result = await kuroshiro.convert(word, { to: 'hiragana', mode: 'spaced' })

    console.log(word)
    console.log(result)

    if (result.split(' ').length > 1) {
      return matchKanji(word, result)
    }

    return [word]
  }

  /**
   * splits a Japanese sentence into a word array
   * @param {string} sentence non-spaced Japanese sentence 
   * @returns array of each word in sentence
   */
  const splitSentence = async (sentence) => {
    const newSentence = []

    // segmenter for phase 1 of split
    const words = segmenter.segment(sentence)

    console.log(words)
      
    // fix any errors with kuroshiro
    for (const word of words) {
      newSentence.push(...(await validate(word)))
    }

    console.log(newSentence)

    return newSentence
  }

  return {
    splitSentence,
    validate,
    matchKanji,
  }
}

export default tokenizer