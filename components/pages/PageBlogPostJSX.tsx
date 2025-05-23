import React from "react";
import {PageBlogPostSchema} from "@/sanity/pages/PageBlogPostTemplate";
import {PortableText} from "@portabletext/react";
import {richTextComponent} from "@/sanity/sanityPortableText";
import {CTAButton} from "@/shadcn/ui/button";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";
import Image from "next/image";

import starsGold from "@/public/global/stars-gold.svg";
import mario from "@/public/global/mario-small.png";

export default function PageBlogPostJSX({data}: {data: PageBlogPostSchema}) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />

      <section className="pt-[15rem] pb-[12rem] lg:py-[22.5rem]">
        <div className="container flex flex-col items-center">
          <Image
            className="!w-[12.125rem] mb-[2rem]"
            src={starsGold}
            alt=""
          />

          <div className="richtext mb-[5rem] lg:mb-[10rem]">
            <h1 className="text-center w-[min(121.375rem,100%)]">{data.title}</h1>
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-[2rem] pb-[3rem] mb-[5rem] lg:mb-[8rem] border-b [border-image:repeating-linear-gradient(to_right,rgba(0,0,0,0.2)_0,rgba(0,0,0,0.2)_5px,transparent_5px,transparent_10px)_1]">
            <div className="flex items-center gap-[1.5rem]">
              <Image
                className="!w-[6.125rem] rounded-full"
                src={mario}
                quality={100}
                alt=""
              />
              <p className="mb-0">Von Mario Lüddemann</p>
            </div>

            {/* tags */}
            <div className="flex gap-[1rem] flex-wrap">
              <div className="border border-[#002533] border-opacity-80 rounded-full px-[2.25rem] py-[1.25rem]">
                <p className="mb-0 text-[2rem] text-[#002533] text-opacity-80 leading-none">Trading</p>
              </div>

              <div className="border border-[#002533] border-opacity-80 rounded-full px-[2.25rem] py-[1.25rem]">
                <p className="mb-0 text-[2rem] text-[#002533] text-opacity-80 leading-none">Investment</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row-reverse gap-[5.5rem]">
            <div className="relative w-[min(70rem,100%)] lg:w-[min(43rem,100%)] flex-shrink-0">
              <div className="relative lg:sticky lg:top-[12rem] rounded-[.5rem] bg-white border border-[#CFD6D3] p-[2.75rem] after:absolute after:-top-[1rem] after:left-0 after:w-full after:h-[3px] after:bg-[#A38753]">
                <p className="font-display text-[3rem] sm:text-[4rem] leading-none text-[#0F2736] mb-[2rem] pb-[2rem] border-b [border-image:repeating-linear-gradient(to_right,rgba(0,0,0,0.2)_0,rgba(0,0,0,0.2)_5px,transparent_5px,transparent_10px)_1]">Inhaltsverzeichnis</p>

                <div className="flex flex-col items-start">

                </div>
              </div>
            </div>

            <div className="grow richtext richtext-start [&_image]:!w-full [&_image]:!my-[3rem] lg:prose-h2:text-[6rem] prose-headings:mb-[2rem] prose-headings:mt-[4rem] prose-p:text-[#071629] prose-p:text-opacity-70">
              { data.settings.metaImage && <Image src={data.settings.metaImage} alt={data.title} quality={90} /> }
              {/* <p>{data.description}</p> */}
              {data.content && <PortableText value={data.content} />}

              <h2>Wertpapiere: ETCs und ETFs statt physischem Gold</h2>
              <p>
                Statt physischem Gold gibt es auch die Möglichkeit, in Exchange Traded Commodities (ETCs), sogenanntes Xetra-Gold, und Exchange Traded Funds (ETFs) zu investieren, die den Goldpreis nachbilden. Es gibt verschiedene Vorteile und Überlegungen, die mit ETCs und ETFs im Vergleich zu physischem Gold verbunden sind:
              </p>

              <ul>
                <li>
                  Einfache Handelbarkeit: ETCs und ETFs, die den Goldpreis nachbilden, können an Börsen ähnlich wie Aktien gehandelt werden. Dadurch sind sie einfach zu kaufen und zu verkaufen, im Gegensatz zum physischen Erwerb und der Lagerung von Gold.
                </li>
                <li>
                  Liquidität: ETCs und ETFs bieten in der Regel eine hohe Liquidität, da sie an Börsen gehandelt werden. Dies bedeutet, dass Du jederzeit in der Lage bist, Deine Positionen zu verkaufen und Geld daraus zu erhalten.
                </li>
                <li>
                  Diversifikation: ETCs und ETFs ermöglichen es Dir, in Gold zu investieren, ohne Dein Portfolio ausschließlich auf diese eine Anlageklasse zu konzentrieren. Du kannst das Goldinvestment mit anderen Anlagen diversifizieren und eine breitere Risikostreuung erreichen.
                </li>
                <li>
                  Kosten: ETCs und ETFs können in Bezug auf Kosten effizienter sein als der physische Kauf von Gold. Die Verwaltungsgebühren für ETCs und ETFs sind in der Regel niedriger als die Kosten für den Kauf, die Lagerung und die Versicherung von physischem Gold.
                </li>
              </ul>

              <h2>Anlage in Goldfonds</h2>
              <p>
                Goldfonds sind Investmentfonds, die in den Goldmarkt investieren. Sie ermöglichen Anlegern, von der Wertentwicklung des Goldpreises zu profitieren, ohne direkt physisches Gold kaufen zu müssen.
              </p>
              <p>
                Die Wertentwicklung von Goldfonds hängt von der Performance des Goldmarktes und der Anlagestrategie des Fonds ab. Es ist wichtig, die Anlageziele, die Kostenstruktur und die Risikofaktoren des Fonds sorgfältig zu prüfen, bevor man in einen Goldfonds investiert.
              </p>

              <h2>Vorteile einer Anlage in Gold für Dein Portfolio</h2>
              <p>
                Eine Goldanlage bietet mehrere potenzielle Vorteile, die bei Anlegern beliebt sind:
              </p>
              <p>
                Gold wird oft als Wertspeicher betrachtet, der im Laufe der Zeit seinen Wert behält. Es hat eine begrenzte Verfügbarkeit und wird als knappe Ressource angesehen. Historisch gesehen hat Gold dazu beigetragen, den Wert des Vermögens zu erhalten, insbesondere in Krisenzeiten wie der Corona-Krise, Zeiten hoher Inflation oder wirtschaftlicher Unsicherheit.
              </p>
              <ul>
                <li>
                  Gold kann eine Möglichkeit sein, ein Portfolio zu diversifizieren. Durch die Beimischung von Gold zu einem Investmentportfolio können Anleger das Risiko streuen und mögliche Verluste in anderen Anlageklassen abfedern. Gold hat oft eine geringe oder negative Korrelation zu Aktien und Anleihen, was bedeutet, dass es sich oft anders entwickelt als traditionelle Finanzanlagen.
                </li>
                <li>
                  Gold wird oft als &ldquo;sicherer Hafen&rdquo; betrachtet, insbesondere in Zeiten von Marktunsicherheit oder geopolitischen Spannungen. Daher kann es eine gewisse Absicherung gegen verschiedene Risiken wie wirtschaftliche Turbulenzen, Währungsabwertungen und politische Instabilität bieten.
                </li>
                <li>
                  Gold ist eine hochliquide Anlageklasse. Es gibt einen aktiven Markt für den Kauf und Verkauf von Gold, der weltweit zugänglich ist. Bei Bedarf kannst Du Gold relativ schnell und einfach verkaufen und in andere Anlageformen umwandeln.
                </li>
                <li>
                  Gold hat eine langjährige Geschichte als wertvolles Gut und wird weltweit als wertvoll angesehen. Es wird von vielen Kulturen und Nationen akzeptiert und gehandelt, was die Flexibilität und den Wert Deiner Anlage erhöhen kann.
                </li>
              </ul>
              <p>
                Es ist wichtig zu beachten, dass die Wertentwicklung von Gold von verschiedenen Faktoren abhängt und sich nicht immer vorhersagen lässt.
              </p>

              <h2>Welche Nachteile hat eine Goldanlage?</h2>
              <p>
                Im Gegensatz zu anderen Anlageklassen wie Aktien oder Anleihen generiert Gold keine laufenden Erträge. Es ist ein passiver Vermögenswert, dessen Wert hauptsächlich von Preissteigerungen abhängt. Wenn Du regelmäßige Einkünfte aus Deinen Investitionen benötigst, könnte dies ein Nachteil sein.
              </p>
              <p>
                Und obwohl Gold als sicher angesehen wird, unterliegt der Goldpreis dennoch Schwankungen. In turbulenten Zeiten kann der Goldpreis steigen, aber er kann auch fallen, wenn sich die Bedingungen ändern. Es ist wichtig, die Volatilität des Goldmarktes zu verstehen und eine langfristige Perspektive einzunehmen.
              </p>
              <p>
                Außerdem solltest Du beachten, dass die physische Lagerung von Gold mit Kosten verbunden sein kann, insbesondere wenn größere Mengen gekauft werden. Wenn Du Dich für den Kauf physischen Goldes entscheidest, musst Du möglicherweise Sicherheitsvorkehrungen treffen und Gebühren für die sichere Aufbewahrung zahlen. Diese Kosten können den Gesamtertrag Deiner Anlage beeinflussen.
              </p>
              <p>
                Im Vergleich zu anderen Anlageklassen wie Aktien oder Anleihen kann Gold weniger liquide sein. Es könnte schwieriger sein, einen Käufer zu finden, wenn Du Dein Gold verkaufen möchtest, insbesondere bei größeren Mengen oder in Zeiten, in denen die Nachfrage nach Gold geringer ist.
              </p>
              <p>
                Im Gegensatz zu Unternehmen oder Immobilien kann Gold keinen Wert durch operative Gewinne oder Verbesserungen generieren. Der Wert von Gold hängt hauptsächlich von Angebot und Nachfrage sowie von externen Faktoren ab, die den Goldmarkt beeinflussen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer
        data={data.settings?.footer}
        footerType={data.settings?.footerType}
      />
    </>
  )
}