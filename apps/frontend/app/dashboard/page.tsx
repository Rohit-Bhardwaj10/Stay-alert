"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { WebsiteCard } from "@/components/websiteCard";
import { CreateWebsiteModal } from "@/components/createWebsiteModal";
import { useWebsites } from "@/hooks/useWebsites";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
function aggregateTicks(ticks) {
  // Group ticks into 3-minute windows
  const windowMs = 3 * 60 * 1000;
  const sorted = [...ticks].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  const result = [];
  let windowStart = null;
  let windowTicks = [];
  for (const tick of sorted) {
    const tickTime = new Date(tick.createdAt).getTime();
    if (windowStart === null || tickTime >= windowStart + windowMs) {
      if (windowTicks.length > 0) {
        // Aggregate: use the latest tick in the window
        const last = windowTicks[windowTicks.length - 1];
        result.push({
          timestamp: new Date(last.createdAt),
          status: last.status === "up" ? "up" : "down",
          responseTime: last.latency,
        });
      }
      windowStart = tickTime - (tickTime % windowMs);
      windowTicks = [];
    }
    windowTicks.push(tick);
  }
  if (windowTicks.length > 0) {
    const last = windowTicks[windowTicks.length - 1];
    result.push({
      timestamp: new Date(last.createdAt),
      status: last.status === "up" ? "up" : "down",
      responseTime: last.latency,
    });
  }
  return result;
}

const Dashboard: React.FC = () => {
  const { websites, fetchWebsites } = useWebsites();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { getToken } = useAuth();

  // Adapt websites for WebsiteCard
  const adaptedWebsites = websites.map((site) => {
    const ticks = site.ticks || [];
    const uptimeHistory = aggregateTicks(ticks);
    const lastTick = ticks[ticks.length - 1];
    return {
      id: site.id,
      name: site.url, // No name in API, fallback to url
      url: site.url,
      status: lastTick ? (lastTick.status === "up" ? "up" : "down") : "down",
      responseTime: lastTick ? lastTick.latency : undefined,
      lastChecked: lastTick ? new Date(lastTick.createdAt) : new Date(),
      uptimeHistory,
    };
  });

  const upCount = adaptedWebsites.filter((site) => site.status === "up").length;
  const upPercentage =
    adaptedWebsites.length > 0
      ? Math.round((upCount / adaptedWebsites.length) * 100)
      : 0;

  // handleCreateWebsite would need to POST to API in a real app

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Website Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Website</span>
          </button>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:bg-gray-900/70 transition-all duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">
                  Total Monitors
                </p>
                <p className="text-2xl font-bold text-white">
                  {adaptedWebsites.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:bg-gray-900/70 transition-all duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Online</p>
                <p className="text-2xl font-bold text-green-400">{upCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:bg-gray-900/70 transition-all duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Uptime</p>
                <p className="text-2xl font-bold text-green-400">
                  {upPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Websites List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Monitored Websites
            </h2>
            <div className="text-sm text-gray-400">
              Click on any website to view detailed uptime history
            </div>
          </div>
          <div className="space-y-4">
            {adaptedWebsites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        </div>
      </div>
      <CreateWebsiteModal
        isOpen={isCreateModalOpen}
        onClose={async (url) => {
          const token = await getToken();
          setIsCreateModalOpen(false);
          axios
            .post(
              `${API_BACKEND_URL}/api/v1/website`,
              {
                url,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              console.log("Website added:", response.data);
              fetchWebsites();
              setIsCreateModalOpen(false);
              alert("Website added successfully!");
            })
            .catch((error) => {
              console.error("Error adding website:", error);
            });
        }}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Dashboard;
