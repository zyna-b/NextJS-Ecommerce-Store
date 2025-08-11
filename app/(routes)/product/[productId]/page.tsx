import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ReviewForm from "./components/review-form";
import CustomersReviews from "./components/customers-reviews";

interface ProductCardProps {
  params: { productId: string };
}

const ProductPage: React.FC<ProductCardProps> = async ({ params }) => {
  const { productId } = await params;
  const product = await getProduct(productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="bg-gradient-to-br from-fashion-light via-fashion-accent to-white min-h-screen rounded-xl shadow-fashion">
      <Container>
        <div className="px-4 py-12 sm:px-8 lg:px-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
            <Gallery images={product?.images ?? []} />
            <div className="mt-12 px-4 sm:mt-20 sm:px-0 lg:mt-0">
              {product && <Info data={product} />}
            </div>
          </div>

          {/* Reviews */}
          <hr className="my-12 border-gray-300" />
          <CustomersReviews productId={productId}/>
          <ReviewForm productId={productId} />
          <hr className="my-12 border-gray-300" />
          <h2 className="text-2xl font-bold text-fashion-primary mb-6 tracking-tight">
            Related Items
          </h2>
          <ProductList title="" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;