import Head from "next/head";

export function MetaHead({title}:{title: string}){
    return(
        <Head>
            <title>{title}</title>
            <meta name="description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content="세대 갈등 해결 게임 - 신조어 배우기" />
            <meta property="og:description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://word-play.vercel.app/" />
            <meta property="og:image" content="/assest/img/og_img.jpg" />
            <meta property="og:image:alt" content="/assest/img/og_img.jpg" />
            <meta name="twitter:title" content="세대 갈등 해결 게임 - 신조어 배우기" />
            <meta name="twitter:description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta name="twitter:image" content="/assest/img/og_img.jpg" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1979490362657562" crossOrigin="anonymous"></script>
      </Head>
    )
}