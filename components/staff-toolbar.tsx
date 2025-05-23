'use client';
import { VercelToolbar } from '@vercel/toolbar/next';
import { useSearchParams } from 'next/navigation'
import {handleMakeDraft} from "@/app/actions";

export function StaffToolbar({isDraftMode}: {isDraftMode: boolean}) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.has('preview');
  const makeDraft = searchParams.has('__vercel_draft') || searchParams.has('draft');



  if (makeDraft && !isDraftMode) {
    setTimeout(() => {
      handleMakeDraft();
    }, 1000);
    return null;
  }

  if (!isPreview && !isDraftMode) {
    return null;
  }
  return <VercelToolbar />;
}