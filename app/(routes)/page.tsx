import getBillboard from '@/actions/get-billboard'
import Container from '@/components/ui/container'
import Billboard from '@/components/billboard'
import ProductList from '@/components/product-list'
import getProducts from '@/actions/get-products'

import React from 'react'
import { env } from 'process'

// const revalidate = 0

const HomePage = async () => {

  const products = await getProducts({
    isFeatured: true,
  });
const billboard = await getBillboard(env.BILLBOARD_ID ?? "");

  return (
    <Container>
      <div className="space-y-12 pb-16 bg-gradient-to-br from-fashion-light via-fashion-accent to-white rounded-xl shadow-fashion px-4 sm:px-8 lg:px-16">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-10">
          <h2 className="text-3xl font-bold text-fashion-primary mb-2 tracking-tight">Featured Products</h2>
          <ProductList title="" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage


