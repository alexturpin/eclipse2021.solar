import NumberFormat from "react-number-format"
import { useTranslation } from "next-i18next"

export const NumberDisplay = ({ value }: { value: number }) => {
  const { i18n } = useTranslation()

  if (i18n.language === "fr-CA") {
    return (
      <NumberFormat
        value={value}
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
        thousandSeparator=","
        decimalSeparator="."
        prefix="$"
        displayType="text"
      />
    )
  }
}
