import NumberFormat from "react-number-format"
import { useTranslation } from "next-i18next"

export const NumberDisplay = ({ value }: { value: number }) => {
  const { i18n } = useTranslation()

  if (i18n.language === "fr-CA") {
    return (
      <NumberFormat
        value={value}
        decimalScale={2}
        thousandSeparator=" "
        decimalSeparator=","
        suffix=" $"
        displayType="text"
      />
    )
  } else {
    return (
      <NumberFormat
        value={value}
        decimalScale={2}
        thousandSeparator=","
        decimalSeparator="."
        prefix="$"
        displayType="text"
      />
    )
  }
}
