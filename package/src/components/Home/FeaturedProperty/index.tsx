"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProprty } from "@/app/api/featuredproperty"; // You can rename this later
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FeaturedItemExchange: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) api.scrollTo(index);
  };

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10">
  
          {/* <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {featuredProprty.map((item, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={item.scr}
                      alt={item.alt}
                      width={680}
                      height={530}
                      className="rounded-2xl w-full h-540 object-cover"
                      unoptimized
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute left-2/5 bg-dark/50 rounded-full py-2.5 bottom-10 flex justify-center mt-4 gap-2.5 px-2.5">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    current === index + 1 ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div> */}

          {/* Item Details Section */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                <Icon
                  icon="ph:student-duotone"
                  className="text-2xl text-primary"
                />
                Featured Exchange Item
              </p>
              <h2 className="lg:text-52 text-40 font-medium text-dark dark:text-white">
                Latest College Item for Exchange
              </h2>
              <div className="flex items-center gap-2.5">
                <Icon
                  icon="ph:map-pin"
                  width={28}
                  height={26}
                  className="text-dark/50 dark:text-white/50"
                />
                <p className="text-dark/50 dark:text-white/50 text-base">
                  Adi Shankara College, Kalady
                </p>
              </div>
            </div>

            <p className="text-base text-dark/50 dark:text-white/50">
              Discover the latest items available for exchange within our
              college community — from books and lab kits to electronics and
              daily essentials. Connect with fellow students to exchange items
              you no longer need and find what you’re looking for easily.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-10">
              {[
                { icon: "ph:book-duotone", label: "Study Materials" },
                { icon: "ph:device-mobile-duotone", label: "Gadgets & Accessories" },
                { icon: "ph:backpack-duotone", label: "Stationery & Bags" },
                { icon: "ph:t-shirt-duotone", label: "Miscellaneous Items" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                    <Icon
                      icon={feature.icon}
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>
                  <h6>{feature.label}</h6>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 items-center">
              <Link
                href="/exchange-items"
                className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white"
              >
                Go to Exchange
              </Link>
              <Link
                href="/contactus"
                className="py-4 px-8 bg-dark hover:bg-primary duration-300 rounded-full text-white"
              >
                Contact Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItemExchange;
