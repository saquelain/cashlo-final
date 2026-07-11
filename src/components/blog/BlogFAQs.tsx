"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function BlogFAQs({ faqs, title }: { faqs: FAQ[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (faqs.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h2>

      <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card px-5 sm:px-6">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-[15px] font-medium transition-colors duration-200 ${
                    isOpen ? "text-brand" : "text-ink group-hover:text-brand"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 bg-brand text-white"
                      : "bg-surface text-ink/50 group-hover:bg-brand/10 group-hover:text-brand"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="prose prose-sm max-w-2xl pb-5 text-sm leading-relaxed text-ink/60"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}