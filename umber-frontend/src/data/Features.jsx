import React from "react";
import {
  BookmarkIcon,
  Share1Icon,
  EyeOpenIcon,
  MagicWandIcon,
  PlusIcon,
  ChatBubbleIcon,
  LockClosedIcon,
  DownloadIcon,
  RocketIcon,
  LightningBoltIcon,
  SwitchIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

const mainFeatures = [
  {
    title: "smart wishlist management",
    description:
      "create and organize unlimited wishlists across any category. Add items with rich details, images, and notes. Our intelligent categorization helps you stay organized effortlessly.",
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
            <div className="text-sm font-semibold text-umber-800">
              Tech Wishlist
            </div>
            <div className="text-xs text-umber-600">12 items • £2,847.99</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-moss-50 rounded-lg">
            <div className="w-8 h-8 bg-moss-300 rounded"></div>
            <div className="text-xs">
              <div className="font-medium text-umber-800">MacBook Pro M3</div>
              <div className="text-umber-600">£1,899.00</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-moss-50 rounded-lg">
            <div className="w-8 h-8 bg-moss-300 rounded"></div>
            <div className="text-xs">
              <div className="font-medium text-umber-800">AirPods Pro</div>
              <div className="text-umber-600">£249.00</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-moss-50 rounded-lg">
            <div className="w-8 h-8 bg-moss-300 rounded"></div>
            <div className="text-xs">
              <div className="font-medium text-umber-800">iPad Air</div>
              <div className="text-umber-600">£699.00</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "collaborative sharing",
    description:
      "share wishlists with friends and family. Get suggestions, comments, and recommendations. Perfect for gift planning, group purchases, or inspiration sharing.",
    icon: Share1Icon,
    bgGradient: "from-ochre-100 to-ochre-200",
    iconColor: "text-ochre-700",
    borderColor: "border-ochre-200",
    mockup: (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-ochre-200 w-full">
        <div className="text-xs text-ochre-700 mb-3">Shared with 3 friends</div>
        <div className="flex -space-x-2 mb-4">
          <div className="w-8 h-8 bg-ochre-400 rounded-full border-2 border-white"></div>
          <div className="w-8 h-8 bg-ochre-500 rounded-full border-2 border-white"></div>
          <div className="w-8 h-8 bg-ochre-600 rounded-full border-2 border-white"></div>
        </div>
        <div className="space-y-3">
          <div className="bg-ochre-50 rounded-lg p-3">
            <div className="text-xs font-medium text-umber-800">
              Sarah suggested:
            </div>
            <div className="text-xs text-umber-600">
              "Have you seen the new iPad Air?"
            </div>
          </div>
          <div className="bg-ochre-50 rounded-lg p-3">
            <div className="text-xs font-medium text-umber-800">
              Mike commented:
            </div>
            <div className="text-xs text-umber-600">
              "That MacBook is on sale at Best Buy!"
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="text-xs bg-ochre-200 text-ochre-800 px-3 py-2 rounded">
            Reply
          </button>
          <button className="text-xs bg-ochre-200 text-ochre-800 px-3 py-2 rounded">
            Add Item
          </button>
        </div>
      </div>
    ),
  },
  {
    title: "mindMaps",
    description:
      "see your desires in a beautiful, interactive mind map. Explore connections between items, discover patterns in your wants, and gain insights into your preferences.",
    icon: EyeOpenIcon,
    bgGradient: "from-umber-100 to-umber-200",
    iconColor: "text-umber-700",
    borderColor: "border-umber-200",
    mockup: (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-umber-200 w-full">
        <div className="relative h-56 flex items-center justify-center">
          {/* Center Node - Umber Name */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-umber-600 to-umber-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs text-white font-bold text-center leading-tight">
                Home
                <br />
                Tech
              </span>
            </div>
          </div>

          {/* Branch Nodes - Nests - Freeform positioning */}
          {/* Living Room - Top left area */}
          <div className="absolute top-6 left-8">
            <div className="w-14 h-14 bg-gradient-to-br from-moss-400 to-moss-500 rounded-2xl flex items-center justify-center shadow-md transform rotate-3">
              <span className="text-xs text-white font-semibold text-center leading-tight">
                Living
                <br />
                Room
              </span>
            </div>
          </div>

          {/* Kitchen - Top right area */}
          <div className="absolute top-8 right-6">
            <div className="w-14 h-14 bg-gradient-to-br from-ochre-400 to-ochre-500 rounded-xl flex items-center justify-center shadow-md transform -rotate-2">
              <span className="text-xs text-white font-semibold text-center leading-tight">
                Kitchen
              </span>
            </div>
          </div>

          {/* Outdoor - Bottom right area */}
          <div className="absolute bottom-6 right-8">
            <div className="w-14 h-14 bg-gradient-to-br from-moss-600 to-moss-700 rounded-2xl flex items-center justify-center shadow-md transform rotate-1">
              <span className="text-xs text-white font-semibold text-center leading-tight">
                Outdoor
              </span>
            </div>
          </div>

          {/* Bedroom - Bottom left area */}
          <div className="absolute bottom-8 left-6">
            <div className="w-14 h-14 bg-gradient-to-br from-umber-400 to-umber-500 rounded-xl flex items-center justify-center shadow-md transform -rotate-1">
              <span className="text-xs text-white font-semibold text-center leading-tight">
                Bedroom
              </span>
            </div>
          </div>

          {/* Connection Lines - Straight gradient lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 224"
          >
            {/* Define gradients */}
            <defs>
              <linearGradient
                id="livingGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#65a30d" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient
                id="kitchenGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient
                id="outdoorGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#65a30d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient
                id="bedroomGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a3a3a3" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6b7280" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Center to Living Room*/}
            {/* From center node edge (130, 95) to Living Room node edge (60, 53) */}
            <line
              x1="130"
              y1="95"
              x2="0"
              y2="53"
              stroke="url(#livingGradient)"
              strokeWidth="3"
              strokeDasharray="5,3"
              strokeLinecap="round"
            />

            {/* Center to Kitchen*/}
            {/* From center node edge (170, 95) to Kitchen node edge (240, 53) */}
            <line
              x1="170"
              y1="95"
              x2="300"
              y2="53"
              stroke="url(#kitchenGradient)"
              strokeWidth="3"
              strokeDasharray="7,2"
              strokeLinecap="round"
            />

            {/* Center to Outdoor */}
            {/* From center node edge (170, 129) to Outdoor node edge (240, 171) */}
            <line
              x1="170"
              y1="129"
              x2="300"
              y2="171"
              stroke="url(#outdoorGradient)"
              strokeWidth="3"
              strokeDasharray="4,4"
              strokeLinecap="round"
            />

            {/* Center to Bedroom*/}
            {/* From center node edge (130, 129) to Bedroom node edge (60, 171) */}
            <line
              x1="130"
              y1="129"
              x2="0"
              y2="171"
              stroke="url(#bedroomGradient)"
              strokeWidth="3"
              strokeDasharray="6,3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-xs text-umber-600 text-center mt-2">
          a 'Home Tech' mind map
        </div>
      </div>
    ),
  },
  {
    title: "AI-powered Insights",
    description:
      "get smart recommendations based on your wishlist patterns. our AI helps categorize items, suggests related products, and provides insights into your wanting habits.",
    icon: MagicWandIcon,
    bgGradient: "from-moss-100 via-ochre-50 to-umber-100",
    iconColor: "text-moss-700",
    borderColor: "border-moss-200",
    comingSoon: true,
    mockup: (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-moss-200 w-full">
        <div className="flex items-center gap-2 mb-3">
          <MagicWandIcon className="w-4 h-4 text-moss-600" />
          <span className="text-xs font-semibold text-umber-800">
            AI Suggestions
          </span>
        </div>
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-moss-50 to-ochre-50 rounded-lg p-2">
            <div className="text-xs font-medium text-umber-800">
              Based on your tech items:
            </div>
            <div className="text-xs text-umber-600">
              "Consider adding a laptop stand"
            </div>
          </div>
          <div className="bg-gradient-to-r from-ochre-50 to-umber-50 rounded-lg p-2">
            <div className="text-xs font-medium text-umber-800">
              Pattern detected:
            </div>
            <div className="text-xs text-umber-600">
              "You prefer premium brands"
            </div>
          </div>
        </div>
        <button className="w-full mt-2 text-xs bg-moss-100 text-moss-800 py-1 rounded">
          View All Insights
        </button>
      </div>
    ),
  },
];

const miniFeatures = [
  {
    title: "Quick Add",
    icon: PlusIcon,
    description:
      "Instantly add items from any website with our browser extension or mobile app.",
  },
  {
    title: "Comments",
    icon: ChatBubbleIcon,
    description:
      "Leave notes and comments on items to remember why you wanted them.",
  },
  {
    title: "Privacy Controls",
    icon: SwitchIcon,
    description:
      "Choose who can see your wishlists with granular privacy settings.",
  },
  {
    title: "Export Options",
    icon: DownloadIcon,
    description:
      "Export your wishlists as PDF, CSV, or share them as beautiful web pages.",
  },
  {
    title: "Real-time Sync",
    icon: LightningBoltIcon,
    description:
      "Your wishlists stay synchronized across all devices in real-time.",
  },
  {
    title: "Data Security",
    icon: LockClosedIcon,
    description:
      "Enterprise-grade encryption keeps your personal data safe and secure.",
  },
  {
    title: "Smart Categories",
    icon: RocketIcon,
    description:
      "AI automatically organizes your items into meaningful categories and collections.",
    comingSoon: true,
  },
  {
    title: "Integrations",
    icon: MixerHorizontalIcon,
    description:
      "Connect with popular shopping sites and productivity tools seamlessly.",
    comingSoon: true,
  },
];

export { mainFeatures, miniFeatures };
