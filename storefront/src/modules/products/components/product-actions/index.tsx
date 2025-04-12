"use client"

import { isEqual } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import * as ReactAria from "react-aria-components"
import { addToCart } from "@lib/data/cart"
import { getVariantItemsInStock } from "@lib/util/inventory"
import { Button } from "@/components/Button"
import { NumberField } from "@/components/NumberField"
import {
  UiSelectButton,
  UiSelectIcon,
  UiSelectListBox,
  UiSelectListBoxItem,
  UiSelectValue,
} from "@/components/ui/Select"
import { useCountryCode } from "hooks/country-code"
import ProductPrice from "@modules/products/components/product-price"
import { UiRadioGroup } from "@/components/ui/Radio"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  materials: {
    id: string
    name: string
    colors: {
      id: string
      name: string
      hex_code: string
    }[]
  }[]
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) {
      acc[varopt.option_id] = varopt.value
    }
    return acc
  }, {})
}

const priorityOptions = ["Material", "Color", "Size"]

const getInitialOptions = (product: ProductActionsProps["product"]) => {
  if (product.variants?.length === 1) {
    const variantOptions = optionsAsKeymap(product.variants[0].options)
    return variantOptions ?? {}
  }

  if (product.options) {
    const singleOptionValues = product.options
      .filter((option) => option.values)
      .filter((option) => option.values!.length === 1)
      .reduce(
        (acc, option) => {
          acc[option.id] = option.values![0].value
          return acc
        },
        {} as Record<string, string>
      )

    return singleOptionValues
  }

  return null
}

