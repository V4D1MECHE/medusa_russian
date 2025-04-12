"use client"

import * as React from "react"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Drawer } from "@/components/Drawer"
import { LocalizedLink } from "@/components/LocalizedLink"
// import { RegionSwitcher } from "@/components/RegionSwitcher"
// import { SearchField } from "@/components/SearchField"
import { useSearchParams } from "next/navigation"

export const HeaderDrawer: React.FC<{
  countryOptions: {
    country: string | undefined
    region: string
    label: string | undefined
  }[]
}> = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("query")

  React.useEffect(() => {
    if (searchQuery) setIsMenuOpen(false)
  }, [searchQuery])

  return (
    <>
      <Button
        variant="ghost"
        className="p-1 group-data-[light=true]:md:text-white"
        onPress={() => setIsMenuOpen(true)}
        aria-label="Открыть меню"
      >
        <Icon name="menu" className="w-6 h-6" wrapperClassName="w-6 h-6" />
      </Button>
      <Drawer
        animateFrom="left"
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        className="rounded-none !p-0"
      >
        {({ close }) => (
          <>
            <div className="flex flex-col text-white h-full">
              <div className="flex items-center justify-between pb-6 mb-8 pt-5 w-full border-b border-white px-8">
                {/* <SearchField
                  countryOptions={countryOptions}
                  isInputAlwaysShown
                /> */}
                <button onClick={close} aria-label="Закрыть меню">
                  <Icon name="close" className="w-6" />
                </button>
              </div>
              <div className="text-lg flex flex-col gap-8 font-medium px-8">
                <LocalizedLink
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О нас
                </LocalizedLink>
                <LocalizedLink
                  href="/inspiration"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Вдохновение
                </LocalizedLink>
                <LocalizedLink
                  href="/store"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Магазин
                </LocalizedLink>
              </div>
              {/* <RegionSwitcher
                countryOptions={countryOptions}
                className="mt-auto ml-8 mb-8"
                selectButtonClassName="max-md:text-base gap-2 p-1 w-auto"
                selectIconClassName="text-current w-6 h-6"
              /> */}
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}