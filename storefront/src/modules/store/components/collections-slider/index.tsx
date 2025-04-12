import * as React from "react"
import Image from "next/image"

import { getCollectionsList } from "@lib/data/collections"
import { Carousel } from "@/components/Carousel"
import { LocalizedLink } from "@/components/LocalizedLink"
import { twMerge } from "tailwind-merge"

export const CollectionsSlider: React.FC<{
  heading?: React.ReactNode
  className?: string
}> = async ({ heading = "Коллекции", className }) => {
  const collections = await getCollectionsList(0, 20, [
    "id",
    "title",
    "handle",
    "metadata",
  ])

  if (!collections || !collections.collections.length) {
    return null
  }

  return (
    <Carousel
      heading={<h3 className="text-md md:text-2xl rounded-md">{heading}</h3>}
      className={twMerge("mb-26 md:mb-36", className)}
    >
      {collections.collections.map((c) => (
        <div
          key={c.id}
          className="w-[50%] sm:w-[40%] lg:w-full max-w-96 flex-shrink-0 rounded-md"
        >
          <LocalizedLink href={`/collections/${c.handle}`} className="rounded-md">
            {typeof c.metadata?.image === "object" &&
              c.metadata.image &&
              "url" in c.metadata.image &&
              typeof c.metadata.image.url === "string" && (
                <div className="relative mb-4 md:mb-6 w-full aspect-[3/4] rounded-md overflow-hidden">
                  <Image src={c.metadata.image.url} alt={c.title} fill />
                </div>
              )}
            <h3 className="rounded-md">{c.title}</h3>
          </LocalizedLink>
        </div>
      ))}
    </Carousel>
  )
}