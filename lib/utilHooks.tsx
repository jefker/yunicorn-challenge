"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import debounce from "lodash/debounce";

export function useEffectMemo<T>(callback: () => T, deps: unknown[]) {
  const returnRef = useRef<T>();

  useEffect(
    () => {
      returnRef.current = callback();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    deps.concat([callback])
  );

  return returnRef;
}

export function isRef(
  obj: React.RefObject<any> | any
): React.RefObject<any> | false {
  return obj !== null &&
    typeof obj === "object" &&
    obj.hasOwnProperty("current")
    ? obj
    : false;
}

export function useScrollTop(selector: string | React.RefObject<HTMLElement>) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const elRef = isRef(selector);

    const el = elRef
      ? elRef.current
      : document.querySelector(selector as string);

    if (el) {
      const onScroll = () => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        const elTop = el.getBoundingClientRect().top + scrollTop;
        setScrollTop(elTop);
      };

      const debouncedOnScroll = debounce(onScroll, 100);

      document.addEventListener("scroll", debouncedOnScroll);
      onScroll();

      return () => {
        document.removeEventListener("scroll", debouncedOnScroll);
      };
    }
  }, [selector]);

  return scrollTop;
}

export function useResizeMemo<T>(
  callback: (size: { width: number; height: number }) => T,
  deps?: unknown[],
  delay: number = 100
) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const call = useCallback((size: { width: number; height: number }) => {
    return callback(size);
    // @ts-ignore
  }, deps);
  const out = useMemo(() => call(size), [size, call]);

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedResize = delay > 0 ? debounce(onResize, delay) : onResize;

    window.addEventListener("resize", debouncedResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [delay]);

  return out;
}

export function useRemSize() {
  return useResizeMemo(({ width }) => {
    if (typeof document === "undefined") {
      return 8;
    }
    if (document != null && document.documentElement) {
      const property = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("font-size");

      if (property) {
        return parseFloat(property);
      }
    }

    return 8;
  });
}

export function useCountdown(timeString: string | null) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const germanTime = useMemo(() => {
    return new Date(
      new Date(timeString ?? "2024-01-01 19:00:00").toLocaleString("en-US", {
        timeZone: "Europe/Berlin",
      })
    );
  }, [timeString]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const remainingTime = useMemo(() => {
    return germanTime.getTime() - currentTime.getTime();
  }, [germanTime, currentTime]);

  const days = useMemo(() => {
    return Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60 * 24)))
      .toString()
      .padStart(2, "0");
  }, [remainingTime]);

  const hours = useMemo(() => {
    return Math.max(
      0,
      Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    )
      .toString()
      .padStart(2, "0");
  }, [remainingTime]);

  const minutes = useMemo(() => {
    return Math.max(
      0,
      Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
    )
      .toString()
      .padStart(2, "0");
  }, [remainingTime]);

  const seconds = useMemo(() => {
    return Math.max(0, Math.floor((remainingTime % (1000 * 60)) / 1000))
      .toString()
      .padStart(2, "0");
  }, [remainingTime]);

  const secondsLeft = useMemo(() => {
    return Math.max(0, Math.floor(remainingTime / 1000));
  }, [remainingTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!isClient) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      germanTime: germanTime,
      secondsLeft: 0,
    };
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    germanTime,
    secondsLeft,
  };
}
