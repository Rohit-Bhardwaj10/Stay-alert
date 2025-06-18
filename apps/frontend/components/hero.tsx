import React from "react";
import { ArrowRight, Play, Shield, Zap, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-slate-300">
                99.9% Uptime Guaranteed
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Keep Your Sites
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Always Online
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Monitor your websites, APIs, and servers 24/7 with advanced uptime
              monitoring. Get instant alerts when something goes wrong and
              detailed insights to keep your business running.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Monitoring Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group flex items-center justify-center space-x-2 text-white border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-slate-800/50">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>30-second setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-green-400" />
                <span>Global monitoring</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">
                      api.example.com
                    </span>
                  </div>
                  <span className="text-green-400 font-semibold">99.9%</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">
                      www.example.com
                    </span>
                  </div>
                  <span className="text-green-400 font-semibold">100%</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-red-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">
                      legacy.example.com
                    </span>
                  </div>
                  <span className="text-red-400 font-semibold">95.2%</span>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-300 text-sm font-medium">
                    ⚡ Alert sent 2 minutes ago
                  </p>
                  <p className="text-slate-300 text-sm mt-1">
                    legacy.example.com is down - investigating...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
