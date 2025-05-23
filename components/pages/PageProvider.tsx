"use client"
import {RawQueryResponse} from "next-sanity";
import {useLiveQuery} from "next-sanity/preview";
import {ReactNode, useEffect} from "react";
import {revalidate} from "@/app/actions";
import { useDebouncedCallback } from '@react-hookz/web';


export default function PageProvider({children, init, url, query, draftMode}: {
  children: ReactNode,
  init: RawQueryResponse<any>,
  url: string,
  query: string,
  draftMode: boolean
}) {
  console.log("PageProvider", draftMode, init != null);
  const [data] = useLiveQuery<any>(init.result, query, {
    perspective: draftMode ? 'previewDrafts' : 'published',
  });

  const loadData = useDebouncedCallback(() => {
    revalidate(url)
  }, [url], 400)

  useEffect(() => {
    if (data) {
      console.log("updating page data", data, typeof data);
      if (loadData) {
        loadData()
      }
    }
  }, [data, loadData]);

  return children
}

