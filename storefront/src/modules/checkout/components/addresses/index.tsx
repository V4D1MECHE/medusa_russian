"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"
import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { SubmitButton } from "@modules/common/components/submit-button"
import BillingAddress from "@modules/checkout/components/billing_address"
import ErrorMessage from "@modules/checkout/components/error-message"
import ShippingAddress from "@modules/checkout/components/shipping-address"
import { Button } from "@/components/Button"
import { Form } from "@/components/Forms"
import { z } from "zod"
import { useCustomer } from "hooks/customer"
import { withReactQueryProvider } from "@lib/util/react-query"

const addressesFormSchema = z
  .object({
    shipping_address: z.object({
      first_name: z.string().min(1),
      last_name: z.string().min(1),
      company: z.string().optional(),
      address_1: z.string().min(1),
      address_2: z.string().optional(),
      city: z.string().min(1),
      postal_code: z.string().min(1),
      province: z.string().optional(),
      country_code: z.string().min(2),
      phone: z.string().optional(),
    }),
  })
  .and(
    z.discriminatedUnion("same_as_billing", [
      z.object({
        same_as_billing: z.literal("on"),
      }),
      z.object({
        same_as_billing: z.literal("off").optional(),
        billing_address: z.object({
          first_name: z.string().min(1),
          last_name: z.string().min(1),
          company: z.string().optional(),
          address_1: z.string().min(1),
          address_2: z.string().optional(),
          city: z.string().min(1),
          postal_code: z.string().min(1),
          province: z.string().optional(),
          country_code: z.string().min(2),
          phone: z.string().optional(),
        }),
      }),
    ])
  )

const Addresses = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const [sameAsBilling, setSameAsBilling] = React.useState(true)

  const { data: customer } = useCustomer()

  React.useEffect(() => {
    if (cart?.shipping_address && cart?.billing_address) {
      setSameAsBilling(
        compareAddresses(cart.shipping_address, cart.billing_address)
      )
    }
  }, [cart?.billing_address, cart?.shipping_address])

  const toggleSameAsBilling = React.useCallback(() => {
    setSameAsBilling((prev) => !prev)
  }, [setSameAsBilling])

  const [state, formAction, isPending] = React.useActionState(
    setAddresses,
    null
  )

  const onSubmit = (values: z.infer<typeof addressesFormSchema>) => {
    React.startTransition(() => {
      formAction(values)
    })
  }

  React.useEffect(() => {
    if (isOpen && state?.success) {
      router.push(pathname + "?step=shipping", { scroll: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

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
            2. Детали доставки
          </p>
        </div>
        {!isOpen && cart?.shipping_address && (
          <Button
            variant="link"
            onPress={() => {
              router.push(pathname + "?step=delivery")
            }}
          >
            Изменить
          </Button>
        )}
      </div>
      {isOpen ? (
        <Form
          schema={addressesFormSchema}
          onSubmit={onSubmit}
          formProps={{
            id: `email`,
          }}
          defaultValues={
            sameAsBilling
              ? {
                  shipping_address: cart?.shipping_address || {
                    first_name: "",
                    last_name: "",
                    company: "",
                    province: "",
                    city: "",
                    postal_code: "",
                    country_code: "",
                    address_1: "",
                    address_2: "",
                    phone: "",
                  },
                  same_as_billing: "on",
                }
              : {
                  shipping_address: cart?.shipping_address || {
                    first_name: "",
                    last_name: "",
                    company: "",
                    province: "",
                    city: "",
                    postal_code: "",
                    country_code: "",
                    address_1: "",
                    address_2: "",
                    phone: "",
                  },
                  same_as_billing: "off",
                  billing_address: cart?.billing_address || {
                    first_name: "",
                    last_name: "",
                    company: "",
                    province: "",
                    city: "",
                    postal_code: "",
                    country_code: "",
                    address_1: "",
                    address_2: "",
                    phone: "",
                  },
                }
          }
        >
          {({ watch }) => {
            const shippingData = watch("shipping_address")
            const isDisabled =
              !customer?.addresses?.length &&
              !Object.values(shippingData).some((value) => value)
            return (
              <>
                <ShippingAddress
                  customer={customer || null}
                  checked={sameAsBilling}
                  onChange={toggleSameAsBilling}
                  cart={cart}
                />

                {!sameAsBilling && (
                  <BillingAddress cart={cart} customer={customer || null} />
                )}

                <SubmitButton
                  className="mt-8"
                  isLoading={isPending}
                  isDisabled={isDisabled}
                >
                  Далее
                </SubmitButton>
                <ErrorMessage error={state?.error} />
              </>
            )
          }}
        </Form>
      ) : cart?.shipping_address ? (
        <div className="flex flex-col gap-4">
          <div className="flex max-sm:flex-col flex-wrap gap-y-2 gap-x-12">
            <div className="text-grayscale-500">Адрес доставки</div>
            <div className="text-grayscale-600">
              {[
                cart.shipping_address.first_name,
                cart.shipping_address.last_name,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                cart.shipping_address.address_1,
                cart.shipping_address.address_2,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[cart.shipping_address.postal_code, cart.shipping_address.city]
                .filter(Boolean)
                .join(" ")}
              <br />
              {cart.shipping_address.country_code?.toUpperCase()}
              <br />
              {cart.shipping_address.phone}
            </div>
          </div>
          {sameAsBilling || cart.billing_address ? (
            <div className="flex max-sm:flex-col flex-wrap gap-y-2 gap-x-17">
              <div className="text-grayscale-500">Адрес оплаты</div>
              <div className="text-grayscale-600">
                {sameAsBilling ? (
                  "Совпадает с адресом доставки"
                ) : (
                  <>
                    {[
                      cart.billing_address?.first_name,
                      cart.billing_address?.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {[
                      cart.billing_address?.address_1,
                      cart.billing_address?.address_2,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {[
                      cart.billing_address?.postal_code,
                      cart.billing_address?.city,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    <br />
                    {cart.billing_address?.country_code?.toUpperCase()}
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export default withReactQueryProvider(Addresses)