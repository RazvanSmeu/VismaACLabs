import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './DoubleTexContentPane.css'

export type DoubleTexContentPaneProps = {
  children: React.ReactNode
}

export function DoubleTextContentPane(props: DoubleTexContentPaneProps) {
  return (
    <div className='doubleTex__contentPane'>
      <BrowserRouter>
        <div>
          <Routes>{props.children}</Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
