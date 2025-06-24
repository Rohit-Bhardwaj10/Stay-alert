import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { API_BACKEND_URL } from "@/config";

interface Tick {
  id: string;
  status: string;
  createdAt: string;
}

interface Website {
  id: string;
  url: string;
  userId: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  ticks: Tick[];
}

export const useWebsites = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchWebsites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer prefix here
          "Content-Type": "application/json",
        },
      });

      setWebsites(response.data.websites || []);
    } catch (err) {
      console.error("Error fetching websites:", err);

      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError(
            "Cannot connect to server. Make sure your backend is running on port 8080."
          );
        } else if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError(err.response?.data?.error || "Failed to fetch websites");
        }
      } else {
        setError("An unexpected error occurred");
      }

      setWebsites([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);

  const refreshWebsites = useCallback(() => {
    return fetchWebsites();
  }, [fetchWebsites]);

  return {
    websites,
    loading,
    error,
    refreshWebsites,
  };
};
