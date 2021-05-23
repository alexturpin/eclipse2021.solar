import { useTranslation } from "next-i18next"

type CheckoutProps = {
  onCheckout: () => Promise<void>
  loading: boolean
}

export const Checkout = ({ onCheckout, loading }: CheckoutProps) => {
  const { t } = useTranslation()

  return (
    <button
      className="w-full md:w-auto py-4 px-14 mt-4 rounded-md text-xs text-white uppercase bg-gradient-to-r from-orange to-mangenta tracking-widest"
      onClick={onCheckout}
      disabled={loading}
    >
      <div className="flex flex-row align-middle justify-center">
        {loading && <SpinnerIcon />}
        <span>{loading ? t("processing") : t("checkout")}</span>
      </div>
    </button>
  )
}

const SpinnerIcon = () => (
  <svg
    className="animate-spin h-4 w-4 mr-2 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)
