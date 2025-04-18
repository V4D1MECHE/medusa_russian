"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { CreditCard } from "@medusajs/icons"
import { CardElement } from "@stripe/react-stripe-js"
import { PaymentMethod, StripeCardElementOptions } from "@stripe/stripe-js"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"
// import { capitalize } from "lodash"

import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { setPaymentMethod } from "@lib/data/cart"

import PaymentContainer from "@modules/checkout/components/payment-container"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentCardButton from "@modules/checkout/components/payment-card-button"

import { Button } from "@/components/Button"
import { UiRadioGroup } from "@/components/ui/Radio"
import { Input } from "@/components/Forms"

const Payment = ({
  cart,
  availablePaymentMethods,
  paymentMethod,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: HttpTypes.StorePaymentProvider[]
  paymentMethod: PaymentMethod | null
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  // const paidByGiftcard =
  //   cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    activeSession && cart.shipping_methods && cart.shipping_methods.length !== 0

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#050505",
          "::placeholder": {
            color: "#808080",
          },
          fontSize: "16px",
        },
      },
      classes: {
        base: "pt-[18px] pb-1 block w-full h-14.5 px-4 mt-0 border rounded-lg appearance-none focus:outline-none focus:ring-0 border-grayscale-200 hover:border-grayscale-500 focus:border-grayscale-500 transition-all ease-in-out",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const handleRemoveCard = useCallback(async () => {
    if (!activeSession?.id) {
      return
    }

    try {
      await setPaymentMethod(activeSession.id, null)
      // setCardBrand(null)
      setCardComplete(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Не удалось удалить карту")
    }
  }, [activeSession?.id])

  useEffect(() => {
    if (paymentMethod) {
      // setCardBrand(capitalize(paymentMethod?.card?.brand))
      setCardComplete(true)
    }
  }, [paymentMethod])

  return (
    <>
      <div className="flex justify-between mb-6 md:mb-8 border-t border-grayscale-200 pt-8 mt-8">
        <div>
          <p
            className={twJoin(
              "transition-fontWeight duration-75",
              isOpen && "font-semibold"
            )}
          >
            4. Оплата
          </p>
        </div>
        {!isOpen && paymentReady && (
          <Button variant="link" onPress={handleEdit}>
            Изменить
          </Button>
        )}
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        {availablePaymentMethods.length && (
          <>
            <UiRadioGroup
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
              aria-label="Способы оплаты"
            >
              {availablePaymentMethods
                .sort((a, b) => {
                  return a.id > b.id ? 1 : -1
                })
                .map((paymentMethod) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      key={paymentMethod.id}
                    />
                  )
                })}
            </UiRadioGroup>
            {isStripe && stripeReady && (
              <div className="mt-5">
                {isStripeFunc(selectedPaymentMethod) &&
                  (paymentMethod?.card?.brand ? (
                    <Input
                      value={"**** **** **** " + paymentMethod?.card.last4}
                      placeholder="Номер карты"
                      disabled={true}
                    />
                  ) : (
                    <CardElement
                      options={useOptions as StripeCardElementOptions}
                      onChange={(e) => {
                        // setCardBrand(
                        //   e.brand &&
                        //     e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                        // )
                        setError(e.error?.message || null)
                        setCardComplete(e.complete)
                      }}
                    />
                  ))}
              </div>
            )}
          </>
        )}

        {/* {paidByGiftcard && (
          <div className="flex gap-10">
            <div className="text-grayscale-500">Способ оплаты</div>
            <div>Подарочная карта</div>
          </div>
        )} */}
        <ErrorMessage
          error={error}
          data-testid="payment-method-error-message"
        />
        {paymentMethod && isStripeFunc(selectedPaymentMethod) && (
          <Button
            className="mt-6 mr-6"
            onPress={handleRemoveCard}
            isLoading={isLoading}
            isDisabled={!cardComplete}
            data-testid="submit-payment-button"
          >
            Изменить карту
          </Button>
        )}
        <PaymentCardButton
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedPaymentMethod={selectedPaymentMethod}
          createQueryString={createQueryString}
          cart={cart}
          cardComplete={cardComplete}
        />
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="flex flex-col gap-4">
            <div className="flex max-sm:flex-col flex-wrap gap-y-2 gap-x-12">
              <div className="text-grayscale-500">Способ оплаты</div>
              <div className="text-grayscale-600">
                {paymentInfoMap[selectedPaymentMethod]?.title ||
                  selectedPaymentMethod}
              </div>
            </div>
            
          </div> /* : paidByGiftcard ? (
          <div className="flex gap-10">
            <div className="text-grayscale-500">Способ оплаты</div>
            <div>Подарочная карта</div>
          </div>
        ) */
        ) : null}
      </div>
    </>
  )
}

export default Payment