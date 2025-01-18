import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const getCategories = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/categories`
  );
  data.unshift("All");
  return data;
};

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, data, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isPending || isError) return null;

  const handleChangeCategory = (index: number) => {
    setCurrentCategory(index);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      category: data[index],
    });
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto w-full whitespace-nowrap pb-3 mt-6">
      {data.map((category: string, i: number) => (
        <button
          className={twMerge(
            "text-white px-4 py-2 rounded-lg bg-[#333333] text-sm font-medium",
            currentCategory === i && "bg-white text-[#333333]"
          )}
          key={i}
          onClick={() => handleChangeCategory(i)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
