//#region Util types
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
//#endregion

export type TOwner = {
  id_owner: number;
  names: string;
  last_names: string;
  home: string;
  cellphone: string;
  email: string;
  facebook: string | null;
  references: string | null;
  pets: TPet[];
};

export type TVeterinarian = {
  id_veterinarian: number;
  names: string;
  last_names: string;
  clinic_name: string;
  cellphone: string;
};

export type TPet = {
  id_pet: number;
  name: string;
  sex: "F" | "M";
  breed: string;
  coat_color: string;
  birthday: string;
  extra_data: string | null;
  owner: TOwner;
  veterinarian: TVeterinarian;
  entries: TEntry;
};

export type TService = {
  id_service: number;
  name: string;
  description: string;
};

export type TQuestion = {
  id_question: number;
  text: string;
};

export type TNotification = {
  id_notification: number;
  title: string;
  description: string;
  seen: boolean;
  url: string;
};

export type TQuestionnaire = {
  id_questionnaire: number;
  entry: TEntry;
  question: TQuestion;
  answer: string;
};

export type TEntry = {
  id_entry: number;
  pet: TPet;
  questionnaire: Omit<TQuestionnaire, "entry">[];
  entry_date: string;
  exit_date: string;
  annotations: string;
};
