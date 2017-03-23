import React from 'react'
import Head from 'next/head'
export default () => (
  <header>
    <Head>
      <link rel="stylesheet" href="/static/base.css" />
      <script dangerouslySetInnerHTML={{__html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-92913950-1', 'auto');
      ga('send', 'pageview');`}} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@congress_card" />
      <meta name="twitter:title" content="Send postcards to congress REALLY easily" />
      <meta name="twitter:description" content="just another way to let congress know how you feel! Choose a design, customize the message, choose who to send it to, pay $1.50, it's super easy." />
      <meta name="twitter:image" content="https://www.congresscard.club/static/twitter-card.png" />
    </Head>
  </header>
)