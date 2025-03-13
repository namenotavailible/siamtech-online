
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const WarrantyFAQ = () => {
  const { t } = useLanguage();

  const faqItems = [
    {
      question: t("warranty.faq.what_covered"),
      answer: t("warranty.faq.what_covered_answer")
    },
    {
      question: t("warranty.faq.warranty_period"),
      answer: t("warranty.faq.warranty_period_answer")
    },
    {
      question: t("warranty.faq.warranty_claim"),
      answer: t("warranty.faq.warranty_claim_answer")
    },
    {
      question: t("warranty.faq.voids_warranty"),
      answer: t("warranty.faq.voids_warranty_answer")
    },
    {
      question: t("warranty.faq.transferable"),
      answer: t("warranty.faq.transferable_answer")
    },
    {
      question: t("warranty.faq.international"),
      answer: t("warranty.faq.international_answer")
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{t("warranty.faq.title")}</h2>
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
