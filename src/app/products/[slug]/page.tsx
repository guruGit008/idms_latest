// This file is reconstructed based on the error to enforce the correct typing
// for dynamic route segments in the Next.js App Router.

// Define the precise structure for the props of this page.
interface ProductPageProps {
  // 'params' must be an object matching the dynamic segment names ([slug])
  params: {
    slug: string;
  };
  // 'searchParams' is standard in Next.js page props but optional for this fix
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Ensure the component is defined as a standard functional component
// with the explicit ProductPageProps type.

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // --- Mock Content for Demonstration ---
  // Replace this with your actual data fetching and UI logic
  
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-2 mb-6">
        Product Details
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3 p-4 bg-indigo-50 rounded-xl">
          <p className="text-sm font-semibold text-indigo-600 uppercase">
            Product Slug
          </p>
          <p className="text-2xl font-mono text-indigo-800 mt-1 break-words">
            {slug}
          </p>
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-700">
            {slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h2>
          <p className="text-lg text-gray-500 mt-2">
            This component receives the product identifier from the URL. 
            The type error has been resolved by enforcing the exact structure of `ProductPageProps`.
          </p>
          <p className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            *ACTION REQUIRED: Please replace this mock UI and logic with your application's actual data fetching and rendering for the product detail page.*
          </p>
        </div>
      </div>
    </div>
  );
}

// If you have a 'generateStaticParams' function, ensure it returns 
// an array of objects matching the structure of params: { slug: string }[]