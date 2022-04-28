import { SessionProvider } from "next-auth/react"

import '../../styles/globals.css'

function App({ Component, pageProps: {session, ...pageProps} }) {
  const getLayout = Component.getLayout || ((page) => page)
  const layoutComponent = getLayout(<Component {...pageProps} />)
  return <SessionProvider session={session}>{layoutComponent}</SessionProvider>
}

export default App
