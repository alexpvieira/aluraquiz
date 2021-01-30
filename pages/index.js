import React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import Link from '../src/components/Link'

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <Widget
          as={motion.section}
          transition={{
            delay: 0,
            duration: 0.5,
          }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={function (e) {
              e.preventDefault()
              router.push(`/quiz?name=${name}`)
            }}
            >
              <Input
                name="username"
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz aí seu nome"
                value={name}
              />

              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((link) => {
                const [projectName, user] = link.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.')
                return (
                  <li key={link}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${user}`}>
                      {`${user}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.section}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />

        <GitHubCorner projectUrl="https://github.com/alexpvieira/aluraquiz" />
      </QuizContainer>
    </QuizBackground>
  )
}
