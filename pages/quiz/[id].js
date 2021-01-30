import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalQuestions={externalDb.questions} externalBg={externalDb.bg} />
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  const [projectName, user] = context.query.id.split('___')
  const externalDb = await fetch(`https://${projectName}.${user}.vercel.app/api/db/`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error('Falha em pegar os dados')
    })
    .then((response) => response)
    .catch((err) => {
      console.error(err)
    })

  return {
    props: {
      externalDb,
    },
  }
}
