import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form-elements";
import React from "react";
import FormContent from "./_components/form-content";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("Form not found.");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  // const formContent = form.content
  //   ? (JSON.parse(form.content) as FormElementInstance[])
  //   : [];

  const formInfo = form;

  return (
    <FormContent
      formUrl={params.formUrl}
      content={formContent}
      formInfo={formInfo}
    />
  );
}

export default SubmitPage;
