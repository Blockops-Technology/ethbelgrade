import Script from "next/script";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NW9VQBBQ61"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}  
            gtag('js', new Date());
            gtag('config', 'G-NW9VQBBQ61');
          `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
