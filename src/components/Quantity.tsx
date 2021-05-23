import { Dispatch, SetStateAction } from "react"

type QuantityProps = {
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  min: number
  max: number
}

export const Quantity = ({ quantity, setQuantity, min, max }: QuantityProps) => (
  <div className="flex flex-row md:flex-col-reverse bg-white rounded-md items-center">
    <button
      className={
        (quantity > min ? "text-black" : "text-gray") +
        " text-2xl px-5 py-1 md:px-4 md:py-4 font-bold"
      }
      disabled={quantity <= min}
      onClick={() => setQuantity(Math.max(quantity - 1, min))}
    >
      <MinusIcon />
    </button>
    <div className="mx-2 md:mx-auto text-center text-black font-extrabold w-8 border-0">
      {quantity}
    </div>
    <button
      className={
        (quantity < max ? "text-black" : "text-gray") +
        " text-black text-2xl px-5 py-3 md:px-4 md:py-4 font-bold"
      }
      disabled={quantity >= max}
      onClick={() => setQuantity(Math.min(quantity + 1, max))}
    >
      <PlusIcon />
    </button>
  </div>
)

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
)

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
)
