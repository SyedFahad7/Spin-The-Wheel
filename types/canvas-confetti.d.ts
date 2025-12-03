declare module "canvas-confetti" {
  type Options = {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    angle?: number;
    gravity?: number;
    scalar?: number;
  };

  interface ConfettiFn {
    (options?: Options): void;
  }

  const confetti: ConfettiFn;
  export default confetti;
}


