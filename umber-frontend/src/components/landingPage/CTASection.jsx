import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRightIcon, HeartIcon, StarIcon } from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";
import Button from "../ui/Button";

function CTASection() {
  const navigate = useNavigate();
  const testimonials = [
    {
      text: "Umber transformed how I think about wanting things. It's mindful shopping at its finest.",
      author: "Sarah M.",
      rating: 5,
    },
    {
      text: "Finally, a wishlist that helps me pause and consider before buying. Love the contemplative approach!",
      author: "David R.",
      rating: 5,
    },
    {
      text: "The AI insights are incredible. It helped me realize I don't actually need half the things I thought I wanted.",
      author: "Maya P.",
      rating: 5,
    },
  ];

  return (
    <section className="relative">
      {/* Main CTA Section */}
      <div className="bg-umber-700 py-16 md:py-24 overflow-hidden ">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main CTA Content */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-ochre-500/20 rounded-full px-4 py-2 mb-6">
              <HeartIcon className="w-4 h-4 text-ochre-300" />
              <span className="text-ochre-300 text-sm font-medium">
                Ready to transform your desires?
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              <UmberText>
                every impulse purchase started as a genuine want. umber helps you 
                <br />
                <span className="text-transparent bg-gradient-to-r from-ochre-300 to-moss-300 bg-clip-text">
                 tell the difference.
                </span>
              </UmberText>
            </h2>

            <p className="text-lg sm:text-xl text-umber-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              <UmberText>
                create your first wishlist today and experience the difference
                thoughtful desire makes. do it for your focus, and your
                finances.
              </UmberText>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                variant="contemplative"
                size="lg"
                onClick={() => navigate('/signup')}
                className="group bg-gradient-to-r from-ochre-500 to-ochre-600 hover:from-ochre-600 hover:to-ochre-700 text-white border-none shadow-xl"
              >
                <UmberText>start free today</UmberText>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* <Button
                variant="outline"
                size="lg"
                className="border-umber-300 text-umber-100 hover:bg-umber-100 hover:text-umber-800"
              >
                <UmberText>Watch demo</UmberText>
              </Button> */}
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-wrap justify-center items-center gap-6 text-umber-300 text-sm">
              <span>✓ 14-day free trial</span>
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
            </div> */}
          </motion.div>

          {/* Social Proof */}
          {/* <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-umber-600/30 backdrop-blur-sm rounded-2xl p-6 border border-umber-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-ochre-400 fill-current" />
                ))}
              </div>
              <p className="text-umber-100 mb-4 italic">
                <UmberText>"{testimonial.text}"</UmberText>
              </p>
              <p className="text-umber-300 text-sm font-medium">
                <UmberText>— {testimonial.author}</UmberText>
              </p>
            </motion.div>
          ))}
        </motion.div> */}

          {/* Final Stats */}
          {/* <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-ochre-300 mb-2">10K+</div>
            <div className="text-umber-300 text-sm">
              <UmberText>Mindful users</UmberText>
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-ochre-300 mb-2">500K+</div>
            <div className="text-umber-300 text-sm">
              <UmberText>Items contemplated</UmberText>
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-ochre-300 mb-2">£2M+</div>
            <div className="text-umber-300 text-sm">
              <UmberText>Thoughtful savings</UmberText>
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-ochre-300 mb-2">98%</div>
            <div className="text-umber-300 text-sm">
              <UmberText>Satisfaction rate</UmberText>
            </div>
          </div>
        </motion.div> */}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
