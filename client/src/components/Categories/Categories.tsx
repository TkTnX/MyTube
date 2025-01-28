import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const getCategories = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/categories`
  );
  data.unshift({ title: "All", _id: "All" });
  return data;
};

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, data, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isPending || isError) return null;

  const handleChangeCategory = (id: string) => {
    setCurrentCategory(id);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      category: data.find((item: { _id: string }) => item._id === id)?.title,
    });
  };

  console.log(currentCategory);

  return (
    <div className="flex items-center gap-3 overflow-x-auto w-full whitespace-nowrap pb-3 mt-6">
      {data.map((category: { title: string; _id: string }) => (
        <button
          className={twMerge(
            "text-white px-4 py-2 rounded-lg bg-[#333333] text-sm font-medium",
            currentCategory.toLowerCase() === category._id.toLowerCase() &&
              "bg-white text-[#333333]"
          )}
          key={category._id}
          onClick={() => handleChangeCategory(category._id)}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default Categories;
