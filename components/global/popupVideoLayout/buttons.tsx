import {
    CaptionButton,
    FullscreenButton,
    isTrackCaptionKind,
    MuteButton,
    PIPButton,
    PlayButton,
    Tooltip,
    useMediaState,
    type TooltipPlacement,
} from '@vidstack/react';
import {
    ClosedCaptionsIcon,
    ClosedCaptionsOnIcon,
    FullscreenExitIcon,
    FullscreenIcon,
    MuteIcon,
    PauseIcon,
    PictureInPictureExitIcon,
    PictureInPictureIcon,
    PlayIcon,
    VolumeHighIcon,
    VolumeLowIcon,
} from '@vidstack/react/icons';

export interface MediaButtonProps {
    tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
    'group ring-media-focus relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4';

export const tooltipClass =
    'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 p-small font-medium text-white parent-data-[open]:hidden';

export function Play({ tooltipPlacement }: MediaButtonProps) {
    const isPaused = useMediaState('paused');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <PlayButton className={buttonClass}>
                    {isPaused ? <PlayIcon className="w-12 h-12" /> : <PauseIcon className="w-12 h-12" />}
                </PlayButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isPaused ? 'Play' : 'Pause'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
    const volume = useMediaState('volume'),
        isMuted = useMediaState('muted');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <MuteButton className={buttonClass}>
                    {isMuted || volume == 0 ? (
                        <MuteIcon className="w-12 h-12" />
                    ) : volume < 0.5 ? (
                        <VolumeLowIcon className="w-12 h-12" />
                    ) : (
                        <VolumeHighIcon className="w-12 h-12" />
                    )}
                </MuteButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isMuted ? 'Unmute' : 'Mute'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function Caption({ tooltipPlacement }: MediaButtonProps) {
    const track = useMediaState('textTrack'),
        isOn = track && isTrackCaptionKind(track);
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <CaptionButton className={buttonClass}>
                    {isOn ? (
                        <ClosedCaptionsOnIcon className="w-12 h-12" />
                    ) : (
                        <ClosedCaptionsIcon className="w-12 h-12" />
                    )}
                </CaptionButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
    const isActive = useMediaState('pictureInPicture');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <PIPButton className={buttonClass}>
                    {isActive ? (
                        <PictureInPictureExitIcon className="w-12 h-12" />
                    ) : (
                        <PictureInPictureIcon className="w-12 h-12" />
                    )}
                </PIPButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isActive ? 'Exit PIP' : 'Enter PIP'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
    const isActive = useMediaState('fullscreen');
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <FullscreenButton className={buttonClass}>
                    {isActive ? (
                        <FullscreenExitIcon className="w-12 h-12" />
                    ) : (
                        <FullscreenIcon className="w-12 h-12" />
                    )}
                </FullscreenButton>
            </Tooltip.Trigger>
            <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}
