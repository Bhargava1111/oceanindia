import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { listUploads } from "@/lib/cms/storage";

export default async function MediaPage() {
  const files = await listUploads();
  return <MediaLibrary files={files} />;
}
