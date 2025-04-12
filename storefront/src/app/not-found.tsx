import { Metadata } from "next"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink } from "@/components/LocalizedLink"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "404",
  description: "Что-то пошло не так",
}

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Layout className="pt-30 pb-20 md:pt-47 md:pb-36">
        <LayoutColumn start={1} end={{ base: 13, lg: 7, xl: 8 }}>
          <h1 className="text-xl md:text-3xl max-lg:mb-8 text-black">
            404
            <br /> Страница не найдена
          </h1>
        </LayoutColumn>
        <LayoutColumn start={{ base: 1, lg: 7, xl: 8 }} end={13}>
          <div className="md:text-md mb-8 lg:pt-18 text-black">
            <p>
              Страница, которую вы ищете, не существует или произошла ошибка. 
              Вернитесь назад или перейдите на главную страницу.
            </p>
          </div>
          <LocalizedButtonLink href="/">Вернуться на главную</LocalizedButtonLink>
        </LayoutColumn>
      </Layout>
      <Footer />
    </>
  )
}