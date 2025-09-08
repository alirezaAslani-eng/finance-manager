import type { AppProps } from 'next/app'
import React from 'react'
function _app({Component,pageProps}:AppProps) {
  return (
   <Component {...pageProps} />
  )
}

export default _app