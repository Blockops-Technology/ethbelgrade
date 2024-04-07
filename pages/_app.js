import Script from "next/script";
import { Anton, Roboto_Mono, Rubik, Space_Grotesk } from "@next/font/google";
import { ToastContainer } from "react-toastify";

const rubik = Rubik({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});
const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
})

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
            font-family: ${rubik.style.fontFamily};
          }
          
          :root {
            --roboto-mono: ${robotoMono.style.fontFamily};
            --rubik: ${rubik.style.fontFamily};
            --anton: ${anton.style.fontFamily};
            --space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
        `}
      </style>
        { getLayout(<Component {...pageProps} />) }
      <ToastContainer
        position="top-right"
        // theme="dark"
      />
    </>
  )
}

export default MyApp;
