import React from "react";
import { motion } from "motion/react";
import { CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";
import Button from "../ui/Button";

function PricingSection() {
  const plans = [
    {
      name: "Personal",
      price: "Free",
      period: "forever",
      description: "Perfect for individual wishlist management",
      features: [
        "Unlimited wishlists",
        "Up to 100 items per wishlist",
        "Basic categories",
        "Mobile app access",
        "Export to PDF/CSV"
      ],
      limitations: [
        "No collaboration features",
        "No AI insights",
        "Basic support only"
      ],
      bgGradient: "from-moss-50 to-moss-100",
      borderColor: "border-moss-200",
      buttonVariant: "outline",
      buttonText: "Get started free",
      popular: false
    },
    {
      name: "Collaborator",
      price: "£5",
      period: "per month",
      description: "Great for families and small groups",
      features: [
        "Everything in Personal",
        "Unlimited items per wishlist",
        "Share with up to 10 people",
        "Comments and suggestions",
        "AI-powered recommendations",
        "Mind map visualization",
        "Priority support"
      ],
      limitations: [],
      bgGradient: "from-ochre-50 to-ochre-100",
      borderColor: "border-ochre-300",
      buttonVariant: "contemplative",
      buttonText: "Start free trial",
      popular: true
    },
    {
      name: "Community",
      price: "£9",
      period: "per month",
      description: "For larger groups and organizations",
      features: [
        "Everything in Collaborator",
        "Unlimited collaborators",
        "Public wishlist discovery",
        "Advanced AI insights",
        "Custom categories & tags",
        "API access",
        "White-label options",
        "Premium support"
      ],
      limitations: [],
      bgGradient: "from-umber-50 to-umber-100",
      borderColor: "border-umber-300",
      buttonVariant: "outline",
      buttonText: "Contact sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="bg-gradient-to-b from-moss-50 via-white to-ochre-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-ochre-100 rounded-full px-4 py-2 mb-6">
            <span className="text-ochre-700 text-sm font-medium">💰 Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-umber-800 mb-6">
            <UmberText>Choose your perfect plan</UmberText>
          </h2>
          <p className="text-lg sm:text-xl text-umber-600 max-w-3xl mx-auto leading-relaxed">
            <UmberText>
              Start free and upgrade as your wishlist dreams grow. 
              All plans include our core contemplative commerce features.
            </UmberText>
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-gradient-to-br ${plan.bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 ${plan.borderColor} hover:shadow-xl transition-all duration-300 ${plan.popular ? 'scale-105 shadow-lg' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-ochre-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-umber-800 mb-2">
                  <UmberText>{plan.name}</UmberText>
                </h3>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-display font-bold text-umber-800">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-umber-600 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-umber-700 text-sm md:text-base">
                  <UmberText>{plan.description}</UmberText>
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-moss-600 flex-shrink-0" />
                    <span className="text-umber-700 text-sm md:text-base">
                      <UmberText>{feature}</UmberText>
                    </span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-center gap-3 opacity-60">
                    <CrossCircledIcon className="w-5 h-5 text-umber-400 flex-shrink-0" />
                    <span className="text-umber-600 text-sm md:text-base line-through">
                      <UmberText>{limitation}</UmberText>
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant={plan.buttonVariant}
                size="md"
                className="w-full"
              >
                <UmberText>{plan.buttonText}</UmberText>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Notice */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-umber-600 text-sm md:text-base mb-4">
            <UmberText>
              All plans include 14-day free trial. No credit card required. 
              Cancel anytime.
            </UmberText>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-umber-500 text-sm">
            <span>✓ No setup fees</span>
            <span>✓ Data export anytime</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
