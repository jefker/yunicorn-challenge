import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/poster.css';
import React, {useMemo} from "react";
import {MediaPlayer, MediaProvider, Poster} from "@vidstack/react";
import PopupVideoLayout from "../global/popupVideoLayout/PopupVideoLayout";
import {GROQImage} from "@/sanity/lib/definitions";
import {GroqImage} from "@/helpers/Image";
import {vercelStegaCleanAll} from "@sanity/client/stega";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import {IMuxVideoPlayer} from "@/sanity/globals/VideoPlayer";

export default function VideoPlayer({src, thumbnail, playerType = 'standard'}: {src: string | IMuxVideoPlayer, thumbnail: GROQImage, playerType?: 'standard' | 'mux'}) {
  const cleanedVideoSrc = useMemo(() => {
    return src ? vercelStegaCleanAll(src) : src;
  }, [src]);
  return (
    <>
      { // @ts-ignore
        thumbnail && !(cleanedVideoSrc?.length > 0 || (cleanedVideoSrc as IMuxVideoPlayer)?.muxVideo?.playbackId) && (
        <GroqImage className="rounded-[1rem]" src={thumbnail} alt="" />
      ) }
      { cleanedVideoSrc && playerType === 'standard' &&
          <MediaPlayer
              className="!flex aspect-video"
              autoplay={false}
              src={cleanedVideoSrc as string}
              crossorigin
          >
              <MediaProvider />
              <PopupVideoLayout></PopupVideoLayout>
            {
              thumbnail && thumbnail?.src && (
                <Poster className="vds-poster" src={thumbnail.src} alt="" />
              )
            }
          </MediaPlayer>
      }
      { (cleanedVideoSrc as IMuxVideoPlayer)?.muxVideo?.playbackId && playerType === 'mux' &&
        (
          <>
            <MediaPlayer
              className="!flex aspect-video"
              autoplay={false}
              src={`https://stream.mux.com/${(cleanedVideoSrc as IMuxVideoPlayer).muxVideo.playbackId}.m3u8?redundant_streams=true`}
              crossOrigin="anonymous"
              streamType="on-demand"
              storage="max-reidl-vidstack"
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails={`https://image.mux.com/${(cleanedVideoSrc as IMuxVideoPlayer).muxVideo.playbackId}/storyboard.vtt`}></DefaultVideoLayout>
              {
                thumbnail && thumbnail?.src && (
                  <Poster className="vds-poster" src={thumbnail.src} alt="" />
                )
              }
            </MediaPlayer>
          </>
        )
      }
    </>
  )
}