"use client"

import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"

import Spinner from "@modules/common/icons/spinner"
import { placeOrder } from "@lib/data/cart"
import { isManual, isPaypal, isStripe } from "@lib/constants"
import { Button } from "@/components/Button"
import ErrorMessage from "@modules/checkout/components/error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  selectPaymentMethod: () => void
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  selectPaymentMethod,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  // TODO: Add this once gift cards are implemented
  // const paidByGiftcard =
  //   cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  // if (paidByGiftcard) {
  //   return <GiftCardPaymentButton />
  // }

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return <StripePaymentButton notReady={notReady} cart={cart} />
    case isManual(paymentSession?.provider_id):
      return <ManualTestPaymentButton notReady={notReady} />
    case isPaypal(paymentSession?.provider_id):
      return <PayPalPaymentButton notReady={notReady} cart={cart} />
    default:
      return (
        <Button
          className="w-full"
          onPress={() => {
            selectPaymentMethod()
          }}
        >
          Выберите способ оплаты
        </Button>
      )
  }
}

// const GiftCardPaymentButton = () => {
//   const [submitting, setSubmitting] = useState(false)

//   const handleOrder = async () => {
//     setSubmitting(true)
//     await placeOrder()
//   }

//   return (
//     <Button onPress={handleOrder} isLoading={submitting} className="w-full">
//       Оформить заказ
//     </Button>
//   )
// }

const StripePaymentButton = ({
  cart,
  notReady,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !session?.data?.payment_method_id ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe) {
      setSubmitting(false)
      return
    }
    const paymentMethodId = session?.data?.payment_method_id as string

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: paymentMethodId,
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        isDisabled={disabled || notReady}
        onPress={handlePayment}
        isLoading={submitting}
        className="w-full"
      >
        Оформить заказ
      </Button>
      <ErrorMessage error={errorMessage} />
    </>
  )
}

const PayPalPaymentButton = ({
  cart,
  notReady,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`Произошла ошибка, статус: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`Произошла неизвестная ошибка, пожалуйста, попробуйте снова.`)
        setSubmitting(false)
      })
  }

  const [{ isPending, isResolved }] = usePayPalScriptReducer()

  if (isPending) {
    return <Spinner />
  }

  if (isResolved) {
    return (
      <>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async () => session?.data.id as string}
          onApprove={handlePayment}
          disabled={notReady || submitting || isPending}
        />
        <ErrorMessage error={errorMessage} />
      </>
    )
  }
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        isDisabled={notReady}
        isLoading={submitting}
        onPress={handlePayment}
        className="w-full"
      >
        Оформить заказ
      </Button>
      <ErrorMessage error={errorMessage} />
    </>
  )
}

export default PaymentButton