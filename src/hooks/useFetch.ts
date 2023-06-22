import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url:string) {
    const config = {
        headers: {
            "dev-email-address": "otaviomiranda@usp.br",
          }
    };

    const [data, setData] = useState<T | null>(null);
    
    useEffect(() => {
        axios.get(url, config)
        .then(response => {
            setData(response.data);
          })
          .catch((err) => {
            console.error("Ocorreu um erro", err);
          });
      }, []);
      return { data }
}