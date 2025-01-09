"use client"

// External packages
import {
  Button,
  ButtonProps,
  Dialog,
  DialogProps,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxProps,
  SelectValue,
  SelectValueProps,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"

// Components
import { Icon, IconNames, IconProps } from "@/components/Icon"

type UiSelectButtonOwnProps = {
  variant?: "outline" | "ghost"
}

export const UiSelectButton: React.FC<ButtonProps & UiSelectButtonOwnProps> = ({
  variant = "outline",
  className,
  ...props
}) => (
  <Button
    {...props}
    className={twMerge(
      "w-full gap-1 md:gap-2 flex items-center max-md:text-xs justify-between h-8 md:h-10 px-3 md:pl-4 md:pr-3 focus-visible:outline-none transition-colors",
      variant === "outline" &&
        "border border-grayscale-200 rounded-xs hover:border-grayscale-500 hover:text-grayscale-500",
      className as string
    )}
  />
)

export const UiSelectIcon: React.FC<
  Omit<IconProps, "name"> & { name?: IconNames }
> = ({ name = "chevron-down", className, ...props }) => (
  <Icon
    {...props}
    name={name}
    aria-hidden="true"
    className={twMerge("h-4 w-4 md:w-6 md:h-6", className)}
  />
)

export const UiSelectValue = <T extends object>({
  className,
  ...props
}: SelectValueProps<T>) => (
  <SelectValue
    {...props}
    className={twMerge("truncate", className as string)}
  />
)

export const UiSelectListBox = <T extends object>({
  className,
  ...props
}: ListBoxProps<T>) => (
  <ListBox
    {...props}
    className={twMerge(
      "border border-grayscale-200 bg-white rounded-xs focus-visible:outline-none overflow-hidden",
      className as string
    )}
  />
)

export const UiSelectListBoxItem: React.FC<ListBoxItemProps> = ({
  className,
  ...props
}) => (
  <ListBoxItem
    {...props}
    className={twMerge(
      "cursor-pointer px-4 py-3 focus-visible:outline-none data-[selected]:font-semibold hover:bg-grayscale-50 transition-colors",
      className as string
    )}
  />
)

export const UiSelectDialog: React.FC<DialogProps> = ({
  className,
  ...props
}) => (
  <Dialog
    {...props}
    className={twMerge(
      "border border-grayscale-200 bg-white rounded-xs focus-visible:outline-none",
      className
    )}
  />
)
