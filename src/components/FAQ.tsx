import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useTranslation, Trans } from "next-i18next"
import { Heading } from "./Heading"

const faqs = [
  "faq-sunglasses",
  "faq-glasses-work",
  "faq-no-glasses",
  "faq-special",
  "faq-expect",
  "faq-memorable",
  "faq-cloudy",
  "faq-photograph",
  "faq-who",
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

export const FAQ = () => {
  const { t } = useTranslation()

  return (
    <div className="faq container mx-auto px-6 md:px-2">
      <Heading>Frequently asked questions</Heading>
      <dl className="space-y-6 divide-y">
        {faqs.map((faq) => (
          <Disclosure as="div" key={faq} className="pt-6">
            {({ open }) => (
              <>
                <dt className="text-lg">
                  <Disclosure.Button className="text-left w-full flex justify-between items-start">
                    <span className="font-semibold">{t(`${faq}-question`)}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "-rotate-180" : "rotate-0",
                          "h-6 w-6 transform"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base">
                    <Trans
                      i18nKey={`${faq}-answer`}
                      components={{
                        em: <em />,
                        aas: (
                          // eslint-disable-next-line jsx-a11y/anchor-has-content
                          <a
                            className="underline hover:no-underline"
                            href="https://eclipse.aas.org/resources/solar-filters"
                            target="_blank"
                            rel="noreferrer"
                          />
                        ),
                        contact: (
                          // eslint-disable-next-line jsx-a11y/anchor-has-content
                          <a
                            className="underline hover:no-underline"
                            href="mailto:contact@eclipse2021.solar"
                          />
                        ),
                      }}
                    />
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  )
}
