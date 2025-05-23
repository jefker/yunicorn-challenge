'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    // Only create stylesheet once with lazy initial state
    // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    const [jsxStyleRegistry] = useState(() => createStyleRegistry())

    useServerInsertedHTML(() => {
        const styles = jsxStyleRegistry.styles()
        jsxStyleRegistry.flush()
        return <>{styles}</>
    })

    return <StyleRegistry registry={jsxStyleRegistry}>
        <style jsx global>{`
            :root { font-size: calc(800vw / 2200); }

            @media (max-width: 1920px) {
                :root { font-size: calc(800vw / 1920); }
            }

            @media (max-width: 992px) {
                :root { font-size: 50%; }
            }

            @media (max-width: 639px) {
                :root {
                    font-size: calc(800vw / 435);
                }
            }
        `}</style>
        {children}
    </StyleRegistry>
}