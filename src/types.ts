export type TOwner = {
  id_owner: number;
  names: string;
  last_names: string;
  home: string;
  cellphone: string;
  email: string;
  facebook: string | null;
  references: string | null;
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
  id_owner: number;
  id_veterinarian: number;
  name: string;
  birthday: string;
  sex: string;
  breed: string;
  coat_color: string;
  extra_data: string | null;
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
