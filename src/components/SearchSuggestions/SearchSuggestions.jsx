import { Link } from "react-router-dom";

function SearchSuggestions({
  products,
  search,
  setSearch,
}) {
  if (!search.trim()) return null;

  const suggestions = products
    .filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 6);

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-50 max-h-96 overflow-y-auto">

      {suggestions.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          onClick={() => setSearch("")}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 border-b"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-12 h-12 object-contain"
          />

          <div className="flex-1">

            <p className="text-black font-medium line-clamp-1">
              {product.title}
            </p>

            <p className="text-sm text-gray-500">
              ${product.price}
            </p>

          </div>
        </Link>
      ))}

    </div>
  );
}

export default SearchSuggestions;