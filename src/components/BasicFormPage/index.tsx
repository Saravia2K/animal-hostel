"use client";

import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

import Title from "@/components/Title";

export default function BasicFormPage({
  title,
  initialValues,
  normalRedirectPage,
  component: Component,
  onSuccessForm,
}: TProps) {
  const router = useRouter();
  const fromMascotas = useSearchParams().get("from_mascotas") == "1";

  const handleFormSuccess = () => {
    if (onSuccessForm) onSuccessForm();

    const redirectPage = fromMascotas ? "mascotas/agregar" : normalRedirectPage;
    router.push(`/dashboard/${redirectPage}`);
  };

  return (
    <>
      <Title text={title} />
      <Component
        independent
        onSuccessForm={handleFormSuccess}
        initialValues={initialValues}
      />
    </>
  );
}

type TProps = {
  component: (props: TComponentProps) => JSX.Element;
  normalRedirectPage: string;
  title: string;
  initialValues?: Record<string, unknown>;
  onSuccessForm?: () => void;
};

type TComponentProps = {
  initialValues?: Record<string, unknown>;
  onSuccessForm?: () => void;
  independent?: boolean;
};
