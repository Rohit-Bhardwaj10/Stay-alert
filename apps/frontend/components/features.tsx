import React from "react";
import {
  Bell,
  BarChart3,
  Globe,
  Shield,
  Smartphone,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Instant Alerts",
    description:
      "Get notified immediately when your site goes down via email, SMS, Slack, or webhooks.",
    color: "text-blue-400",
  },
  {
    icon: Globe,
    title: "Global Monitoring",
    description:
      "Monitor from 15+ locations worldwide to ensure accurate uptime measurements.",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Comprehensive reports with response times, uptime percentages, and performance insights.",
    color: "text-purple-400",
  },
  {
    icon: Shield,
    title: "SSL Monitoring",
    description:
      "Track SSL certificate expiry dates and get alerts before they expire.",
    color: "text-yellow-400",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Stay connected with our mobile app for iOS and Android with push notifications.",
    color: "text-pink-400",
  },
  {
    icon: Clock,
    title: "30s Checks",
    description:
      "Ultra-fast 30-second monitoring intervals to catch issues before your users do.",
    color: "text-cyan-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Stay Online
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive monitoring tools designed to keep your websites, APIs,
            and services running smoothly around the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-slate-800 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
