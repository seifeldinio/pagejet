import { GetFormByIdForBuilder } from "@/actions/form";
import PageBuilder from "./_components/page-builder";
import { GetPageByIdForBuilder } from "@/actions/page";

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const page = await GetPageByIdForBuilder(Number(id));

  if (!page) {
    throw new Error("Form not found");
  }

  return <PageBuilder page={page} />;
}

export default BuilderPage;
