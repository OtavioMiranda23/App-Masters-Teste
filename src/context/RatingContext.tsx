import { store } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, doc } from "firebase/firestore";
import Rating from "@/types/rating";

const db = collection(store, "likes");

export async function createLike(rating:Rating){
  let d = await addDoc(db, rating);
  console.log("TESTANDO: CRIADO LIKE " + d);
}

export async function getLikesByUser(userId:string){
  const res = query(db, where("userId", "==", userId));
  const r = await getDocs(res)
  r.docs.forEach(r => console.log(r.data())) 
}


