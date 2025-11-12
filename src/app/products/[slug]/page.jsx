"use client"; // Keep this component client-side

import React from 'react';

// Using JSDoc comments for documentation instead of TypeScript interfaces
/**
 * Defines the structure of the props for this Page component.
 * @typedef {object} ProductPageProps
 * @property {{ slug: string }} params - The dynamic URL segment.
 */

// Use standard JavaScript function syntax without explicit TypeScript types
export default function ProductPage({ params }) {
  // Destructure the slug from the params object.
  const { slug } = params;

  // --- Mock Content for Demonstration ---
  
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-2 mb-6">
        Product Details
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3 p-4 bg-purple-50 rounded-xl">
          <p className="text-sm font-semibold text-purple-600 uppercase">
            Product Slug
          </p>
          <p className="text-2xl font-mono text-purple-800 mt-1 break-words">
            {slug}
          </p>
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-700">
            {slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h2>
          <p className="text-lg text-gray-500 mt-2">
            The page is now correctly using JavaScript/JSX syntax to avoid the TypeScript build conflict.
          </p>
          <p className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            *Please replace this UI and logic with your application's actual content.*
          </p>
        </div>
      </div>
    </div>
  );
}