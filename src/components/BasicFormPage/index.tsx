"use client";

import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

import Title from "@/components/Title";

export default function BasicFormPage({
  title,
  normalRedirectPage,
  component: Component,
}: TProps) {
  const router = useRouter();
  const fromMascotas = useSearchParams().get("from_mascotas") == "1";

  const handleFormSuccess = () => {
    const redirectPage = fromMascotas ? "mascotas/agregar" : normalRedirectPage;
    router.push(`/dashboard/${redirectPage}`);
  };

  return (
    <>
      <Title text={title} />
      <Component independent onSuccessForm={handleFormSuccess} />
    </>
  );
}

type TProps = {
  component: (props: TComponentProps) => JSX.Element;
  normalRedirectPage: string;
  title: string;
};

type TComponentProps = {
  initialValues?: Record<string, string | number>;
  onSuccessForm?: () => void;
  independent?: boolean;
};
