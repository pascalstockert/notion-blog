import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import '../scss/styles.scss';

config.autoAddCss = false;


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
