import { GetFormByIdForBuilder } from "@/actions/form";
import { GetPageByIdForBuilder, GetPageByUrl } from "@/actions/page";
import LivePage from "./_components/live";

async function PublicPage({ params }: { params: { shareURL: string } }) {
  const { shareURL } = params;
  const page = await GetPageByUrl(shareURL);

  if (!page) {
    throw new Error("Form not found");
  }

  return <LivePage page={page} />;
}

export default PublicPage;
