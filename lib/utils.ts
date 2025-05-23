import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export class EventEmitter {
  #callbacks = {};

  static Event = class {
    type = "";
    target = "";
    data = "";
  };

  addEventListener(eventType: string, callback: any) {
    if(typeof callback !== "function") return;
    // @ts-ignore
    if(this.#callbacks[eventType] === undefined) {
      // @ts-ignore
      this.#callbacks[eventType] = [];
    }

    // @ts-ignore
    this.#callbacks[eventType].push(callback);
  }

  // @ts-ignore
  dispatchEvent(eventType, data) {
    // @ts-ignore
    if(this.#callbacks[eventType] === undefined) return;

    const event = new EventEmitter.Event();
    event.type = eventType;
    // @ts-ignore
    event.target = this;
    event.data = data;

    // @ts-ignore
    this.#callbacks[eventType].forEach(callback => {
      callback(event);
    })
  }
}
