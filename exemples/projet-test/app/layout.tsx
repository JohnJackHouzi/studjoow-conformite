import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TEST123456" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-TEST123456');`}
        </Script>
        <Script id="pixel">{`!function(f){f.fbq=function(){};}(window); fbq('init', '000000000'); fbq('track', 'PageView');`}</Script>
      </head>
      <body>
        {children}
        <footer>
          <a href="/contact">Contact</a>
        </footer>
      </body>
    </html>
  );
}
