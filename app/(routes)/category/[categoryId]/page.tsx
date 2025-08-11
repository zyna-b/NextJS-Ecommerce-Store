import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";

import Container from "@/components/ui/container";
import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    };
}


const CategoryPage: React.FC<CategoryPageProps> = async ({ params, searchParams }) => {



    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);

    return (
        <div className="bg-gradient-to-br from-fashion-light via-fashion-accent to-white min-h-screen rounded-xl shadow-fashion">
            <Container>
                <Billboard data={category.billboard} />
                <div className="px-4 sm:px-8 lg:px-16 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-12">
                        <MobileFilters sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <Filter valueKey="sizeId" name="Size" data={sizes} />
                            <Filter valueKey="colorId" name="Color" data={colors} />
                        </div>
                        <div className="mt-8 lg:col-span-4 lg:mt-0">
                            <h2 className="text-3xl font-bold text-fashion-primary mb-6 tracking-tight">Products</h2>
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} data={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;