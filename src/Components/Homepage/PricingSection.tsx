import React from "react";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Basic Trader",
      price: "$0",
      period: "/month",
      description: "Perfect for beginners starting their crypto journey",
      features: [
        "Basic spot trading",
        "Market & limit orders",
        "Basic market analysis",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Pro Trader",
      price: "$29",
      period: "/month",
      description: "Advanced features for serious traders",
      features: [
        "Advanced trading tools",
        "Margin trading up to 10x",
        "Advanced technical analysis",
        "Priority support",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Institutional Custom",
      price: "Custom",
      period: "",
      description: "Enterprise-grade solutions for institutions",
      features: [
        "Custom trading solutions",
        "Unlimited trading volume",
        "OTC desk access",
        "Dedicated account manager",
        "Custom API integration",
        "24/7 priority support",
      ],
      popular: false,
    },
  ];

  return (
    <section id="prices" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Choose Your Trading Plan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select the perfect trading plan with advanced features and
            competitive fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "ring-2 ring-green-500/50 hover:ring-green-400"
                  : "hover:border-gray-600"
              }`}
            >
              {plan.popular && (
                <div className="text-green-500 text-sm mb-6 inline-block font-medium">
                  * Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-2 text-lg">
                  {plan.period}
                </span>
              </div>
              <p className="text-gray-400 mb-8 text-lg">{plan.description}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full font-semibold py-4 rounded-full transition-all duration-300 transform hover:scale-105 mt-auto ${
                  plan.popular
                    ? "bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white shadow-lg hover:shadow-green-500/25"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
