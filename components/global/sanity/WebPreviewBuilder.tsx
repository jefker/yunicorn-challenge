"use client"
import {SanityDocument} from "@sanity/types";
import {useLayoutEffect, useRef, useState} from "react";

interface WebPreviewBuilderDocument {
    draft: SanityDocument | null
    displayed: Partial<SanityDocument>
    historical: Partial<SanityDocument> | null
    published: SanityDocument | null
}

const WebPreview = ({document, url}: {document: WebPreviewBuilderDocument, url: string}) => {
    const wrapper = useRef<HTMLDivElement | null>(null);
    const [wrapperHeight, setWrapperHeight] = useState(900);
    const [scale, setScale] = useState(1);
    const [hasClientWindow, setHasClientWindow] = useState(false);

    useLayoutEffect(() => {
        const calculateScale = () => {
            if (wrapper.current) {
                const width = wrapper.current?.clientWidth;
                const height = wrapper.current?.clientHeight;
                setScale(width / 1920);
                setWrapperHeight(height);

                if (window) {
                    setHasClientWindow(true);
                }
            }
        }
        calculateScale();

        window.addEventListener('resize', calculateScale);

        const interval = setInterval(calculateScale, 100);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', calculateScale);
        }
    }, []);

    return (
        <div ref={wrapper} style={{
            width: "100%",
            height: "100%"
        }}>
            { hasClientWindow &&
            <iframe style={{
                width: "1920px",
                minHeight: wrapperHeight / scale,
                maxHeight: wrapperHeight / scale,
                height: wrapperHeight / scale,
                transformOrigin: "0 0",
                transform: `scale(${scale})`
            }}
                    loading={"lazy"}
                    width={1920}

                    src={url}
                    frameBorder={0}
            /> }
        </div>
    )
}

export const WebPreviewBuilder = (url: string) => {
    return (document: WebPreviewBuilderDocument) => {
        return WebPreview({
            document,
            url
        })
    }
}