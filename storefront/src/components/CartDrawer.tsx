"use client"

import * as React from "react"
import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"
import CartTotals from "@modules/cart/components/cart-totals"
import { LocalizedButtonLink, LocalizedLink } from "@/components/LocalizedLink"
import { Drawer } from "@/components/Drawer"
import { Button } from "@/components/Button"
import DiscountCode from "@modules/cart/components/discount-code"
import { Icon } from "@/components/Icon"
import { getCheckoutStep } from "@modules/cart/utils/getCheckoutStep"

// TODO: move cart loading to client side
export const CartDrawer: React.FC<{
  cart?: HttpTypes.StoreCart | null
  children: React.ReactNode
}> = ({ cart, children }) => {
  const step = getCheckoutStep(cart as HttpTypes.StoreCart)

  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false)

  return (
    <>
      <Button
        onPress={() => setIsCartDrawerOpen(true)}
        variant="ghost"
        className="p-1 group-data-[light=true]:md:text-white group-data-[sticky=true]:md:text-black"
        aria-label="Открыть корзину"
      >
        {children}
      </Button>
      <Drawer
        colorScheme="light"
        animateFrom="right"
        isOpen={isCartDrawerOpen}
        onOpenChange={setIsCartDrawerOpen}
        className="max-sm:max-w-100 max-w-139 max-sm:px-6 px-12 pt-10"
      >
        {({ close }) => (
          <>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-md">Корзина</p>
              </div>
              <button onClick={close} aria-label="Закрыть корзину">
                <Icon name="close" className="w-6" />
              </button>
            </div>
            {cart?.items?.length ? (
              <>
                <div className="pb-8 pr-3 sm:pr-4 overflow-y-scroll">
                  {cart?.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => {
                      return (
                        <Item
                          key={item.id}
                          item={item}
                          className="py-8 last:pb-0 last:border-b-0"
                        />
                      )
                    })}
                </div>
                <div className="sticky left-0 bg-white bottom-0 pt-4 border-t border-grayscale-200 mt-auto">
                  <CartTotals isPartOfCartDrawer cart={cart} />
                  <DiscountCode cart={cart} className="mt-6" />
                  <LocalizedButtonLink
                    href={`/checkout/?step=${step}`}
                    isFullWidth
                    className="mt-4"
                  >
                    Перейти к оформлению
                  </LocalizedButtonLink>
                </div>
              </>
            ) : (
              <>
                <p className="md:text-sm max-sm:mr-10 mb-6 mt-2">
                  В вашей корзине пусто. Давайте это исправим, используйте ссылку ниже, чтобы начать просматривать наши товары.
                </p>
                <div>
                  <LocalizedLink
                    href="/store"
                    onClick={() => {
                      setIsCartDrawerOpen(false)
                    }}
                  >
                    Просмотреть товары
                  </LocalizedLink>
                </div>
              </>
            )}
          </>
        )}
      </Drawer>
    </>
  )
}