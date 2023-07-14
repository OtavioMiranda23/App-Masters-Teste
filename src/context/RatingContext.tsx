"use client";
import { store } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  setDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import Rating from "@/types/rating";
import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { IGames } from "@/types/games";
import { sortDir } from "./SearchContext";

const db = collection(store, "likes");

interface IRatingContext {
  ratings: Rating[];
  handleLike: (gameId: number) => void;
  handleRating: (gameId: number, rating: number) => void;
  getRating: (gameId: number) => Rating | undefined;
  getRatedGames: (games: IGames[]) => IGames[] | undefined;
  verifySortByRatingRender: (sort: sortDir | null) => React.ReactNode;
}

interface IRatingProviderProps {
  children: JSX.Element | JSX.Element[];
}

const RatingContext = createContext<IRatingContext>({
  ratings: [],
  handleLike: () => {},
  handleRating: () => {},
  getRating: () => undefined,
  getRatedGames: () => undefined,
  verifySortByRatingRender: () => <></>
});

export function RatingProvider({ children }: IRatingProviderProps) {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Rating[]>([]);

  /*
   * useEffect adiciona um listener no evento onSnapshot do firestore
   * Assim, toda vez que houver alguma alteração na base de dados
   * em que um documento cujo id seja o do usuário logado,
   * isso irá triggerar uma atualização do state `ratings`
   */

  useEffect(() => {
    let unsubscribe: () => void;

    if (user) {
      const q = getById(user.uid);
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const d = mapToRatings(querySnapshot.docs);
        setRatings(d);
        // console.log(d);
      });
    }

    if (!user) setRatings([]);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // Optei por fazer a consulta no próprio state ao invés
  // do banco de dados em si por ser mais rápido e barato.

  // De qualquer forma, como estamos usando o listener onSnapshot
  // para sincronizar o state com o banco de dados, não vejo muito problema.
  function getRating(gameId: number) {
    return ratings.find((r) => r.gameId === gameId);
  }

  function getRatedGames(games: IGames[]) {
    const gameIds = ratings.map((g) => g.gameId);
    return games.filter((g) => gameIds.includes(g.id));
  }

  // Essa função lida com escrever no banco de dados em si
  async function handleLike(gameId: number) {
    if (!user) return; // Se não estivermos logados não podemos fazer nada

    // Primeiro verificar se já existe alguma avaliação deste jogo por este usuário
    const rating = getRating(gameId);
    const docRef = rating ? doc(db, rating.ratingId) : doc(db);

    // Se sim, vamos fazer o update dele. Assim evitamos duplicidade de dados.
    if (rating) {
      const r = await getDoc(docRef);
      // @ts-ignore
      return await setDoc(docRef, { liked: !r.data().liked }, { merge: true });
      // Como o liked é booleano, podemos usar uma função só para alternar entre like e dislike, apenas invertendo.
    }

    // Caso contrário, só um insert com valores padrões.
    return await addDoc(db, {
      gameId,
      userId: user.uid,
      rating: 0,
      liked: true,
    });
  }

  // Esta função segue o mesmo padrão
  async function handleRating(gameId: number, newRating: number) {
    if (!user) return;
    let finalRating = newRating;
    if (finalRating < 2) finalRating = 1;
    if (finalRating > 4) finalRating = 4;

    const rating = getRating(gameId);

    if (rating) {
  
      const docRef = doc(db, rating.ratingId);
      return await setDoc(docRef, { rating: finalRating }, { merge: true });
    }

    return await addDoc(db, {
      gameId,
      userId: user.uid,
      rating: finalRating,
      liked: false,
    });
  }

  // Não vi motivo para criar uma funcionalidade de apagar uma avaliação,
  // uma vez que foi avaliado, só faz sentido mudar a avaliação do jogo.

  const getById = (userId: string) => query(db, where("userId", "==", userId));
  
  function mapToRatings(
    docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
  ) {
    return docs.map((doc) => {
      let rating = doc.data();
      return {
        ratingId: doc.id,
        gameId: rating.gameId,
        userId: rating.userId,
        liked: rating.liked,
        rating: rating.rating,
      };
    });
  }

  // Essa função renderiza o símbolo de rating na ordem correta
  function verifySortByRatingRender(sort: sortDir | null): React.ReactNode {
    return (
      <div style={ sort === null ? {color: "gray"}: {}}>
        <span>&#9733;</span>
        {sort === sortDir.DSC ? (
          <span>&#11015;</span>
        ) : (
          <span>&#11014;</span>
        )}
      </div>
    );
  }
  return (
    <RatingContext.Provider
      value={{
        ratings,
        handleLike,
        getRating,
        handleRating,
        getRatedGames,
        verifySortByRatingRender
      }}
    >
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  const data = useContext(RatingContext);
  return data;
}

export default RatingContext;

// DEBUG
export async function deleteAllGames() {
  const querySnapshot = await getDocs(db);
  const deletionPromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletionPromises);
  console.log(
    "Todos os jogos de todos os usuários foram excluídos com sucesso."
  );
}
