import { useCallback, useState } from "react";

interface UseCopyToClipboardProps {
  timeout?: number; // Time to reset "Copied" status
}

export function useCopyToClipboard({
  timeout = 2000,
}: UseCopyToClipboardProps = {}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
        return true;
      } catch (error) {
        console.warn("Copy failed", error);
        setIsCopied(false);
        return false;
      }
    },
    [timeout],
  );

  return { isCopied, copyToClipboard };
}
