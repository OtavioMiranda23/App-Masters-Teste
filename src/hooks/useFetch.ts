"use client"
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url:string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);
    const [errorMensage, setErrorMensage] = useState<string | null>(null);

    useEffect(() => {
      axios.get(url, options)
      .then(response => {
          setData(response.data);
        })
        .catch(err => {

          let error = "";
          if (err.response){
            const status = err.response.status;
            if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
              error = "O servidor falhou em responder, tente recarregar a página.";
              console.error(error, status);
              setErrorMensage(error);
            } else {
              error = "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.";
              console.error(error)
              setErrorMensage(error);
            }
          }
          if (err.code === 'ECONNABORTED') {
            error = "O servidor demorou para responder, tente mais tarde.";
            console.error(error, err.code)
            setErrorMensage(error);
          }
        })
        .finally(()=> {
          setIsFetching(false);
      })
    }, []);
      return { data, isFetching, errorMensage }
}