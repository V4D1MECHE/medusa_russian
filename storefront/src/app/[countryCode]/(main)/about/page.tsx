import { Metadata } from "next"
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { Layout, LayoutColumn } from "@/components/Layout"

export const metadata: Metadata = {
  title: "О нас",
  description: "Узнайте больше о MiLi",
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

export default function AboutPage() {
  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/living-room-gray-three-seater-sofa.png"
          width={2880}
          height={1500}
          alt="Гостиная с серым трехместным диваном"
          className="md:h-screen md:object-cover rounded-md"
        />
      </div>
      <div className="pt-8 md:pt-26 pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl rounded-md">
              В MiLi мы верим, что диван - это сердце каждого дома.
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md lg:mt-18 rounded-md">
              <p className="mb-5 lg:mb-9 rounded-md">
                Добро пожаловать в MiLi, где мы верим, что комфорт и стиль
                должны быть легко переплетены. Наша миссия - помочь вам
                создать красивые, функциональные пространства, которые приносят тепло и
                расслабление в ваш дом.
              </p>
              <p className="rounded-md">
                Каждый предмет в нашей коллекции разработан с заботой, сочетая
                вневременное мастерство с современной эстетикой, чтобы предложить вам
                идеальный баланс между формой и функцией.
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn>
            <Image
              src="/images/content/living-room-black-armchair-dark-gray-sofa.png"
              width={2496}
              height={1404}
              alt="Гостиная с черным креслом и темно-серым диваном"
              className="mt-26 lg:mt-36 mb-8 lg:mb-26 rounded-md"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 8 }}>
            <h3 className="text-md lg:mb-10 mb-6 md:text-2xl rounded-md">
              Мы здесь, чтобы сделать ваше жилое пространство истинным отражением вашего
              личного стиля.
            </h3>
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 6 }}>
            <div className="mb-16 lg:mb-26 rounded-md">
              <p className="mb-5 md:mb-9 rounded-md">
                В основе нашего бренда лежит глубокая приверженность качеству. Мы
                понимаем, что диван - это не просто еще один предмет
                мебели; это место, где вы расслабляетесь, собираетесь с близкими,
                и создаете воспоминания. Именно поэтому мы используем только лучшие
                материалы и ткани, гарантируя, что каждый диван, который мы предлагаем,
                создан на долгие годы.
              </p>
              <p className="rounded-md">
                От роскошной кожи и мягкого льна до высокоэффективных
                тканей, каждый материал тщательно подобран для своей прочности
                и красоты. Наше внимание к деталям распространяется на каждый стежок и
                шов, гарантируя, что ваш диван будет не только выглядеть потрясающе,
                но и выдержит испытание временем.
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 2, lg: 1 }} end={{ base: 12, lg: 7 }}>
            <Image
              src="/images/content/gray-one-seater-sofa-wooden-coffee-table.png"
              width={1200}
              height={1600}
              alt="Серое одноместное кресло и деревянный журнальный столик"
              className="mb-16 lg:mb-46 rounded-md"
            />
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="mb-6 lg:mb-20 xl:mb-36 rounded-md">
              <p className="rounded-md">
                Наша философия дизайна основана на создании предметов, которые
                одновременно красивы и практичны. Вдохновленные скандинавской
                простотой, современной роскошью и вечной классикой, наши
                коллекции подобраны так, чтобы соответствовать широкому спектру вкусов и
                образов жизни. Мы понимаем, что каждый дом уникален, поэтому
                предлагаем разнообразные стили, цвета и текстуры, чтобы помочь
                вам найти идеальное сочетание. Предпочитаете ли вы современные четкие линии
                или мягкие, приглашающие силуэты, у нас есть что-то для каждого
                пространства и индивидуальности.
              </p>
            </div>
            <div className="md:text-md max-lg:mb-26 rounded-md">
              <p className="rounded-md">
                Мы верим, что отличный дизайн должен быть экологически
                сознательным, поэтому мы стремимся минимизировать наш экологический
                след через ответственный подход к выбору источников и практик производства.
                Наша приверженность устойчивому развитию гарантирует, что наши продукты
                не только красивы, но и бережны к планете.
              </p>
            </div>
          </LayoutColumn>
        </Layout>
        <Image
          src="/images/content/living-room-gray-three-seater-puffy-sofa.png"
          width={2880}
          height={1618}
          alt="Гостиная с серым трехместным пышным диваном"
          className="mb-8 lg:mb-26 rounded-md"
        />
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl rounded-md">
              Наши клиенты находятся в центре всего, что мы делаем!
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md lg:mt-18 rounded-md">
              <p className="mb-5 lg:mb-9 rounded-md">
                Наша команда здесь, чтобы помочь вам в процессе выбора, предлагая
                персонализированную поддержку, чтобы убедиться, что вы найдете именно то,
                что ищете.
              </p>
              <p className="rounded-md">
                Мы не просто продаем диваны - мы помогаем вам
                создавать пространства, где вы можете расслабиться, восстановить силы и создать
                незабываемые воспоминания. Спасибо, что выбрали MiLi как часть
                вашего дома!
              </p>
            </div>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}