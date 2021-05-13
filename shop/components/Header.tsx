import Image from "next/image"

export const Header = () => (
  <header className="w-full gradient">
    <div className="h-eclipse md:h-eclipse-md relative overflow-hidden pointer-events-none">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-eclipse h-eclipse md:w-eclipse-md md:h-eclipse-md">
        <Image src="/eclipse.png" alt="" layout="fill" />
      </div>
    </div>
    <div className="container mx-auto px-6">
      <h1 className="hidden">Solar Eclipse Glasses</h1>
      <h3 className="hidden">June 10, 2021</h3>

      <p className="text-center mb-6 text-sm leading-loose md:-mt-16 -mt-14">
        Do not miss this astronomical experience!
      </p>
      <p className="text-center mb-6 text-sm leading-loose">
        On June 10, you will have the chance to witness a solar eclipse, an event that rarely occurs
        in the same place.
      </p>
      <p className="text-center mb-14 text-sm leading-loose">
        Get our glasses specially designed to admire the transition of the Moon between the Sun and
        the Earth. Our glasses are compliant with the ISO 12312-2 international safety standard for
        safely viewing our local star in all its splendor.
      </p>

      <h2 className="font-extrabold text-2xl text-yellow uppercase pb-4">Shop</h2>
    </div>
  </header>
)
