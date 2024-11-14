"use client"

import { useActionState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"

import { setEmail } from "@lib/data/cart"
import { Button } from "@/components/Button"
import { Input } from "@/components/Forms"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"
import { UiCloseButton, UiDialog, UiDialogTrigger } from "@/components/Dialog"
import { UiModal, UiModalOverlay } from "@/components/ui/Modal"
import { Icon } from "@/components/Icon"

const Email = ({
  cart,
  customer,
  countryCode,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  countryCode: string
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "email"

  const [state, formAction] = useActionState(setEmail, null)

  return (
    <>
      <div className="flex justify-between mb-8">
        <div className="flex justify-between flex-1">
          <div>
            <p
              className={twJoin(
                "transition-fontWeight duration-75",
                isOpen && "font-semibold"
              )}
            >
              1. Email
            </p>
          </div>
          {isOpen && (
            <div className="text-grayscale-500">
              <p>
                Already have an account? No worries, just{" "}
                <UiDialogTrigger>
                  <Button variant="link">log in.</Button>
                  <UiModalOverlay>
                    <UiModal className="relative max-w-108">
                      <UiDialog>
                        <p className="text-md mb-10">Log in</p>
                        <div className="flex flex-col gap-10 mb-5">
                          <Input
                            type="email"
                            placeholder="Email"
                            required
                            variant="outline"
                          />
                          <Input
                            type="password"
                            placeholder="Password"
                            required
                            variant="outline"
                          />
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-grayscale-500 mb-10"
                        >
                          Forgotten password?
                        </Button>
                        <Button isFullWidth>Log in</Button>
                        <UiCloseButton
                          variant="ghost"
                          className="absolute top-4 right-6 p-0"
                        >
                          <Icon name="close" className="w-6 h-6" />
                        </UiCloseButton>
                      </UiDialog>
                    </UiModal>
                  </UiModalOverlay>
                </UiDialogTrigger>
              </p>
            </div>
          )}
        </div>
        {!isOpen && (
          <Button
            variant="link"
            onPress={() => {
              router.push(pathname + "?step=email")
            }}
          >
            Change
          </Button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <input type="hidden" name="country_code" value={countryCode} />

          <Input
            placeholder="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            defaultValue={cart?.email || customer?.email}
            required
            data-testid="shipping-email-input"
            variant="outline"
          />
          <SubmitButton className="mt-6">Next</SubmitButton>
          <ErrorMessage error={state} />
        </form>
      ) : cart?.email ? (
        <ul className="flex gap-16">
          <li className="text-grayscale-500">Email</li>
          <li>{cart.email}</li>
        </ul>
      ) : null}
    </>
  )
}

export default Email
