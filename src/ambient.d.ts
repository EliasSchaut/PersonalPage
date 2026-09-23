/// <reference types="unplugin-icons/types/svelte" />

declare module 'typewriter-effect/dist/core' {
  interface TypewriterOptions {
    strings?: string | string[];
    cursor?: string;
    delay?: number | 'natural';
    deleteSpeed?: number | 'natural';
    loop?: boolean;
    autoStart?: boolean;
    devMode?: boolean;
    skipAddStyles?: boolean;
    wrapperClassName?: string;
    cursorClassName?: string;
    stringSplitter?: (text: string) => string[];
  }
  export default class Typewriter {
    constructor(container: string | HTMLElement, options?: TypewriterOptions);
    start(): this;
    pause(): this;
    stop(): this;
  }
}
