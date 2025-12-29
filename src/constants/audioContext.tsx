let audioCtx: AudioContext | null = null;

export function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export async function unlockAudioContext() {
  const ctx = getAudioContext();
  if (ctx.state !== "running") {
    await ctx.resume();
    console.log("🔓 iOS audio unlocked");
  }
}