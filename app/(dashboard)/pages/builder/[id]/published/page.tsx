import { GetFormByIdForBuilder } from "@/actions/form";
import { useOrigin } from "@/hooks/use-origin";
import { PublishedNotice } from "./_components/published-notice";
import { GetPageByIdForBuilder } from "@/actions/page";

async function PublishedPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const page = await GetPageByIdForBuilder(Number(id));

  if (!page) {
    throw new Error("Form not found");
  }

  return <PublishedNotice url={page.shareURL} id={page.id} />;
}

export default PublishedPage;
