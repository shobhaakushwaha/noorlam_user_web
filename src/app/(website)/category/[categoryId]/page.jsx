import CategoryProducts from "@/component/category/CategoryProducts";

const CategoryProductsPage = async ({ params }) => {
  const { categoryId } = await params;

  return <CategoryProducts categoryId={categoryId} />;
};

export default CategoryProductsPage;
