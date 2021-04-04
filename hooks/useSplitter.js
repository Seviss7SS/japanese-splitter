import { useState } from 'react'
import axios from 'axios'

const useSplitter = () => {
  const [splitted, setSplitted] = useState('')

  const getSplitData = async (text) => {
    const { data } = await axios.post(`/api/splitter`, {  data: text })
    console.log(data)
    setSplitted(data.sentences.reduce((a,b) => `${a} ${b}`, ''))
  }

  return {
    splitted,
    getSplitData,
  }
}

export default useSplitter