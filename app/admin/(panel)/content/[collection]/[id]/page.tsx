import { notFound } from "next/navigation";
import { RecordEditor } from "@/components/admin/RecordEditor";
import { getBrands, getCategories, getCollection, getProducts, isCollection, registry } from "@/lib/cms/store";

export default async function EditRecordPage({ params }: { params: { collection: string; id: string } }) {
  if (!isCollection(params.collection)) notFound();
  const def = registry[params.collection];
  if (def.singleton) notFound();
  const id = decodeURIComponent(params.id);
  const isNew = id === "new";
  const list = (params.collection === "products" ? await getProducts() : await getCollection<Record<string, unknown>[]>(params.collection)) as Record<string, unknown>[];
  const item = isNew ? null : list.find((row) => String(row[def.idField!]) === id);
  if (!isNew && !item) notFound();
  const [categories, brands] = params.collection === "products"
    ? await Promise.all([getCategories(), getBrands()])
    : [[], []];
  return (
    <RecordEditor
      collection={params.collection}
      label={def.label}
      idField={def.idField}
      initial={item ?? null}
      isNew={isNew}
      ctx={{ categories: categories.map((c) => c.slug), brands: brands.map((b) => b.name) }}
    />
  );
}
