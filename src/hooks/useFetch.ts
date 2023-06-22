"use client"
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url:string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    
    useEffect(() => {
        axios.get(url, options)
        .then(response => {
            setData(response.data);
          })
          .catch(err => {
            if (err.response){
              const status = err.response.status;
              if (status === 500 || status === 502 || status === 503 ||  status === 504 || status === 507 || status === 508 || status === 509) {
                console.error("O servidor fahou em responder, tente recarregar a página", status);
              } else {
                console.error("O servidor não conseguirá responder por agora, tente voltar novamente mais tarde", status)
              }
            }
            setError(err);
          })
          .finally(()=> {
            setIsFetching(false);
        })
      }, []);
      return { data, isFetching, error }
}