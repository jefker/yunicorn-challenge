import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import {apiVersion, token, projectId, dataset} from "@/sanity/env";
import {createClient} from "next-sanity";

const clientWithToken = createClient({
    projectId,
    dataset,
    useCdn: false,
    token,
    apiVersion: apiVersion,
})

export async function GET(request: Request) {
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(
        clientWithToken,
        request.url,
    )
    if (!isValid) {
        return new Response('Invalid secret', { status: 401 })
    }

    draftMode().enable()

    redirect(redirectTo)
}