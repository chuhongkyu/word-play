import Head from 'next/head'


export default function HeadComponent() {
  const metaData = {
    title: "말장난 게임, 아재 개그",
    description: "말장난 게임 | 당신의 아재 개그 실력을 시험해봅시다. ",
    keywords: "말장난 게임 · 아재 개그 · 단어 · 게임 · 개그 · 말 · 심심풀이 ",
  };
  return (
    <>
      <Head>
        <title>말장난 게임</title>
        <meta name="description" content="단어 놀이" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:site_name" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        {/* <meta property="og:image" content={metaData.imgsrc} />
        <meta property="og:url" content={metaData.url} /> */}

        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        {/* <meta name="twitter:image" content={metaData.imgsrc} />
        <link rel="canonical" href={metaData.url} /> */}
      </Head>
  
    </>
  )
}