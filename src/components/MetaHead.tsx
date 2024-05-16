import Head from "next/head";

export function MetaHead({title}:{title: string}){
    return(
        <Head>
            <title>{title}</title>
            <meta name="description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* android */}
            <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png"/>
            {/* apple */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            {/* favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="shortcut icon" href="/favicon.ico"/>

            <meta property="og:title" content="세대 갈등 해결 게임 - 신조어 배우기" />
            <meta property="og:description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://word-play.vercel.app/" />
            <meta property="og:image" content="/assest/img/og_img.jpg" />
            <meta property="og:image:alt" content="/assest/img/og_img.jpg" />
            <meta name="twitter:title" content="세대 갈등 해결 게임 - 신조어 배우기" />
            <meta name="twitter:description" content="세대 갈등을 해결하기 위한 웹 기반 게임. 젊은 세대와 노년 세대의 소통과 이해를 촉진합니다." />
            <meta name="twitter:image" content="/assest/img/og_img.jpg" />
      </Head>
    )
}