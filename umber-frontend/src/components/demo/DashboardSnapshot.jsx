import React from "react";
import { HeartIcon, PlusIcon, MagnifyingGlassIcon, PersonIcon, HomeIcon, GridIcon, BookmarkIcon, StarIcon, GearIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import UmberText from "../ui/UmberText";
import booksImage from "../../assets/books.png";
import techImage from "../../assets/tech.png";
import skincareImage from "../../assets/skincare.png";
import clothesImage from "../../assets/clothes.png";

function DashboardSnapshot() {
  const categories = [
    { 
      id: 1, 
      name: "Tech", 
      description: "Gadgets and accessories.",
      image: techImage,
      priceTotal: "£2,347",
      items: ["MacBook Pro M3", "Sony WH-1000XM5", "iPad Pro"]
    },
    { 
      id: 2, 
      name: "Clothing", 
      description: "Apparel for all seasons.",
      image: clothesImage,
      priceTotal: "£348",
      items: ["Levi's 501 Jeans", "Patagonia Fleece", "Allbirds Tree Runners"]
    },
    { 
      id: 3, 
      name: "Books", 
      description: "Fiction and non-fiction reads.",
      image: booksImage,
      priceTotal: "£257",
      items: ["The Seven Husbands of Evelyn Hugo", "Klara and the Sun", "Project Hail Mary"]
    },
    { 
      id: 4, 
      name: "Skincare", 
      description: "Daily skincare routine",
      image: skincareImage,
      priceTotal: "£128",
      items: ["The Ordinary Niacinamide", "Cetaphil Moisturizer", "Sunscreen SPF 50"]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Main Dashboard Layout */}
      <div className="flex h-[600px]">
        {/* Side Navigation */}
        <div className="w-20 bg-white flex flex-col items-center py-6">
          {/* Logo */}
          <div className="w-12 h-12 bg-moss-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-3xl italic font-family-display">u</span>
          </div>
          
          {/* Spacer to push nav container to center */}
          <div className="flex-1 flex items-center justify-center">
            {/* Nav Container - matching SideNav style */}
            <div className="bg-umber-50/50 border border-umber-200 rounded-2xl shadow-sm p-2">
            <div className="flex flex-col gap-2">
              {/* Home - Active */}
              <div className="p-3 rounded-xl bg-moss-100 text-moss-700">
                <HomeIcon className="w-5 h-5" />
              </div>
              {/* Search */}
              <div className="p-3 rounded-xl text-umber-500 hover:text-umber-700 hover:bg-umber-50 transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
              {/* Add */}
              <div className="p-3 rounded-xl text-umber-500 hover:text-umber-700 hover:bg-umber-50 transition-colors">
                <PlusIcon className="w-5 h-5" />
              </div>
              {/* Profile */}
              <div className="p-3 rounded-xl text-umber-500 hover:text-umber-700 hover:bg-umber-50 transition-colors">
                <GearIcon className="w-5 h-5" />
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Welcome Card */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-moss-100 to-ochre-100 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-display font-semibold text-umber-800 mb-2">
                <UmberText>welcome back, Alex</UmberText>
              </h2>
              <p className="text-umber-600 mb-4">
                <UmberText>you have 84 items across 4 umbers. what are we adding today?</UmberText>
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-moss-600 text-white rounded-lg text-sm font-medium hover:bg-moss-700 transition-colors">
                  <UmberText><PlusIcon className="w-5 h-5" /></UmberText>
                </button>
                <button className="px-4 py-2 border border-umber-300 text-umber-700 rounded-lg text-sm font-medium hover:bg-umber-50 transition-colors">
                  <UmberText>new umber</UmberText>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="flex-1 p-6">
            <h3 className="text-lg font-semibold text-umber-800 mb-4">
              <UmberText>your umbers</UmberText>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-umber-50 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-umber-100"
                >
                  {/* Image */}
                  <div className="w-full h-32 bg-umber-100 rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xl font-display font-semibold text-umber-900 mb-1">
                        <UmberText>{category.name}</UmberText>
                      </h4>
                      <p className="text-umber-600 text-sm">
                        <UmberText>{category.description}</UmberText>
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-ochre-700">
                        <UmberText>{category.priceTotal}</UmberText>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-umber-200 hover:bg-umber-300 rounded-full flex items-center justify-center transition-colors">
                          <PlusIcon className="w-4 h-4 text-umber-700" />
                        </button>
                        <button className="w-8 h-8 bg-umber-200 hover:bg-umber-300 rounded-full flex items-center justify-center transition-colors">
                          <ArrowRightIcon className="w-4 h-4 text-umber-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="h-16 bg-white border-t border-umber-200 flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-moss-100 rounded-lg">
              <HomeIcon className="w-5 h-5 text-moss-700" />
              <span className="text-sm font-medium text-moss-700">
                <UmberText>Home</UmberText>
              </span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5 text-umber-400" />
              <span className="text-sm text-umber-400">
                <UmberText>Search</UmberText>
              </span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <PlusIcon className="w-5 h-5 text-umber-400" />
              <span className="text-sm text-umber-400">
                <UmberText>Add</UmberText>
              </span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <PersonIcon className="w-5 h-5 text-umber-400" />
              <span className="text-sm text-umber-400">
                <UmberText>Profile</UmberText>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSnapshot;
