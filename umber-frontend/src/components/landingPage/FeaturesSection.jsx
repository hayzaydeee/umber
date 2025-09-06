import React from "react";
import { motion } from "motion/react";
import { 
  BookmarkIcon, 
  Share1Icon, 
  EyeOpenIcon, 
  MagicWandIcon,
  PlusIcon,
  ChatBubbleIcon,
  LockClosedIcon,
  DownloadIcon,
  PersonIcon,
  HeartIcon,
  RocketIcon,
  GlobeIcon,
  MobileIcon,
  LightningBoltIcon,
  SwitchIcon,
  MixerHorizontalIcon
} from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";
import Button from "../ui/Button";

function FeaturesSection() {
  const mainFeatures = [
    {
      title: "smart wishlist management",
      description: "create and organize unlimited wishlists across any category. Add items with rich details, images, and notes. Our intelligent categorization helps you stay organized effortlessly.",
      icon: BookmarkIcon,
      bgGradient: "from-moss-100 to-moss-200",
      iconColor: "text-moss-700",
      borderColor: "border-moss-200",
      mockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-moss-200 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-moss-600 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-umber-800">Tech Wishlist</div>
              <div className="text-xs text-umber-600">12 items • £2,847.99</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-moss-50 rounded-lg">
              <div className="w-6 h-6 bg-moss-300 rounded"></div>
              <div className="text-xs">
                <div className="font-medium text-umber-800">MacBook Pro M3</div>
                <div className="text-umber-600">£1,899.00</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-moss-50 rounded-lg">
              <div className="w-6 h-6 bg-moss-300 rounded"></div>
              <div className="text-xs">
                <div className="font-medium text-umber-800">AirPods Pro</div>
                <div className="text-umber-600">£249.00</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "collaborative sharing",
      description: "share wishlists with friends and family. Get suggestions, comments, and recommendations. Perfect for gift planning, group purchases, or inspiration sharing.",
      icon: Share1Icon,
      bgGradient: "from-ochre-100 to-ochre-200",
      iconColor: "text-ochre-700",
      borderColor: "border-ochre-200",
      mockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-ochre-200 w-full">
          <div className="text-xs text-ochre-700 mb-2">Shared with 3 friends</div>
          <div className="flex -space-x-2 mb-3">
            <div className="w-6 h-6 bg-ochre-400 rounded-full border-2 border-white"></div>
            <div className="w-6 h-6 bg-ochre-500 rounded-full border-2 border-white"></div>
            <div className="w-6 h-6 bg-ochre-600 rounded-full border-2 border-white"></div>
          </div>
          <div className="bg-ochre-50 rounded-lg p-2 mb-2">
            <div className="text-xs font-medium text-umber-800">Sarah suggested:</div>
            <div className="text-xs text-umber-600">"Have you seen the new iPad Air?"</div>
          </div>
          <div className="flex gap-2">
            <button className="text-xs bg-ochre-200 text-ochre-800 px-2 py-1 rounded">Reply</button>
            <button className="text-xs bg-ochre-200 text-ochre-800 px-2 py-1 rounded">Add Item</button>
          </div>
        </div>
      )
    },
    {
      title: "mindMaps",
      description: "see your desires in a beautiful, interactive mind map. Explore connections between items, discover patterns in your wants, and gain insights into your preferences.",
      icon: EyeOpenIcon,
      bgGradient: "from-umber-100 to-umber-200",
      iconColor: "text-umber-700",
      borderColor: "border-umber-200",
      mockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-umber-200 w-full">
          <div className="relative h-32">
            <div className="absolute top-4 left-4 w-12 h-12 bg-umber-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-semibold">Me</span>
            </div>
            <div className="absolute top-2 right-8 w-8 h-8 bg-moss-400 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-3 h-3 text-white" />
            </div>
            <div className="absolute bottom-6 left-8 w-8 h-8 bg-ochre-400 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-3 h-3 text-white" />
            </div>
            <div className="absolute bottom-2 right-4 w-8 h-8 bg-umber-400 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-3 h-3 text-white" />
            </div>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="60" y1="28" x2="80" y2="20" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="60" y1="40" x2="50" y2="80" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="70" y1="40" x2="90" y2="90" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
          </div>
          <div className="text-xs text-umber-600 text-center mt-2">Interactive mind map view</div>
        </div>
      )
    },
    {
      title: "AI-powered Insights",
      description: "get smart recommendations based on your wishlist patterns. our AI helps categorize items, suggests related products, and provides insights into your wanting habits.",
      icon: MagicWandIcon,
      bgGradient: "from-moss-100 via-ochre-50 to-umber-100",
      iconColor: "text-moss-700",
      borderColor: "border-moss-200",
      mockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-moss-200 w-full">
          <div className="flex items-center gap-2 mb-3">
            <MagicWandIcon className="w-4 h-4 text-moss-600" />
            <span className="text-xs font-semibold text-umber-800">AI Suggestions</span>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-moss-50 to-ochre-50 rounded-lg p-2">
              <div className="text-xs font-medium text-umber-800">Based on your tech items:</div>
              <div className="text-xs text-umber-600">"Consider adding a laptop stand"</div>
            </div>
            <div className="bg-gradient-to-r from-ochre-50 to-umber-50 rounded-lg p-2">
              <div className="text-xs font-medium text-umber-800">Pattern detected:</div>
              <div className="text-xs text-umber-600">"You prefer premium brands"</div>
            </div>
          </div>
          <button className="w-full mt-2 text-xs bg-moss-100 text-moss-800 py-1 rounded">View All Insights</button>
        </div>
      )
    }
  ];

  const miniFeatures = [
    { title: "Quick Add", icon: PlusIcon, description: "Add items instantly" },
    { title: "Comments", icon: ChatBubbleIcon, description: "Discuss with friends" },
    { title: "Privacy Controls", icon: SwitchIcon, description: "Control who sees what" },
    { title: "Export Options", icon: DownloadIcon, description: "PDF, CSV, and more" },
    { title: "User Profiles", icon: PersonIcon, description: "Personalized experience" },
    { title: "Favorites", icon: HeartIcon, description: "Mark your must-haves" },
    { title: "Smart Categories", icon: RocketIcon, description: "Auto-organize items" },
    { title: "Public Discovery", icon: GlobeIcon, description: "Find inspiration" },
    { title: "Mobile App", icon: MobileIcon, description: "Coming soon" },
    { title: "Real-time Sync", icon: LightningBoltIcon, description: "Always up to date" },
    { title: "Data Security", icon: LockClosedIcon, description: "Your data is safe" },
    { title: "Integrations", icon: MixerHorizontalIcon, description: "Connect your tools" }
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-ochre-50 via-white to-moss-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-moss-100 rounded-full px-4 py-2 mb-6">
            <span className="text-moss-700 text-sm font-medium">✨ Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-umber-800 mb-6">
            <UmberText>Your all-purpose wishlist app</UmberText>
          </h2>
          <p className="text-lg sm:text-xl text-umber-600 max-w-3xl mx-auto leading-relaxed">
            <UmberText>
              Discover a variety of our advanced features. Unlimited and free for individuals.
            </UmberText>
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 border ${feature.borderColor} hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm ${feature.borderColor} border`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-umber-800 mb-3">
                    <UmberText>{feature.title}</UmberText>
                  </h3>
                  <p className="text-sm md:text-base text-umber-700 leading-relaxed">
                    <UmberText>{feature.description}</UmberText>
                  </p>
                </div>
              </div>
              
              {/* Feature Mockup */}
              <div className="flex justify-center">
                {feature.mockup}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-umber-800 mb-12">
            <UmberText>...and so much more!</UmberText>
          </h3>
        </motion.div>

        {/* Mini Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {miniFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-umber-100 hover:shadow-md transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <div className="w-12 h-12 bg-umber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-umber-600" />
              </div>
              <h4 className="font-semibold text-umber-800 mb-1 text-sm md:text-base">
                <UmberText>{feature.title}</UmberText>
              </h4>
              <p className="text-xs md:text-sm text-umber-600">
                <UmberText>{feature.description}</UmberText>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="contemplative"
            size="md"
            className="px-8 py-4"
          >
            <UmberText>Get started →</UmberText>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
