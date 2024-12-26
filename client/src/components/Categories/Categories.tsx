import { useState } from "react";
import { CategoriesList } from "../../constants";
import { twMerge } from "tailwind-merge";

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  return (
    <div className="flex items-center gap-3 overflow-x-auto w-full whitespace-nowrap pb-3 mt-6">
      {CategoriesList.map((category, i) => (
        <button
          className={twMerge(
            "text-white px-4 py-2 rounded-lg bg-[#333333] text-sm font-medium",
            currentCategory === i && "bg-white text-[#333333]"
          )}
          key={i}
          onClick={() => setCurrentCategory(i)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
