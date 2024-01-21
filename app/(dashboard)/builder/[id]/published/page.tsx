import { GetFormByIdForBuilder } from "@/actions/form";
import { useOrigin } from "@/hooks/use-origin";
import { PublishedNotice } from "./_components/published-notice";

async function PublishedPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormByIdForBuilder(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <PublishedNotice url={form.shareURL} id={form.id} />;
}

export default PublishedPage;
