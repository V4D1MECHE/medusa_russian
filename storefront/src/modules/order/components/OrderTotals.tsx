import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

export const OrderTotals: React.FC<{
  order: HttpTypes.StoreOrder
}> = ({ order }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = order

  return (
    <div className="sm:max-w-65 w-full flex-1 rounded-md">
      <div className="flex justify-between gap-4 mb-2 rounded-md">
        <div className="text-grayscale-500">
          <p>Подытог</p>
        </div>
        <div className="self-end">
          <p>
            {convertToLocale({
              currency_code: currency_code,
              amount: subtotal ?? 0,
            })}
          </p>
        </div>
      </div>
      {!!discount_total && (
        <div className="flex justify-between gap-4 mb-2 rounded-md">
          <div className="text-grayscale-500">
            <p>Скидка</p>
          </div>
          <div className="self-end">
            <p>
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between gap-4 mb-2 rounded-md">
        <div className="text-grayscale-500">
          <p>Доставка</p>
        </div>
        <div className="self-end">
          <p>
            {convertToLocale({
              currency_code: currency_code,
              amount: shipping_total ?? 0,
            })}
          </p>
        </div>
      </div>
      {!!gift_card_total && (
        <div className="flex justify-between gap-4 mb-2 rounded-md">
          <div className="text-grayscale-500">
            <p>Подарочная карта</p>
          </div>
          <div className="self-end">
            <p>
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between gap-4 text-md mb-1 mt-6 rounded-md">
        <div>
          <p>Итого</p>
        </div>
        <div className="self-end">
          <p>
            {convertToLocale({
              currency_code: currency_code,
              amount: total ?? 0,
            })}
          </p>
        </div>
      </div>
      <p className="text-xs text-grayscale-500 rounded-md">
        Включая {convertToLocale({ amount: tax_total ?? 0, currency_code })}{" "}
        налога
      </p>
    </div>
  )
}