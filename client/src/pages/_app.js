import '@/styles/globals.css'
import '@/components/layout'
import Layout from '@/components/layout'
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>  
  )
}
