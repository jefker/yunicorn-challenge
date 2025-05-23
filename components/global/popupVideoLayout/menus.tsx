import type { ReactElement } from 'react';

import {
    Menu,
    Tooltip,
    useCaptionOptions,
    type MenuPlacement,
    type TooltipPlacement, useVideoQualityOptions,
} from '@vidstack/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ClosedCaptionsIcon,
    RadioButtonIcon,
    RadioButtonSelectedIcon,
    SettingsIcon,
} from '@vidstack/react/icons';

import { buttonClass, tooltipClass } from './buttons';

export interface SettingsProps {
    placement: MenuPlacement;
    tooltipPlacement: TooltipPlacement;
}

export const menuClass =
    'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[50rem] min-w-[32.5rem] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden';

export const submenuClass =
    'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[.25rem] data-[open]:inline-block';

export function Settings({ placement, tooltipPlacement }: SettingsProps) {
    return (
        <Menu.Root className="parent">
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Menu.Button className={buttonClass}>
                        <SettingsIcon className="w-12 h-12 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
                    </Menu.Button>
                </Tooltip.Trigger>
                <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                    Settings
                </Tooltip.Content>
            </Tooltip.Root>
            <Menu.Content className={menuClass} placement={placement}>
                <VideoQualitySubmenu />
            </Menu.Content>
        </Menu.Root>
    );
}

function CaptionSubmenu() {
    const options = useCaptionOptions(),
        hint = options.selectedTrack?.label ?? 'Off';
    return (
      // @ts-ignore
        <Menu.Root label="Captions">
            <SubmenuButton
                label="Captions"
                hint={hint}
                disabled={options.disabled}
                // @ts-ignore
                icon={ClosedCaptionsIcon}
            />
            <Menu.Content className={submenuClass}>
                <Menu.RadioGroup className="w-full flex flex-col" value={options.selectedValue}>
                    {options.map(({ label, value, select }) => (
                        <Radio value={value} onSelect={select} key={value}>
                            {label}
                        </Radio>
                    ))}
                </Menu.RadioGroup>
            </Menu.Content>
        </Menu.Root>
    );
}

function VideoQualitySubmenu() {
    const options = useVideoQualityOptions({ auto: true, sort: 'descending' }),
      currentQualityHeight = options.selectedQuality?.height,
      hint =
        options.selectedValue !== 'auto' && currentQualityHeight
          ? `${currentQualityHeight}p`
          : `Auto${currentQualityHeight ? ` (${currentQualityHeight}p)` : ''}`;
    return (
      <Menu.Root>
          <Menu.Button disabled={options.disabled}>Quality ({hint})</Menu.Button>
          <Menu.Content>
              <Menu.RadioGroup value={options.selectedValue}>
                  {options.map(({ quality, label, value, bitrateText, select }) => (
                    <Menu.Radio value={value} onSelect={select} key={value}>
                        {label}
                    </Menu.Radio>
                  ))}
              </Menu.RadioGroup>
          </Menu.Content>
      </Menu.Root>
    );
}

export interface RadioProps extends Menu.RadioProps {}

function Radio({ children, ...props }: RadioProps) {
    return (
        <Menu.Radio
            className="ring-media-focus group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
            {...props}
        >
            <RadioButtonIcon className="h-8 w-8 text-white group-data-[checked]:hidden" />
            <RadioButtonSelectedIcon
                className="text-media-brand hidden h-8 w-8 group-data-[checked]:block"
                type="radio-button-selected"
            />
            <span className="ml-2">{children}</span>
        </Menu.Radio>
    );
}

export interface SubmenuButtonProps {
    label: string;
    hint: string;
    disabled?: boolean;
    icon: ReactElement;
}

function SubmenuButton({ label, hint, icon: Icon, disabled }: SubmenuButtonProps) {
    return (
        <Menu.Button
            className="ring-media-focus parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none ring-inset data-[open]:sticky data-[open]:-top-2.5 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
            disabled={disabled}
        >
            <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[2.25rem] w-[2.25rem]" />
            <div className="contents parent-data-[open]:hidden">
                {
                    // @ts-ignore
                    <Icon className="w-5 h-5" />
                }
            </div>
            <span className="ml-1.5 parent-data-[open]:ml-0">{label}</span>
            <span className="ml-auto p-xm text-white/50">{hint}</span>
            <ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 h-[2.25rem] w-[2.25rem] p-xm text-white/50" />
        </Menu.Button>
    );
}
