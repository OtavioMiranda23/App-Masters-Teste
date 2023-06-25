import SearchContext from "@/context/SearchContext";
import { useContext } from "react";

export default function useSearchContext(){
  const data = useContext(SearchContext);

  if(data == null){
    throw new Error("useSearchContext foi usado fora de um provider!");
  }

  return data;
}