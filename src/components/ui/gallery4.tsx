
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

// Default items are kept as a fallback
const defaultItems = [
  {
    id: "shadcn-ui",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    href: "https://ui.shadcn.com",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "astro",
    title: "Astro: The All-in-One Web Framework",
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    href: "https://astro.build",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "react",
    title: "React: Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "nextjs",
    title: "Next.js: The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    href: "https://nextjs.org",
    image:
      "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Gallery4 = ({
  title = "บทความ",
  description = "ค้นพบเทคโนโลยีและนวัตกรรมใหม่ล่าสุดในวงการเครื่องเสียงและอุปกรณ์อิเล็กทรอนิกส์ บทความของเราครอบคลุมเรื่องราวล่าสุดเกี่ยวกับผลิตภัณฑ์และเทคโนโลยีคุณภาพสูง",
  items = defaultItems,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t, language } = useLanguage();

  // Generate blog posts based on language
  const blogPosts = language === "en" ? [
    {
      id: "dynamic-vs-condenser",
      title: "Dynamic vs Condenser Microphones: Which One Is Right for You?",
      description: "Understanding the differences between dynamic and condenser microphones is crucial for selecting the right tool for your recording or performance needs.",
      href: "/blog/dynamic-vs-condenser",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
    },
    {
      id: "microphone-selection-guide",
      title: "How to Choose the Right Microphone for Your Needs",
      description: "Selecting the appropriate microphone is crucial whether you're a content creator, gamer, podcaster, or musician. This guide helps you consider important factors for choosing the perfect microphone.",
      href: "/blog/microphone-selection-guide",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
    }
  ] : [
    {
      id: "dynamic-vs-condenser",
      title: "ไมโครโฟนไดนามิกกับคอนเดนเซอร์: การเลือกที่เหมาะสมกับการใช้งานของคุณ",
      description: "การเข้าใจความแตกต่างระหว่างไมโครโฟนไดนามิกและคอนเดนเซอร์มีความสำคัญอย่างยิ่งในการเลือกเครื่องมือที่เหมาะสมสำหรับการบันทึกหรือการแสดงของคุณ",
      href: "/blog/dynamic-vs-condenser",
      image: "/lovable-uploads/751b5dbf-29fa-4896-80bb-27f6a0f1f1f3.png",
    },
    {
      id: "microphone-selection-guide",
      title: "วิธีเลือกไมโครโฟนที่เหมาะสมกับความต้องการของคุณ",
      description: "การเลือกไมโครโฟนที่เหมาะสมเป็นสิ่งสำคัญ ไม่ว่าคุณจะเป็นนักสร้างคอนเทนต์ เกมเมอร์ พอดแคสเตอร์ หรือแม้แต่นักดนตรี บทความนี้จะช่วยคุณพิจารณาปัจจัยสำคัญในการเลือกไมโครโฟน",
      href: "/blog/microphone-selection-guide",
      image: "/lovable-uploads/7ad1289c-87c2-4ad4-8225-58052b5431be.png",
    }
  ];

  // Use blog posts if no items provided
  const displayItems = items.length > 0 ? items : blogPosts;

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-16 relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4 text-left">
            <h2 className={`text-3xl font-medium md:text-4xl lg:text-5xl ${!isDark ? "text-black" : ""}`}>
              {language === "en" ? "Latest Blog Posts" : title}
            </h2>
            <p className="max-w-lg text-muted-foreground">
              {language === "en" ? "Discover the latest technology and innovations in the audio industry with our comprehensive guides and articles." : description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className={`disabled:pointer-events-auto ${!isDark ? "text-black hover:bg-gray-100 hover:text-black" : ""}`}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className={`disabled:pointer-events-auto ${!isDark ? "text-black hover:bg-gray-100 hover:text-black" : ""}`}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {displayItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <Link to={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        {language === "en" ? "Read more" : "อ่านเพิ่มเติม"}{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
