import { imageUrl } from '@/lib/imageUrl';
import { getProductsBySlug } from '@/sanity/lib/products/getProductsBySlug';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductsBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-50' : ''}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? 'Product image'}
              fill
              className="object-contain transition-transform duraiton-300 hover:scale-105"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
