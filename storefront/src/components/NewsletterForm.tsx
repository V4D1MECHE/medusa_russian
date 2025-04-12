"use client"

import * as React from "react"
import { Button } from "@/components/Button"
import { Form, InputField } from "@/components/Forms"
import { LocalizedLink } from "@/components/LocalizedLink"
import { z } from "zod"

const newsletterFormSchema = z.object({
  email: z.string().min(3).email(),
})

export const NewsletterForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <div className={className}>
      <h2 className="text-md md:text-lg mb-2 md:mb-1">Подпишитесь на нашу рассылку</h2>
      {isSubmitted ? (
        <p className="max-md:text-xs">
          Спасибо за подписку на нашу рассылку!
        </p>
      ) : (
        <>
          <p className="max-md:text-xs mb-4">
            Мы также будем отправлять вам наши скидочные купоны!
          </p>
          <Form
            onSubmit={() => {
              setIsSubmitted(true)
            }}
            schema={newsletterFormSchema}
          >
            <div className="flex gap-2">
              <InputField
                inputProps={{
                  uiSize: "sm",
                  className: "rounded-lg",
                  autoComplete: "email",
                }}
                name="email"
                type="email"
                placeholder="Ваш email"
                className="mb-4 flex-1"
              />
              <Button type="submit" size="sm" className="h-9 text-xs">
                Подписаться
              </Button>
            </div>
          </Form>
          <p className="text-xs text-grayscale-500">
            Подписываясь, вы соглашаетесь с нашей{" "}
            <LocalizedLink
              href="/privacy-policy"
              variant="underline"
              className="!pb-0"
            >
              Политикой конфиденциальности
            </LocalizedLink>{" "}
            и даете согласие на получение обновлений от нашей компании.
          </p>
        </>
      )}
    </div>
  )
}