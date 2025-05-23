"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo} from "react";

export default function AnchorListener() {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const router = useRouter();

  const anchor = useMemo(() => {
    return searchParams.get('a');
  }, [searchParams]);

  useEffect(() => {
    if (anchor) {
      const base64decoded = atob(anchor);
      const el = document.querySelector(base64decoded);
      if (el) {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('a')
        router.replace(`${pathname}?${params.toString()}`);

        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [anchor, router, searchParams]);

  return null
}