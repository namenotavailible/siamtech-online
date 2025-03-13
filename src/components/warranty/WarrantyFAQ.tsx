
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const WarrantyFAQ = () => {
  const { t } = useLanguage();
  
  // Using translation keys for FAQ items
  const faqItems = [
    {
      question: t("faq_coverage_question"),
      answer: t("faq_coverage_answer")
    },
    {
      question: t("faq_period_question"),
      answer: t("faq_period_answer")
    },
    {
      question: t("faq_claim_question"),
      answer: t("faq_claim_answer")
    },
    {
      question: t("faq_void_question"),
      answer: t("faq_void_answer")
    },
    {
      question: t("faq_transfer_question"),
      answer: t("faq_transfer_answer")
    },
    {
      question: t("faq_international_question"),
      answer: t("faq_international_answer")
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{t("faq_title")}</h2>
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
