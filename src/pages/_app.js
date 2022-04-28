import { SessionProvider } from "next-auth/react"

import '../../styles/globals.css'

function App({ Component, pageProps: {session, ...pageProps} }) {
  const getLayout = Component.getLayout || ((page) => page)
  const layoutComponent = getLayout(<Component {...pageProps} />)
  return {layoutComponent}
}

export default App
