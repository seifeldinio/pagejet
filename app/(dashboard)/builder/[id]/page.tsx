import { GetFormByIdForBuilder } from "@/actions/form";
import FormBuilder from "./_components/form-builder";

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormByIdForBuilder(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}

export default BuilderPage;
