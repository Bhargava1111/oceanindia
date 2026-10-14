import { InventoryTable } from "@/components/admin/InventoryTable";
import { getProducts } from "@/lib/cms/store";

export default async function InventoryPage() {
  return <InventoryTable products={await getProducts()} />;
}
