import { Metadata } from "next"
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { Layout, LayoutColumn } from "@/components/Layout"
import { CollectionsSection } from "@/components/CollectionsSection"

export const metadata: Metadata = {
  title: "Вдохновение",
  description: "Вдохновитесь нашими последними коллекциями",
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions.flatMap((r) =>
      r.countries
        ? r.countries
            .map((c) => c.iso_2)
            .filter(
              (value): value is string =>
                typeof value === "string" && Boolean(value)
            )
        : []
    )
  )

  const staticParams = countryCodes.map((countryCode) => ({
    countryCode,
  }))

  return staticParams
}

export default function InspirationPage() {
  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/living-room-dark-green-three-seater-sofa.png"
          width={2880}
          height={1500}
          alt="Гостиная с темно-зеленым трехместным диваном"
          className="md:h-screen md:object-cover mb-8 md:mb-26 rounded-md"
        />
      </div>
      <div className="pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl rounded-md">
              Изогнутый диван Astrid - это шедевр минимализма и роскоши.
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135 rounded-md">
              <p>
                Наша философия дизайна основана на создании предметов, которые одновременно красивы и практичны. Вдохновлены скандинавской простотой, современной роскошью и неподвластной времени классикой.
              </p>
            </div>
          </LayoutColumn>
        </Layout>
        <Image
          src="/images/content/living-room-brown-armchair-gray-corner-sofa.png"
          width={2496}
          height={1404}
          alt="Гостиная с коричневым креслом и угловым серым диваном"
          className="mt-26 md:mt-36 mb-8 md:mb-26 rounded-md"
        />
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl rounded-md">
              Диваны Haven отличаются минималистичным дизайном, нейтральными цветами и высококачественными текстурами.
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135 rounded-md">
              <p>
                Идеально подходит для тех, кто ищет комфорт с чистой и сдержанной эстетикой. Эта коллекция привносит в вашу гостиную суть скандинавской элегантности.
              </p>
            </div>
          </LayoutColumn>
        </Layout>
        <Image
          src="/images/content/living-room-gray-two-seater-puffy-sofa.png"
          width={2880}
          height={1618}
          alt="Гостиная с серым двухместным пышным диваном"
          className="md:h-screen md:object-cover mt-26 md:mt-36 mb-8 md:mb-26 rounded-md"
        />
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl rounded-md">
              Oslo Drift наполнен игривыми текстурами и яркими узорами с эклектичной атмосферой.
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135 rounded-md">
              <p>
                Независимо от того, ищете ли вы смелые акцентные предметы или утонченную элегантность, эта коллекция дополнит ваш дом ноткой гламура, изысканности и непревзойденного уюта.
              </p>
            </div>
          </LayoutColumn>
        </Layout>
        <CollectionsSection className="mt-26 md:mt-36" />
      </div>
    </>
  )
}