export default function ProductActions({
  product,
  materials,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    getInitialOptions(product) ?? {}
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useCountryCode()

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    const initialOptions = getInitialOptions(product)
    if (initialOptions) {
      setOptions(initialOptions)
    }
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected variant is in stock
  const itemsInStock = selectedVariant
    ? getVariantItemsInStock(selectedVariant)
    : 0

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  const hasMultipleVariants = (product.variants?.length ?? 0) > 1
  const productOptions = (product.options || []).sort((a, b) => {
    let aPriority = priorityOptions.indexOf(a.title ?? "")
    let bPriority = priorityOptions.indexOf(b.title ?? "")

    if (aPriority === -1) {
      aPriority = priorityOptions.length
    }

    if (bPriority === -1) {
      bPriority = priorityOptions.length
    }

    return aPriority - bPriority
  })

  const materialOption = productOptions.find((o) => o.title === "Material")
  const colorOption = productOptions.find((o) => o.title === "Color")
  const otherOptions =
    materialOption && colorOption
      ? productOptions.filter(
          (o) => o.id !== materialOption.id && o.id !== colorOption.id
        )
      : productOptions

  const selectedMaterial =
    materialOption && options[materialOption.id]
      ? materials.find((m) => m.name === options[materialOption.id])
      : undefined

  const showOtherOptions =
    !materialOption ||
    !colorOption ||
    (selectedMaterial &&
      (selectedMaterial.colors.length < 2 || options[colorOption.id]))

  return (
    <>
      <ProductPrice product={product} variant={selectedVariant} />
      <div className="max-md:text-xs mb-8 md:mb-16 max-w-120 rounded-md">
        <p>{product.description}</p>
      </div>
      {hasMultipleVariants && (
        <div className="flex flex-col gap-8 md:gap-6 mb-4 md:mb-26">
          {materialOption && colorOption && (
            <>
              <div>
                <p className="mb-4 rounded-md">
                  Материалы
                  {options[materialOption.id] && (
                    <span className="text-grayscale-500 ml-6 overflow-scroll no-scrollbar">
                      {options[materialOption.id]}
                    </span>
                  )}
                </p>
                <ReactAria.Select
                  selectedKey={options[materialOption.id] ?? null}
                  onSelectionChange={(value) => {
                    setOptions({ [materialOption.id]: `${value}` })
                  }}
                  placeholder="Выберите материал"
                  className="w-full md:w-60 no-scrollbar"
                  isDisabled={!!disabled || isAdding}
                  aria-label="Материал"
                >
                  <UiSelectButton className="!h-12 px-4 gap-2 max-md:text-base rounded-md">
                    <UiSelectValue />
                    <UiSelectIcon className="h-6 w-6" />
                  </UiSelectButton>
                  <ReactAria.Popover className="w-[--trigger-width] rounded-md">
                    <UiSelectListBox className="rounded-md no-scrollbar">
                      {materials.map((material) => (
                        <UiSelectListBoxItem
                          key={material.id}
                          id={material.name}
                          className="rounded-sm"
                        >
                          {material.name}
                        </UiSelectListBoxItem>
                      ))}
                    </UiSelectListBox>
                  </ReactAria.Popover>
                </ReactAria.Select>
              </div>
              {selectedMaterial && (
                <div className="mb-6">
                  <p className="mb-4 rounded-md">
                    Цвета
                    <span className="text-grayscale-500 ml-6">
                      {options[colorOption.id]}
                    </span>
                  </p>
                  <UiRadioGroup
                    value={options[colorOption.id] ?? null}
                    onChange={(value) => {
                      setOptionValue(colorOption.id, value)
                    }}
                    aria-label="Цвет"
                    className="flex gap-6"
                    isDisabled={!!disabled || isAdding}
                  >
                    {selectedMaterial.colors.map((color) => (
                      <ReactAria.Radio
                        key={color.id}
                        value={color.name}
                        aria-label={color.name}
                        className="h-8 w-8 cursor-pointer relative before:transition-colors before:absolute before:content-[''] before:-bottom-2 before:left-0 before:w-full before:h-px data-[selected]:before:bg-black shadow-sm hover:shadow rounded-md"
                        style={{ background: color.hex_code }}
                      />
                    ))}
                  </UiRadioGroup>
                </div>
              )}
            </>
          )}
          {showOtherOptions &&
            otherOptions.map((option) => {
              return (
                <div key={option.id}>
                  <p className="mb-4 rounded-md">
                    {option.title}
                    {options[option.id] && (
                      <span className="text-grayscale-500 ml-6">
                        {options[option.id]}
                      </span>
                    )}
                  </p>
                  <ReactAria.Select
                    selectedKey={options[option.id] ?? null}
                    onSelectionChange={(value) => {
                      setOptionValue(option.id, `${value}`)
                    }}
                    placeholder={`Выберите ${option.title.toLowerCase()}`}
                    className="w-full md:w-60"
                    isDisabled={!!disabled || isAdding}
                    aria-label={option.title}
                  >
                    <UiSelectButton className="!h-12 px-4 gap-2 max-md:text-base rounded-md">
                      <UiSelectValue />
                      <UiSelectIcon className="h-6 w-6" />
                    </UiSelectButton>
                    <ReactAria.Popover className="w-[--trigger-width] rounded-md">
                      <UiSelectListBox className="rounded-md">
                        {(option.values ?? [])
                          .filter((value) => Boolean(value.value))
                          .map((value) => (
                            <UiSelectListBoxItem
                              key={value.id}
                              id={value.value}
                              className="rounded-md"
                            >
                              {value.value}
                            </UiSelectListBoxItem>
                          ))}
                      </UiSelectListBox>
                    </ReactAria.Popover>
                  </ReactAria.Select>
                </div>
              )
            })}
        </div>
      )}
      <div className="flex max-sm:flex-col gap-4">
        <NumberField
          isDisabled={
            !itemsInStock || !selectedVariant || !!disabled || isAdding
          }
          value={quantity}
          onChange={setQuantity}
          minValue={1}
          maxValue={itemsInStock}
          className="w-full sm:w-35 max-md:justify-center max-md:gap-2 rounded-md"
          aria-label="Количество"
        />
        <Button
          onPress={handleAddToCart}
          isDisabled={!itemsInStock || !selectedVariant || !!disabled}
          isLoading={isAdding}
          className="sm:flex-1"
        >
          {!selectedVariant
            ? "Выберите вариант"
            : !itemsInStock
              ? "Нет в наличии"
              : "Добавить в корзину"}
        </Button>
      </div>
    </>
  )
}