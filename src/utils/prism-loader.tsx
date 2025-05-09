"use client";

import { useEffect } from "react";
import Prism from "prismjs";
// Import custom theme instead of the default
import "@/app/styles/prism-theme.css";

// Import language components
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

/**
 * PrismLoader Component
 *
 * This component loads and initializes Prism.js for syntax highlighting across various programming languages.
 * It's designed to be included once throughout the application to ensure proper code highlighting.
 *
 * Features:
 * - Uses a custom theme defined in "@/app/styles/prism-theme.css"
 * - Supports multiple languages: TypeScript, JavaScript, Python, JSX, TSX, CSS, HTML/XML, Bash, and JSON
 * - Automatically highlights all code blocks when the component mounts
 * - Renders as a hidden div to avoid affecting layout
 *
 * @returns A hidden div element that doesn't affect the UI layout
 *
 * @example
 * // Include this component in a layout or page where code highlighting is needed
 * import PrismLoader from "@/utils/prism-loader";
 *
 * function MyPage() {
 *   return (
 *     <>
 *       <PrismLoader />
 *       <pre>
 *         <code className="language-javascript">
 *           const hello = "world";
 *         </code>
 *       </pre>
 *     </>
 *   );
 * }
 */
export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="hidden"></div>;
}
