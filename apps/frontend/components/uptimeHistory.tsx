import React from "react";

interface UptimeRecord {
  timestamp: Date;
  status: "up" | "down";
  responseTime?: number;
}

interface UptimeHistoryProps {
  history: UptimeRecord[];
}

export const UptimeHistory: React.FC<UptimeHistoryProps> = ({ history }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Last 30 minutes</span>
        <span>Latest</span>
      </div>

      <div className="flex space-x-2">
        {history.map((record, index) => (
          <div key={index} className="flex-1 group relative">
            <div
              className={`
                h-10 rounded-lg transition-all duration-200 
                ${
                  record.status === "up"
                    ? "bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/20"
                    : "bg-red-500 hover:bg-red-400 shadow-lg shadow-red-500/20"
                }
              `}
            />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800 border border-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-xl">
              <div className="font-medium">{formatTime(record.timestamp)}</div>
              <div className="capitalize text-gray-300">{record.status}</div>
              {record.responseTime && (
                <div className="text-gray-300">{record.responseTime}ms</div>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>30 min ago</span>
        <span>Now</span>
      </div>
    </div>
  );
};
