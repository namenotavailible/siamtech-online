
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What does the warranty cover?",
    answer: "Our standard warranty covers manufacturing defects and malfunctions under normal use conditions. This includes issues with components, electronics, and other hardware failures not caused by user damage."
  },
  {
    question: "How long is the warranty period?",
    answer: "All SIAMTECH products come with a 1-year standard warranty from the date of purchase. Extended warranty options may be available for select products."
  },
  {
    question: "How do I make a warranty claim?",
    answer: "To make a warranty claim, please contact our customer support team with your product details and proof of purchase. You can reach us through the Support page or by emailing support@siamtech.com."
  },
  {
    question: "What voids the warranty?",
    answer: "The warranty is voided by physical damage, water damage, unauthorized repairs or modifications, improper use, or if the product's serial number has been removed or altered."
  },
  {
    question: "Is my warranty transferable?",
    answer: "No, our warranty is non-transferable and applies only to the original purchaser with valid proof of purchase."
  },
  {
    question: "Do you offer international warranty?",
    answer: "Yes, our warranty is valid internationally. However, shipping costs for warranty service may vary depending on your location."
  }
];

const WarrantyFAQ = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WarrantyFAQ;
