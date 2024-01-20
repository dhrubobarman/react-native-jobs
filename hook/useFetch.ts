import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { search, job_details } from "@/data";
const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const useFetch = (endpoint: string, query: any) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": `${rapidApiKey}`,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetcher = useCallback(() => {
    setIsLoading(false);
    switch (endpoint) {
      case "search":
        setData(search);
        break;
      default:
        // fetchData();
        setData(job_details);
        break;
    }
    // fetchData();
  }, [endpoint]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  const refetch = () => {
    setIsLoading(true);
    fetcher();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
