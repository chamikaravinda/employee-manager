import '@/styles/globals.css'
import '@/components/layout'
import Layout from '@/components/layout'
import {wrapper} from "../store/store";
import "../../next.config.js";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>  
  )
};

export default wrapper.withRedux(App);