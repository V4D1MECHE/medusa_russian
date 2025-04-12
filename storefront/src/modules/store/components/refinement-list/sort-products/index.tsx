"use client"

import * as ReactAria from "react-aria-components"
import {
  UiSelectButton,
  UiSelectIcon,
  UiSelectListBox,
  UiSelectListBoxItem,
  UiSelectValue,
} from "@/components/ui/Select"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions | undefined
  setQueryParams: (name: string, value: SortOptions) => void
}

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <ReactAria.Select
      placeholder="Сортировать по"
      selectedKey={sortBy || "sortBy"}
      onSelectionChange={(key) => {
        handleChange(key as SortOptions)
      }}
      className="max-md:hidden"
      aria-label="Сортировать по"
    >
      <UiSelectButton className="rounded-md">
        <UiSelectValue />
        <UiSelectIcon />
      </UiSelectButton>
      <ReactAria.Popover className="w-60 rounded-md" placement="bottom right">
        <UiSelectListBox className="rounded-md overflow-scroll no-scrollbar">
          <UiSelectListBoxItem id="created_at" className="rounded-md">
            Новые поступления
          </UiSelectListBoxItem>
          <UiSelectListBoxItem id="price_asc" className="rounded-md">Низкая цена</UiSelectListBoxItem>
          <UiSelectListBoxItem id="price_desc" className="rounded-md">
            Высокая цена
          </UiSelectListBoxItem>
        </UiSelectListBox>
      </ReactAria.Popover>
    </ReactAria.Select>
  )
}

export default SortProducts