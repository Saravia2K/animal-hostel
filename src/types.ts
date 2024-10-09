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
