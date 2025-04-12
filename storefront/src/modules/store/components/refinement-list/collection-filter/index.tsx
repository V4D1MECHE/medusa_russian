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

export const CollectionFilter: React.FC<{
  collections: Record<string, string>
  collection?: string[]
  setQueryParams: (name: string, value: string[]) => void
}> = ({ collection, collections, setQueryParams }) => (
  <UiDialogTrigger>
    <UiSelectButton className="w-35 rounded-md">
      <span>Коллекция</span>
      <UiSelectIcon />
    </UiSelectButton>
    <ReactAria.Popover className="w-64 rounded-md" placement="bottom left">
      <UiSelectDialog className="rounded-md">
        <ReactAria.CheckboxGroup
          value={collection ?? []}
          onChange={(value) => {
            setQueryParams("collection", value)
          }}
          className="max-h-50 rounded-md overflow-scroll no-scrollbar"
        >
          {Object.entries(collections).map(([key, value]) => (
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