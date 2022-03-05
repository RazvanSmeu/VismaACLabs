import '../src/App.css'
import '../src/index.css'
import '../src/dbx-globals.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { purple } from '@mui/material/colors'
import React from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: purple[700]
          }
        },
        typography: {
          fontFamily: ['Ubuntu'].join(','),
          fontWeightBold: 700,
          fontSize: 16
        }
      })}
    >
      <Story />
    </ThemeProvider>
  )
]
