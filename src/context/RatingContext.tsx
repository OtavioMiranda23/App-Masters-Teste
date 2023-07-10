import { store } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import Rating from "@/types/rating";

const db = collection(store, "likes");

export async function createLike(rating:Rating){
  let like = await addDoc(db, rating);
  console.log("TESTANDO: CRIADO LIKE " + like);
}

export async function getLikesByUser(userId:string){
  const res = query(db, where("userId", "==", userId));
  const querySnapshot = await getDocs(res)
  querySnapshot.docs.forEach(r => console.log(r.data())) 
}
export async function deleteAllGames(userId: string, ){
  const res = query(db, where("userId", "==", userId));
  const querySnapshot = await getDocs(res);
  querySnapshot.forEach(async(doc)=> {
    await deleteDoc(doc.ref);
    console.log(`excluído com sucesso`);
  })
}
export async function setLikedFalse(userId: string, gameId: number) {
  const res = query(db, where("userId", "==", userId), where("gameId", "==", gameId));
  const querySnapshot = await getDocs(res);

  querySnapshot.forEach(async (doc)=> {
    const liked = doc.data().liked;
    if (liked) {
      const docRef = doc.ref;
      await updateDoc(docRef, { liked: false})
      console.log(`Atributo 'liked' definido como falso para o jogo com id ${gameId}`);

    }
  })
}





