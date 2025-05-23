"use client"
import LiveQueryProvider from 'next-sanity/preview'
import React from "react";
import {client} from "@/sanity/lib/client";

export default function PreviewProvider({children, token}: {
    children: React.ReactNode
    token: string | undefined
}) {
    if (!token) throw new TypeError('Missing token')
    return (
        <LiveQueryProvider client={client} token={token} logger={console}>
            {children}
        </LiveQueryProvider>
    )
}