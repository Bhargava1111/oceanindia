import { notFound } from "next/navigation";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { getBrands, getCategories, getCollection, getProducts, isCollection, registry } from "@/lib/cms/store";

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  if (!isCollection(params.collection)) notFound();
  const def = registry[params.collection];
  const data = params.collection === "products" ? await getProducts() : await getCollection(params.collection);
  const [categories, brands] = params.collection === "products"
    ? await Promise.all([getCategories(), getBrands()])
    : [[], []];
  return (
    <CollectionManager
      name={params.collection}
      label={def.label}
      singleton={!!def.singleton}
      idField={def.idField}
      data={data}
      ctx={{ categories: categories.map((c) => c.slug), brands: brands.map((b) => b.name) }}
    />
  );
}
