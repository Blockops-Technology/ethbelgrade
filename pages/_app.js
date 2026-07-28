import Script from "next/script";
import { ToastContainer } from "react-toastify";

// Fonts are self-hosted from public/fonts (see styles/fonts.css) so builds
// don't depend on Google Fonts being reachable
import "../styles/fonts.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9SJ21ZMV21"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}  
            gtag('js', new Date());
            gtag('config', 'G-9SJ21ZMV21');
          `}
      </Script>
      <style jsx global>
        {`
          html {
            font-family: 'Space Grotesk', sans-serif;
          }

          :root {
            --roboto-mono: 'Roboto Mono', monospace;
            --rubik: 'Rubik', sans-serif;
            --anton: 'Anton', sans-serif;
            --space-grotesk: 'Space Grotesk', sans-serif;
          }
        `}
      </style>
        { getLayout(<Component {...pageProps} />) }
      <ToastContainer
        position="top-right"
        theme="dark"
      />
    </>
  )
}

export default MyApp;
