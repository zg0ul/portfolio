interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string | null) => void;
  activeCategory: string | null;
}

/**
 * CategoryFilter Component
 *
 * A component that displays category buttons and calls the parent component's
 * filter function when a category is selected.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.categories - Array of category names to display as filter buttons
 * @param {Function} props.onCategoryChange - Callback function when a category is selected
 * @param {string|null} props.activeCategory - Currently selected category
 */
export function CategoryFilter({
  categories,
  onCategoryChange,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
      {/* "All" filter button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
          activeCategory === null
            ? "bg-navy-700 text-neon border-neon border shadow-md"
            : "bg-navy-600 text-foreground hover:bg-navy-700 hover:text-text-300 hover:shadow-sm"
        }`}
        aria-pressed={activeCategory === null}
      >
        All
      </button>

      {/* Render a button for each category */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? "bg-navy-700 text-neon border-neon border shadow-md"
              : "bg-navy-600 text-foreground hover:bg-navy-700 hover:text-text-300 hover:shadow-sm"
          }`}
          aria-pressed={activeCategory === category} // for accessibility purposes.
        >
          {category}
        </button>
      ))}
    </div>
  );
}
