import React from "react";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 9,
    description: "Perfect for personal projects and small websites",
    features: [
      "Monitor up to 5 websites",
      "5-minute check intervals",
      "Email notifications",
      "Basic uptime reports",
      "30-day data retention",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 29,
    description: "Ideal for growing businesses and agencies",
    features: [
      "Monitor up to 25 websites",
      "1-minute check intervals",
      "Email, SMS & Slack alerts",
      "Advanced analytics",
      "1-year data retention",
      "SSL monitoring",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations with critical infrastructure",
    features: [
      "Unlimited websites",
      "30-second check intervals",
      "All notification channels",
      "Custom dashboards",
      "Unlimited data retention",
      "Priority support",
      "White-label reports",
      "SLA guarantees",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose the perfect plan for your monitoring needs. All plans include
            a 14-day free trial with no credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <p className="text-slate-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            All plans include 14-day free trial • No credit card required •
            Cancel anytime
          </p>
          <a
            href="#contact"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Need a custom plan? Contact our sales team →
          </a>
        </div>
      </div>
    </section>
  );
}
