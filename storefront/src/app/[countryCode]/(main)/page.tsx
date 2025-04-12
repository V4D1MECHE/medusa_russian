import { Metadata } from "next"
import Image from "next/image"
import { getRegion } from "@lib/data/regions"
import { getProductTypesList } from "@lib/data/product-types"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedLink } from "@/components/LocalizedLink"
import { CollectionsSection } from "@/components/CollectionsSection"

export const metadata: Metadata = {
  title: "Medusa Next.js Шаблон Стартера",
  description:
    "Производительный фронтенд шаблон для электронной коммерции с Next.js 14 и Medusa.",
}

const ProductTypesSection: React.FC = async () => {
  const productTypes = await getProductTypesList(0, 20, [
    "id",
    "value",
    "metadata",
  ])

  if (!productTypes) {
    return null
  }

  return (
    <Layout className="mb-26 md:mb-36 max-md:gap-x-2">
      <LayoutColumn>
        <h3 className="text-md md:text-2xl mb-8 md:mb-15 rounded-md">Наши товары</h3>
      </LayoutColumn>
      {productTypes.productTypes.map((productType, index) => (
        <LayoutColumn
          key={productType.id}
          start={index % 2 === 0 ? 1 : 7}
          end={index % 2 === 0 ? 7 : 13}
        >
          <LocalizedLink href={`/store?type=${productType.value}`} className="rounded-md">
            {typeof productType.metadata?.image === "object" &&
              productType.metadata.image &&
              "url" in productType.metadata.image &&
              typeof productType.metadata.image.url === "string" && (
                <Image
                  src={productType.metadata.image.url}
                  width={1200}
                  height={900}
                  alt={productType.value}
                  className="mb-2 md:mb-8 rounded-md"
                />
              )}
            <p className="text-xs md:text-md rounded-md">{productType.value}</p>
          </LocalizedLink>
        </LayoutColumn>
      ))}
    </Layout>
  )
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/living-room-gray-armchair-two-seater-sofa.png"
          width={2880}
          height={1500}
          alt="Гостиная с серым креслом и двухместным диваном"
          className="md:h-screen md:object-cover rounded-md"
        />
      </div>
      <div className="pt-8 pb-26 md:pt-26 md:pb-36">
        <Layout className="mb-26 md:mb-36">
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md max-md:mb-6 md:text-2xl rounded-md">
              Преобразите ваше жилое пространство с непревзойденным комфортом и стилем
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <div className="flex items-center h-full">
              <div className="md:text-md rounded-md">
                <p>Найдите свой идеальный диван сегодня</p>
                <LocalizedLink href="/store" variant="underline">
                  Исследовать сейчас
                </LocalizedLink>
              </div>
            </div>
          </LayoutColumn>
        </Layout>
        <ProductTypesSection />
        <CollectionsSection className="mb-22 md:mb-36" />
        <Layout>
          <LayoutColumn className="col-span-full">
            <h3 className="text-md md:text-2xl mb-8 md:mb-16 rounded-md">
              О MiLi
            </h3>
            <Image
              src="/images/content/gray-sofa-against-concrete-wall.png"
              width={2496}
              height={1400}
              alt="Серый диван на фоне бетонной стены"
              className="mb-8 md:mb-16 max-md:aspect-[3/2] max-md:object-cover rounded-md"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, md: 7 }}>
            <h2 className="text-md md:text-2xl rounded-md">
              В MiLi мы верим, что диван - это сердце каждого дома.
            </h2>
          </LayoutColumn>
          <LayoutColumn
            start={{ base: 1, md: 8 }}
            end={13}
            className="mt-6 md:mt-19"
          >
            <div className="md:text-md rounded-md">
              <p className="mb-5 md:mb-9 rounded-md">
                Мы стремимся предоставлять высококачественные, продуманно
                спроектированные диваны, которые легко сочетают комфорт и стиль.
              </p>
              <p className="mb-5 md:mb-3 rounded-md">
                Наша миссия - превратить ваше жилое пространство в святилище
                релаксации и красоты, с продуктами, созданными на долгие годы.
              </p>
              <LocalizedLink href="/about" variant="underline">
                Узнать больше о MiLi
              </LocalizedLink>
            </div>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}