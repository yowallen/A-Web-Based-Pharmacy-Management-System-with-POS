import {useEffect, useState} from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsPending(true);

    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url, {signal: controller.signal});
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            const json = await response.json();

            setIsPending(false);
            setError(null);
            setData(json);
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Fetching was Aborted");
            console.log(err);
          } else {
            setIsPending(false);
            setError("No data found");
          }
        }
      };

      fetchData();

      return () => {
        controller.abort();
      };
    }, 1500);
  }, [url]);

  return {data, isPending, error};
};

export default useFetch;
