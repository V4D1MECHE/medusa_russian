import { LocalizedLink } from "@/components/LocalizedLink"

const EmptyCartMessage = () => {
  return (
    <div>
      <div className="lg:h-22 pb-12 lg:pb-0 border-b border-b-grayscale-100">
        <h1 className="md:text-2xl text-lg leading-none">Ваша корзина</h1>
      </div>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        В вашей корзине пусто. Давайте это исправим, используйте ссылку ниже, чтобы начать просматривать наши товары.
      </p>
      <div>
        <LocalizedLink href="/store">Посмотреть товары</LocalizedLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage