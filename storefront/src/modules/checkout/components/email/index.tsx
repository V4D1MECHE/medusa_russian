"use client"

import React, { startTransition } from "react"
import { useActionState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { HttpTypes } from "@medusajs/types"
import { z } from "zod"

import { setEmail } from "@lib/data/cart"
import { SubmitButton } from "@modules/common/components/submit-button"
import { Button } from "@/components/Button"
import { Form, InputField } from "@/components/Forms"
// import { UiCloseButton, UiDialog, UiDialogTrigger } from "@/components/Dialog"
// import { UiModal, UiModalOverlay } from "@/components/ui/Modal"
// import { Icon } from "@/components/Icon"
// import { LoginForm } from "@modules/auth/components/LoginForm"
import ErrorMessage from "@modules/checkout/components/error-message"
// import { useCustomer } from "hooks/customer"
import { withReactQueryProvider } from "@lib/util/react-query"

export const emailFormSchema = z.object({
  email: z.string().min(3).email("Введите корректный email адрес."),
})

const Email = ({
  cart,
  countryCode,
}: {
  cart: HttpTypes.StoreCart | null
  countryCode: string
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // const { data: customer } = useCustomer()

  const isOpen = searchParams.get("step") === "email"

  const [state, formAction, isPending] = useActionState(setEmail, null)

  const onSubmit = (values: z.infer<typeof emailFormSchema>) => {
    startTransition(() => {
      formAction({ email: values.email, country_code: countryCode })
    })
  }

  React.useEffect(() => {
    if (isOpen && state?.success) {
      router.push(pathname + "?step=delivery", { scroll: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <>
      <div className="flex justify-between mb-6 md:mb-8">
        <div className="flex justify-between flex-wrap gap-5 flex-1">
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
          {/* {isOpen && !customer && (
            <div className="text-grayscale-500">
              <p>
                Уже есть аккаунт? Не беспокойтесь, просто{" "}
                <UiDialogTrigger>
                  <Button variant="link">войдите.</Button>
                  <UiModalOverlay>
                    <UiModal className="relative max-w-108">
                      <UiDialog>
                        <p className="text-md mb-10">Вход</p>
                        <LoginForm
                          redirectUrl={`/${countryCode}/checkout?step=delivery`}
                        />
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
          )} */}
        </div>
        {!isOpen && (
          <Button
            variant="link"
            onPress={() => {
              router.push(pathname + "?step=email")
            }}
          >
            Изменить
          </Button>
        )}
      </div>
      {isOpen ? (
        <Form
          schema={emailFormSchema}
          onSubmit={onSubmit}
          formProps={{
            id: `email`,
          }}
          defaultValues={{ email: cart?.email || "" }}
        >
          {({ watch }) => {
            const formValue = watch("email")
            return (
              <>
                <InputField
                  placeholder="Email"
                  name="email"
                  inputProps={{
                    autoComplete: "email",
                    title: "Введите корректный email адрес.",
                  }}
                  data-testid="shipping-email-input"
                />
                <SubmitButton
                  className="mt-8"
                  isLoading={isPending}
                  isDisabled={!formValue}
                >
                  Далее
                </SubmitButton>
                <ErrorMessage error={state?.error} />
              </>
            )
          }}
        </Form>
      ) : cart?.email ? (
        <ul className="flex max-sm:flex-col flex-wrap gap-y-2 gap-x-34">
          <li className="text-grayscale-500">Email</li>
          <li className="text-grayscale-600 break-all">{cart.email}</li>
        </ul>
      ) : null}
    </>
  )
}

export default withReactQueryProvider(Email)