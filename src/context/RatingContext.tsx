"use client";
import { store } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
  doc
} from "firebase/firestore";
import Rating from "@/types/rating";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const db = collection(store, "likes");

interface IRatingContext {
  ratings: Rating[];
  handleLike: (gameId: number) => void;
  isGameLiked: (gameId: number) => boolean;
  // removeLike: (gameId: number) => void;
  // addRating: (gameId: number) => void;
  // editRating: (gameId: number) => void;
  // getUserRatings: (gameId: number) => void;
  // getRatedGames: (gameId: number) => void;
  // sortByRating: (gameId: number) => void;
}

const RatingContext = createContext<IRatingContext>({
  ratings: [],
  handleLike: () => {},
  isGameLiked: () => false,
});

export function RatingProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const { user, isLoading } = useAuth();

  // adicionar Like | addLike
  // remover Like | removeLike
  // adicionar Avaliação | addRating
  // editar Avaliação | editRating
  // Pegar Avaliações do usuário | getUserRatings
  // Filtrar por likes | getRatedGames
  // Ordernar por avaliação | sortByRating

  async function getUserRatings(userId: string) {
    const res = query(db, where("userId", "==", userId));

    const r = (await getDocs(res)).docs.map((doc) => {
      let rating = doc.data();
      return {
        gameId: rating.gameId,
        userId: rating.userId,
        liked: rating.liked,
        rating: rating.rating,
      };
    });

    setRatings(r);
  }

  function isGameLiked(gameId: number) {
    return ratings.filter(r => r.gameId === gameId && r.liked).length > 0;
  }

  async function getGameRating(gameId: number) {
    if (!user) {
      console.warn("RatingContext$getGameRating: Usuário inválido.");
      return null;
    }

    const res = query(
      db,
      where("userId", "==", user.uid),
      where("gameId", "==", gameId)
    );
    const querySnapshot = await getDocs(res);

    if (querySnapshot.docs.length < 1) {
      return null;
    }

    const rating = querySnapshot.docs[0];

    return rating;
  }

  async function handleLike(gameId: number) {
    if (!user) {
      console.warn("RatingContext$addLike: Usuário inválido.");
      return;
    }

    const rating = await getGameRating(gameId);

    if (rating) {
      // Já temos um documento
      setDoc(rating.ref, { ...rating.data(), liked: !rating.data().liked });
    } else {
      // Criaremos um documento
      addDoc(db, { userId: user.uid, gameId, rating: 0, liked: true });
    }

    await getUserRatings(user.uid);

  }

  useEffect(() => {
    console.log(ratings);
  }, [ratings]);

  useEffect(() => {
    if (user) {
      console.log("USE EFFECT: REFRESCANDO LISTA DE RATINGS PARA USUÁRIO " + user.uid);
      getUserRatings(user.uid);
    }
  }, [user]);

  return (
    <RatingContext.Provider
      value={{
        ratings,
        handleLike,
        isGameLiked,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}

export default RatingContext;

export function useRating() {
  const data = useContext(RatingContext);
  return data;
}

// export async function createLike(rating: Rating) {
//   let like = await addDoc(db, rating);
//   console.log("TESTANDO: CRIADO LIKE " + like);
// }

// export async function getLikesByUser(userId: string) {
//   const res = query(db, where("userId", "==", userId));
//   const querySnapshot = await getDocs(res);
//   querySnapshot.docs.forEach((r) => console.log(r.data()));
// }
// export async function deleteAllGamesOfUser(userId: string) {
//   const res = query(db, where("userId", "==", userId));
//   const querySnapshot = await getDocs(res);
//   querySnapshot.forEach(async (doc) => {
//     await deleteDoc(doc.ref);
//     console.log(`excluído com sucesso`);
//   });
// }
// export async function deleteAllGames() {
//   const querySnapshot = await getDocs(db);
//   const deletionPromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
//   await Promise.all(deletionPromises);
//   console.log(
//     "Todos os jogos de todos os usuários foram excluídos com sucesso."
//   );
// }

// export async function setLikedFalse(userId: string, gameId: number) {
//   const res = query(
//     db,
//     where("userId", "==", userId),
//     where("gameId", "==", gameId)
//   );
//   const querySnapshot = await getDocs(res);

//   querySnapshot.forEach(async (doc) => {
//     const liked = doc.data().liked;
//     if (liked) {
//       const docRef = doc.ref;
//       await updateDoc(docRef, { liked: false });
//       console.log(
//         `Atributo 'liked' definido como falso para o jogo com id ${gameId}`
//       );
//     }
//   });
// }
