import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-grayscale-50 animate-pulse rounded-md" />
  }

  const hasReducedPrice =
    selectedPrice.calculated_price_number <
    (selectedPrice.original_price_number ?? 0)

  if (hasReducedPrice && variant) {
    return (
      <div className="rounded-md">
        <p className="text-sm mb-1 text-grayscale-500 line-through rounded-md">
          {selectedPrice.original_price}
        </p>
        <p className="text-md mb-8 text-red-primary rounded-md">
          {selectedPrice.calculated_price}
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="text-md mb-8 rounded-md">
        {!variant && "От "}
        {selectedPrice.calculated_price}
      </p>
    </>
  )
}