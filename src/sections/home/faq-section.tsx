'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '~/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems: FAQItem[] = [
    {
      question: 'What is Eden Finance?',
      answer:
        'Eden Finance is an AI-enhanced DeFi protocol that combines cutting-edge artificial intelligence with decentralized finance primitives to create a more secure, efficient, and accessible financial ecosystem. It offers features like cross-chain yield optimization, low-cost transactions, and real-world asset integration.',
    },
    {
      question: 'Is Eden Finance secure?',
      answer:
        'Yes, Eden Finance prioritizes security through multiple layers of protection. Our platform uses AI-enhanced risk management to detect and prevent potential threats, undergoes regular security audits by leading firms, and implements robust smart contract architecture to safeguard user assets.',
    },
    {
      question: 'Is Eden Finance secure?',
      answer:
        'Yes, Eden Finance prioritizes security through multiple layers of protection. Our platform uses AI-enhanced risk management to detect and prevent potential threats, undergoes regular security audits by leading firms, and implements robust smart contract architecture to safeguard user assets.',
    },
    {
      question: 'Is Eden Finance secure?',
      answer:
        'Yes, Eden Finance prioritizes security through multiple layers of protection. Our platform uses AI-enhanced risk management to detect and prevent potential threats, undergoes regular security audits by leading firms, and implements robust smart contract architecture to safeguard user assets.',
    },
    {
      question: 'Is Eden Finance secure?',
      answer:
        'Yes, Eden Finance prioritizes security through multiple layers of protection. Our platform uses AI-enhanced risk management to detect and prevent potential threats, undergoes regular security audits by leading firms, and implements robust smart contract architecture to safeguard user assets.',
    },
    {
      question: 'Is Eden Finance secure?',
      answer:
        'Yes, Eden Finance prioritizes security through multiple layers of protection. Our platform uses AI-enhanced risk management to detect and prevent potential threats, undergoes regular security audits by leading firms, and implements robust smart contract architecture to safeguard user assets.',
    },
  ]

  return (
    <div className="w-full px-4 py-20 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-3xl text-base text-gray-400 sm:text-lg">
            Eden Finance offers significant advantages over traditional DeFi
            protocols, combining AI-enhanced security with cross-chain
            optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-800 pb-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium">{item.question}</h3>
                <Plus
                  className={cn(
                    'h-5 w-5 transition-transform duration-200',
                    openIndex === index ? 'rotate-45' : ''
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
