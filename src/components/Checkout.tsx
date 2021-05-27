import { useTranslation } from "next-i18next"
import { SpinnerIcon } from "./SpinnerIcon"

type CheckoutProps = {
  onCheckout: () => Promise<void>
  loading: boolean
}

export const Checkout = ({ onCheckout, loading }: CheckoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row-reverse pb-4">
      <button
        className="w-full md:w-auto py-4 px-14 mt-4 rounded-md text-xs text-white uppercase bg-gradient-to-r from-orange to-mangenta tracking-widest"
        onClick={onCheckout}
        disabled={loading}
      >
        <div className="flex flex-row justify-center items-center">
          {loading && <SpinnerIcon />}
          <span>{loading ? t("processing") : t("checkout")}</span>
        </div>
      </button>
    </div>
  )
}
