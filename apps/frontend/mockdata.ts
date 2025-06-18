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
// Generate mock uptime history for the last 30 minutes (10 blocks of 3 minutes each)
const generateUptimeHistory = (baseStatus: "up" | "down") => {
  const history = [];
  const now = new Date();

  for (let i = 9; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3 * 60 * 1000); // 3 minutes intervals
    // Occasionally flip status to show some variability
    const shouldFlip = Math.random() < 0.1;
    const status = shouldFlip
      ? baseStatus === "up"
        ? "down"
        : "up"
      : baseStatus;

    history.push({
      timestamp,
      status,
      responseTime:
        status === "up" ? Math.floor(Math.random() * 500) + 100 : undefined,
    });
  }

  return history;
};

export const mockWebsites: Website[] = [
  {
    id: "1",
    name: "Company Website",
    url: "https://company.com",
    status: "up",
    responseTime: 245,
    lastChecked: new Date(),
    uptimeHistory: generateUptimeHistory("up"),
  },
  {
    id: "2",
    name: "API Gateway",
    url: "https://api.company.com",
    status: "up",
    responseTime: 156,
    lastChecked: new Date(Date.now() - 30000),
    uptimeHistory: generateUptimeHistory("up"),
  },
  {
    id: "3",
    name: "Admin Dashboard",
    url: "https://admin.company.com",
    status: "down",
    lastChecked: new Date(Date.now() - 120000),
    uptimeHistory: generateUptimeHistory("down"),
  },
  {
    id: "4",
    name: "Mobile App API",
    url: "https://mobile-api.company.com",
    status: "up",
    responseTime: 312,
    lastChecked: new Date(Date.now() - 45000),
    uptimeHistory: generateUptimeHistory("up"),
  },
  {
    id: "5",
    name: "Payment Gateway",
    url: "https://payments.company.com",
    status: "up",
    responseTime: 189,
    lastChecked: new Date(Date.now() - 15000),
    uptimeHistory: generateUptimeHistory("up"),
  },
  {
    id: "6",
    name: "CDN Endpoint",
    url: "https://cdn.company.com",
    status: "down",
    lastChecked: new Date(Date.now() - 300000),
    uptimeHistory: generateUptimeHistory("down"),
  },
];
