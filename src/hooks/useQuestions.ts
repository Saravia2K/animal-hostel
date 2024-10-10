import { API_URL } from "../consts";
import { TQuestion } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchQuestions = async (): Promise<TQuestion[]> => {
  const response = await fetch(`${API_URL}/questions`);

  if (!response.ok) {
    throw new Error("Error al obtener las preguntas");
  }

  return response.json();
};

export default function useQuestions() {
  const { data, refetch, isLoading, error } = useQuery<TQuestion[]>({
    queryFn: fetchQuestions,
    queryKey: ["questions"],
    staleTime: Infinity,
    retry: false, // Controla si quieres reintentar
  });

  return {
    questions: data,
    reloadQuestions: refetch,
    questionsLoading: isLoading,
    questionsError: error,
  };
}
