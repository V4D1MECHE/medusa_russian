"use client"

import * as React from "react"
import { Form, InputField } from "@/components/Forms"
import { SubmitButton } from "@modules/common/components/submit-button"
import { forgotPassword } from "@lib/data/customer"
import { LocalizedButtonLink } from "@/components/LocalizedLink"
import { z } from "zod"

const forgotPasswordFormSchema = z.object({
  email: z.string().min(3).email(),
})

export const ForgotPasswordForm: React.FC = () => {
  const [formState, formAction] = React.useActionState(forgotPassword, {
    state: "initial",
  })

  const onSubmit = (values: z.infer<typeof forgotPasswordFormSchema>) => {
    React.startTransition(() => {
      formAction(values)
    })
  }

  if (formState.state === "success") {
    return (
      <>
        <h1 className="text-xl md:text-2xl mb-8">
          Ваш пароль ждет вас!
        </h1>
        <div className="mb-8">
          <p>
            Мы отправили вам электронное письмо с дальнейшими инструкциями по восстановлению доступа к вашему аккаунту.
          </p>
        </div>
        <LocalizedButtonLink href="/" isFullWidth>
          Вернуться на главную
        </LocalizedButtonLink>
      </>
    )
  }

  return (
    <Form onSubmit={onSubmit} schema={forgotPasswordFormSchema}>
      <h1 className="text-xl md:text-2xl mb-8">Забыли пароль?</h1>
      <div className="mb-8">
        <p>
          Введите ваш email ниже, и мы отправим вам инструкции по сбросу пароля.
        </p>
      </div>
      <InputField
        placeholder="Email"
        name="email"
        className="flex-1 mb-8"
        type="email"
      />
      {formState.state === "error" && (
        <p className="text-red-primary text-sm">{formState.error}</p>
      )}
      <SubmitButton isFullWidth>Сбросить пароль</SubmitButton>
    </Form>
  )
}