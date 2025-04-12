import * as React from "react"
import * as ReactAria from "react-aria-components"

import {
  UiCheckbox,
  UiCheckboxBox,
  UiCheckboxIcon,
  UiCheckboxLabel,
} from "@/components/ui/Checkbox"
import { Button } from "@/components/Button"
import { UiModal, UiModalOverlay } from "@/components/ui/Modal"
import { UiDialog, UiDialogTrigger } from "@/components/Dialog"

export const MobileFilters: React.FC<{
  collections?: Record<string, string>
  collection?: string[]
  categories?: Record<string, string>
  category?: string[]
  types?: Record<string, string>
  type?: string[]
  setMultipleQueryParams: (params: Record<string, string | string[]>) => void
}> = ({
  collections,
  collection,
  categories,
  category,
  types,
  type,
  setMultipleQueryParams,
}) => {
  return (
    <UiDialogTrigger>
      <Button
        size="sm"
        variant="outline"
        iconName="plus"
        iconPosition="end"
        className="md:hidden border-grayscale-200 rounded-md"
      >
        Фильтр
      </Button>
      <UiModalOverlay className="p-0">
        <UiModal
          animateFrom="bottom"
          className="top-36 w-full pb-26 max-w-full rounded-t-md"
        >
          <UiDialog>
            {({ close }) => (
              <form
                onSubmit={(event) => {
                  const formData = new FormData(event.currentTarget)

                  const collection = formData
                    .getAll("collection")
                    .map((value) => value.toString())
                  const category = formData
                    .getAll("category")
                    .map((value) => value.toString())
                  const type = formData
                    .getAll("type")
                    .map((value) => value.toString())

                  setMultipleQueryParams({
                    collection,
                    category,
                    type,
                  })

                  close()
                }}
              >
                {collections && Object.keys(collections).length > 0 && (
                  <ReactAria.CheckboxGroup
                    className="flex flex-col rounded-md"
                    name="collection"
                    defaultValue={collection ?? []}
                  >
                    <ReactAria.Label className="block text-md font-semibold mb-3 rounded-md">
                      Коллекции
                    </ReactAria.Label>
                    {Object.entries(collections).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3 rounded-md"
                      >
                        <UiCheckboxLabel className="rounded-md">{value}</UiCheckboxLabel>
                        <UiCheckboxBox className="rounded-md">
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </ReactAria.CheckboxGroup>
                )}
                {collections &&
                  Object.keys(collections).length > 0 &&
                  ((categories && Object.keys(categories).length > 0) ||
                    (types && Object.keys(types).length > 0)) && (
                    <hr className="my-3 text-grayscale-200" />
                  )}
                {categories && Object.keys(categories).length > 0 && (
                  <ReactAria.CheckboxGroup
                    className="flex flex-col rounded-md"
                    name="category"
                    defaultValue={category ?? []}
                  >
                    <ReactAria.Label className="block text-md font-semibold mb-3 rounded-md">
                      Категории
                    </ReactAria.Label>
                    {Object.entries(categories).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3 rounded-md"
                      >
                        <UiCheckboxLabel className="rounded-md">{value}</UiCheckboxLabel>
                        <UiCheckboxBox className="rounded-md">
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </ReactAria.CheckboxGroup>
                )}
                {categories &&
                  Object.keys(categories).length > 0 &&
                  types &&
                  Object.keys(types).length > 0 && (
                    <hr className="my-3 text-grayscale-200" />
                  )}
                {types && Object.keys(types).length > 0 && (
                  <ReactAria.CheckboxGroup
                    className="flex flex-col rounded-md"
                    name="type"
                    defaultValue={type ?? []}
                  >
                    <ReactAria.Label className="block text-md font-semibold mb-3 rounded-md">
                      Типы
                    </ReactAria.Label>
                    {Object.entries(types).map(([key, value]) => (
                      <UiCheckbox
                        key={key}
                        value={key}
                        className="justify-between py-3 rounded-md"
                      >
                        <UiCheckboxLabel className="rounded-md">{value}</UiCheckboxLabel>
                        <UiCheckboxBox className="rounded-md">
                          <UiCheckboxIcon />
                        </UiCheckboxBox>
                      </UiCheckbox>
                    ))}
                  </ReactAria.CheckboxGroup>
                )}
                <footer className="flex items-center h-21 fixed bottom-0 left-0 w-full bg-white px-6 border-t border-grayscale-100 rounded-b-md">
                  <Button type="submit" isFullWidth className="rounded-md">
                    Показать результаты
                  </Button>
                </footer>
              </form>
            )}
          </UiDialog>
        </UiModal>
      </UiModalOverlay>
    </UiDialogTrigger>
  )
}