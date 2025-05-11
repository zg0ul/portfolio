// import { ProjectCategory } from "@/lib/supabase/types";

// interface ProjectFilterProps {
//   categories: ProjectCategory[];
//   activeCategory: string;
//   onCategoryChange: (category: string) => void;
// }

// export default function ProjectFilter({
//   categories,
//   activeCategory,
//   onCategoryChange,
// }: ProjectFilterProps) {
//   return (
//     <div className="mb-8">
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => onCategoryChange("All")}
//           className={`rounded-full px-4 py-1 ${
//             activeCategory === "All"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//           }`}
//         >
//           All
//         </button>
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => onCategoryChange(category)}
//             className={`rounded-full px-4 py-1 ${
//               activeCategory === category
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
