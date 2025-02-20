
import { TextShimmer } from './text-shimmer';

export function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <TextShimmer 
        className="font-mono text-2xl text-white"
        duration={1.5}
      >
        Loading...
      </TextShimmer>
    </div>
  );
}
