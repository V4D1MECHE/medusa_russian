"use client"

import { useParams, usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { Layout, LayoutColumn } from "@/components/Layout"
// import { NewsletterForm } from "@/components/NewsletterForm"
import { LocalizedLink } from "@/components/LocalizedLink"

export const Footer: React.FC = () => {
  const pathName = usePathname()
  const { countryCode } = useParams()
  const currentPath = pathName.split(`/${countryCode}`)[1]

  const isAuthPage = currentPath === "/register" || currentPath === "/login"

  return (
    <div
      className={twMerge(
        "bg-grayscale-50 py-8 md:py-20 rounded-t-lg",
        isAuthPage && "hidden"
      )}
    >
      <Layout>
        <LayoutColumn className="col-span-13">
          <div className="flex max-lg:flex-col justify-between md:gap-20 max-md:px-4">
            <div className="flex flex-1 max-lg:w-full max-lg:order-2 max-sm:flex-col justify-between sm:gap-30 lg:gap-20 md:items-center">
              <div className="max-w-35 md:flex-1 max-md:mb-9">
                <h1 className="text-lg md:text-xl mb-2 md:mb-6 leading-none md:leading-[0.9]">
                  MiLi
                </h1>
                <p className="text-xs">
                  &copy; {new Date().getFullYear()}, MiLi
                </p>
              </div>
              <div className="flex gap-10 xl:gap-18 max-md:text-xs flex-1 justify-between lg:justify-end">
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <LocalizedLink href="/">FAQ</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">Помощь</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">Доставка</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">Возврат</LocalizedLink>
                  </li>
                </ul>
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <a
                      href="https://www.vk.com/agiloltd/"
                      target="_blank"
                    >
                      VK
                    </a>
                  </li>
                  <li>
                    <a href="https://tiktok.com" target="_blank">
                      TikTok
                    </a>
                  </li>
                  <li>
                    <a href="https://pinterest.com" target="_blank">
                      Pinterest
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <LocalizedLink href="/privacy-policy">
                      Политика конфиденциальности
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/cookie-policy">
                      Политика использования файлов cookie
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/terms-of-use">
                      Условия использования
                    </LocalizedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </LayoutColumn>
      </Layout>
    </div>
  )
}