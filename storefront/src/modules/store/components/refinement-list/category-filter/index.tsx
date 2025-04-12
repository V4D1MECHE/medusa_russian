"use client"

import * as ReactAria from "react-aria-components"
import {
  UiSelectButton,
  UiSelectDialog,
  UiSelectIcon,
} from "@/components/ui/Select"
import {
  UiCheckbox,
  UiCheckboxBox,
  UiCheckboxIcon,
  UiCheckboxLabel,
} from "@/components/ui/Checkbox"
import { UiDialogTrigger } from "@/components/Dialog"

export const CategoryFilter: React.FC<{
  categories: Record<string, string>
  category?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ category, categories, setQueryParams }) => (
  <UiDialogTrigger>
    <UiSelectButton className="w-35 rounded-md">
      <span>Категория</span>
      <UiSelectIcon />
    </UiSelectButton>
    <ReactAria.Popover className="w-64 rounded-md" placement="bottom left">
      <UiSelectDialog className="rounded-md">
        <ReactAria.CheckboxGroup
          value={category ?? []}
          onChange={(value) => {
            setQueryParams("category", value)
          }}
          className="max-h-50 rounded-md overflow-scroll no-scrollbar"
        >
          {Object.entries(categories).map(([key, value]) => (
            <UiCheckbox value={key} className="p-4 rounded-md" key={key}>
              <UiCheckboxBox className="rounded-md">
                <UiCheckboxIcon />
              </UiCheckboxBox>
              <UiCheckboxLabel className="rounded-md">{value}</UiCheckboxLabel>
            </UiCheckbox>
          ))}
        </ReactAria.CheckboxGroup>
      </UiSelectDialog>
    </ReactAria.Popover>
  </UiDialogTrigger>
)