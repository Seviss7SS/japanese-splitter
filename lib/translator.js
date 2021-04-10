import translate from 'translate'

translate.engine = 'libre'

const translateSentence = async (japanese, to = 'en') => translate(japanese, { from: 'ja', to })

export default translateSentence