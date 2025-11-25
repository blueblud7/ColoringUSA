import { Category } from '../App'

interface CategorySelectorProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  const categories: { value: Category; label: string; color: string }[] = [
    { value: 'visited', label: 'Visited', color: 'bg-blue-500' },
    { value: 'passed', label: 'Passed Through', color: 'bg-yellow-500' },
    { value: 'favorite', label: 'Favorite', color: 'bg-pink-500' },
    { value: 'want', label: 'Want to Visit', color: 'bg-purple-500' },
  ]

  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Select Category:</div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
            selectedCategory === null
              ? 'bg-gray-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          None
        </button>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              selectedCategory === category.value
                ? `${category.color} text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}

