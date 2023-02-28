import Script from "next/script";
import { Roboto_Mono, Rubik } from "@next/font/google";
import { ToastContainer } from "react-toastify";

const rubik = Rubik({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

import "../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

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
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
        
        :root {
          --roboto-mono: ${robotoMono.style.fontFamily};
        }
      `}</style>
      {
        getLayout(<Component {...pageProps} />)
      }
      <ToastContainer
        position="top-right"
        // theme="dark"
      />
    </>
  )
}

export default MyApp;
