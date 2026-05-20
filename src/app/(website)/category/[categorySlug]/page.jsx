import CategoryProducts from "@/component/category/CategoryProducts";

const CategoryProductsPage = async ({ params }) => {
  const { categorySlug } = await params;

  return <CategoryProducts categorySlug={categorySlug} />;
};

export default CategoryProductsPage;
