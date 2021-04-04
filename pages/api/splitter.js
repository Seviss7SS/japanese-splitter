import tokenizer from '../../utils/tokenizer'

export default async (req, res) => {
  const { method, body } = req

  try {
    if (method === 'POST') {
      const { data } = body
      const { splitSentence } = tokenizer()
      const sentenceArr = await splitSentence(data)
  
      res.status(200).json({
        sentences: sentenceArr,
      })
    } else {
      throw new Error('Method is not post')
    }
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
