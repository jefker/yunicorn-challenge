"use client"
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import * as React from "react"
import {MediaPlayer, MediaPlayerInstance, MediaProvider, Poster} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import Hls from "hls.js";
import {useEffect, useMemo} from "react";
import {stegaClean} from "@sanity/client/stega";
import {IMuxVideoPlayer} from "@/sanity/globals/VideoPlayer";

interface HLSVideoPlayerProps extends React.ComponentPropsWithRef<"video">{
  source: IMuxVideoPlayer;
}

export const HLSVideoPlayer = React.forwardRef<HTMLVideoElement, HLSVideoPlayerProps>(function HLSVideoPlayer(props: HLSVideoPlayerProps, ref: React.ForwardedRef<HTMLVideoElement>) {
  const videoRef = React.useRef<HTMLVideoElement>();
  const hlsRef = React.useRef<Hls>();
  const {source, ...rest} = props;
  const cleanedVideoSrc = useMemo(() => {
    return stegaClean(source?.muxVideo?.playbackId ?? '');
  }, [source]);


  useEffect(() => {
    if (Hls.isSupported() && source?.muxVideo?.playbackId && videoRef.current) {
      hlsRef.current = new Hls({
        fetchSetup: function (context, initParams: RequestInit) {
          initParams.mode = 'no-cors'
          return new Request(context.url, initParams)
        }
      });
      hlsRef.current.loadSource(`https://stream.mux.com/${cleanedVideoSrc}.m3u8?redundant_streams=true`);
      hlsRef.current.attachMedia(videoRef.current);
    }

    return () => {
      if (hlsRef.current && videoRef.current) {
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
      }
    }
  },[cleanedVideoSrc, source])

  return (
    <video
      ref={(node) => {
        if (node) {
          videoRef.current = node;
        }

        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      {...rest}
      crossOrigin="anonymous"
    />
  )
});

export interface VideoPlayerProps extends React.HTMLAttributes<MediaPlayerInstance> {
  playerData: IMuxVideoPlayer;
  playsinline?: boolean;
}
const SanityVideoPlayer = React.forwardRef<MediaPlayerInstance, VideoPlayerProps>(
  ({ playerData, className, playsinline = false, ...props }, ref) => {
    const cleanedVideoSrc = useMemo(() => {
      return playerData ? stegaClean(playerData) : playerData;
    }, [playerData]);
    return (
      <MediaPlayer
        ref={ref}
        className={className}
        src={
          (playerData?.embed
            ? playerData?.embedUrl
            : `https://stream.mux.com/${(cleanedVideoSrc as IMuxVideoPlayer).muxVideo?.playbackId}.m3u8?redundant_streams=true`) ??
          ""
        }
        playsInline={playsinline}
        // @ts-ignore
        onPause={props?.onPause}
      >
        <MediaProvider></MediaProvider>
        <DefaultVideoLayout
          className="!rounded-[inherit] overflow-clip block absolute top-0 start-0 w-full h-full"
          icons={defaultLayoutIcons}
          noScrubGesture={false}
          thumbnails={
            playerData?.muxVideo
              ? ` https://image.mux.com/${(cleanedVideoSrc as IMuxVideoPlayer).muxVideo?.playbackId}/storyboard.vtt`
              : null
          }
        />
        {playerData?.thumbnail?.src && (
          <Poster
            className="vds-poster !w-full !h-full object-cover !rounded-[inherit]"
            src={playerData?.thumbnail?.src}
            alt=""
          />
        )}
      </MediaPlayer>
    );
  }
)

SanityVideoPlayer.displayName = "SanityVideoPlayer"
export {SanityVideoPlayer}