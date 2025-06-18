import React, { useState } from "react";
import { ChevronDown, Globe, Clock } from "lucide-react";
import { StatusIndicator } from "./statusIndicator";
import { UptimeHistory } from "./uptimeHistory";

interface Website {
  id: string;
  name: string;
  url: string;
  status: "up" | "down";
  responseTime?: number;
  lastChecked: Date;
  uptimeHistory: UptimeRecord[];
}

interface UptimeRecord {
  timestamp: Date;
  status: "up" | "down";
  responseTime?: number;
}

interface WebsiteCardProps {
  website: Website;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatLastChecked = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:bg-gray-900/70 hover:border-gray-700 transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 text-left hover:bg-gray-800/30 transition-colors duration-150 focus:outline-none focus:bg-gray-800/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <StatusIndicator status={website.status} size="lg" />

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <h3 className="font-semibold text-white">{website.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mt-1">{website.url}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div
                className={`font-medium ${website.status === "up" ? "text-green-400" : "text-red-400"}`}
              >
                {website.status === "up" ? "Online" : "Offline"}
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                <Clock className="w-3 h-3" />
                <span>{formatLastChecked(website.lastChecked)}</span>
              </div>
              {website.responseTime && (
                <div className="text-xs text-gray-500 mt-1">
                  {website.responseTime}ms
                </div>
              )}
            </div>

            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-800 bg-gray-800/20">
          <div className="pt-6">
            <UptimeHistory history={website.uptimeHistory} />
          </div>
        </div>
      )}
    </div>
  );
};
