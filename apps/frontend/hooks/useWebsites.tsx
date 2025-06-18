import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";

import axios from "axios";
import { useEffect, useState } from "react";

interface website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
  }[];
}

export const useWebsites = () => {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<website[]>([]);

  const fetchWebsites = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
      headers: {
        Authorization: token,
      },
    });
    setWebsites(response.data.websites);
  };
  useEffect(() => {
    fetchWebsites();
    const interval = setInterval(
      () => {
        fetchWebsites();
      },
      1000 * 60 * 1
    ); // Fetch every minute
    return () => clearInterval(interval);
  }, []);
  return { websites, fetchWebsites };
};
