"use client"

import React, {DependencyList, EffectCallback, useCallback, useEffect, useMemo, useRef, useState} from "react";
import _, {debounce} from "lodash";

export function useEffectMemo<T>(callback: () => T, deps: unknown[]) {
  const returnRef = useRef<T>();

  useEffect(() => {
    returnRef.current = callback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps.concat([callback]));

  return returnRef;
}

export function isRef(obj: React.RefObject<any> | any): React.RefObject<any> | false {
  return obj !== null && typeof obj === 'object' && obj.hasOwnProperty('current') ? obj : false;
}

export function useScrollTop(selector: string | React.RefObject<HTMLElement>) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const elRef = isRef(selector);

    const el = elRef ? elRef.current : document.querySelector(selector as string);

    if (el) {
      const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        const elTop = el.getBoundingClientRect().top + scrollTop;
        setScrollTop(elTop);
      }

      const debouncedOnScroll = _.debounce(onScroll, 100);

      document.addEventListener('scroll', debouncedOnScroll);
      onScroll();

      return () => {
        document.removeEventListener('scroll', debouncedOnScroll);
      }
    }
  }, [selector]);

  return scrollTop;
}

export function useResizeSensitive(callback: EffectCallback, deps?: DependencyList) {
  const destructorRef = useRef<Function | null>();

  useEffect(() => {
    const onResize = () => {
      const destructor = callback();

      if (typeof destructor === 'function') {
        destructorRef.current = destructor;
      }
    }

    const debouncedOnResize = debounce(onResize, 100);

    window.addEventListener('resize', debouncedOnResize);

    return () => {
      window.removeEventListener('resize', debouncedOnResize);

      if (typeof destructorRef.current === 'function') {
        destructorRef.current();
        destructorRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ? deps.concat([callback]) : [callback]);
}

export function useResizeMemo<T>(callback: (size: {width: number, height: number}) => T, deps?: unknown[], delay: number = 100) {
  const [size, setSize] = useState({width: 0, height: 0});
  const call = useCallback((size: {width: number, height: number}) => {
    return callback(size);
    // @ts-ignore
  }, deps);
  const out = useMemo(() => call(size), [size, call]);

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    const debouncedResize = delay > 0 ? debounce(onResize, delay) : onResize;

    window.addEventListener('resize', debouncedResize);

    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [delay]);

  return out;
}

export function lerp(start: number, end: number, t: number) {
  // return mathSnapNumber(start * (1 - t) + end * t, 0.01, 0);
  return start * (1 - t) + end * t;
}

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
type webpFeature = 'lossy' | 'lossless' | 'alpha' | 'animation';
export function check_webp_feature(feature: webpFeature, callback: (feature: webpFeature, result: boolean) => void) {
  const kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  };
  const img = new Image();
  img.onload = function () {
    let result = (img.width > 0) && (img.height > 0);
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}

export function useWebpSupport() {
  const [webpSupport, setWebpSupport] = useState<boolean>(true);

  useEffect(() => {
    check_webp_feature('lossy', (_result, isSupported) => {
      setWebpSupport(isSupported);
    })
  }, []);

  return webpSupport;
}
