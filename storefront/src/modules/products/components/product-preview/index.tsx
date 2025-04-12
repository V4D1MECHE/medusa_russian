import { HttpTypes } from "@medusajs/types"
import { LocalizedLink } from "@/components/LocalizedLink"
import Thumbnail from "@modules/products/components/thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"

export default function ProductPreview({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({
    product: product,
  })

  const hasReducedPrice =
    cheapestPrice &&
    cheapestPrice.calculated_price_number <
      (cheapestPrice?.original_price_number || 0)

  return (
    <LocalizedLink href={`/products/${product.handle}`} className="rounded-md overflow-hidden">
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size="square"
        className="mb-4 md:mb-6"
      />
      <div className="flex justify-between max-md:flex-col rounded-md">
        <div className="max-md:text-xs">
          <p className="mb-1 rounded-md">{product.title}</p>
          {product.collection && (
            <p className="text-grayscale-500 text-xs max-md:hidden rounded-md">
              {product.collection.title}
            </p>
          )}
        </div>
        {cheapestPrice ? (
          hasReducedPrice ? (
            <div className="rounded-md">
              <p className="font-semibold max-md:text-xs text-red-primary rounded-md">
                {cheapestPrice.calculated_price}
              </p>
              <p className="max-md:text-xs text-grayscale-500 line-through rounded-md">
                {cheapestPrice.original_price}
              </p>
            </div>
          ) : (
            <div className="rounded-md">
              <p className="font-semibold max-md:text-xs rounded-md">
                {cheapestPrice.calculated_price}
              </p>
            </div>
          )
        ) : null}
      </div>
    </LocalizedLink>
  )
}