export function playLessonSound(kind: "click" | "correct" | "wrong" | "finish", enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const audio = new AudioContext();
    const notes = kind === "wrong" ? [150, 100] : kind === "correct" ? [523, 659, 784] : kind === "finish" ? [523, 659, 784, 1047] : [640];
    notes.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * .1;
      oscillator.type = kind === "wrong" ? "sawtooth" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(.08, start + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, start + .16);
      oscillator.connect(gain); gain.connect(audio.destination);
      oscillator.start(start); oscillator.stop(start + .18);
    });
    window.setTimeout(() => { void audio.close(); }, 900);
  } catch { /* Audio is optional on restricted browsers. */ }
}