"""Per-frame loudness of a music track, for subtle audio-reactive glow.
Usage: rms.py track.mp3 seconds out.js  (writes window.RMS, 30 values per second)"""
import subprocess, sys
import numpy as np

track, seconds, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]
SR, FPS = 8000, 30
raw = subprocess.run(
    ["ffmpeg", "-v", "error", "-t", str(seconds), "-i", track, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
    check=True, capture_output=True,
).stdout
x = np.frombuffer(raw, dtype=np.float32)
hop = SR // FPS
n = len(x) // hop
rms = np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(axis=1))
rms = np.convolve(rms, np.ones(5) / 5, mode="same")           # smooth
rms = np.clip(rms / (np.percentile(rms, 95) or 1.0), 0, 1)     # 0..1
open(out, "w").write("window.RMS_FPS=30;window.RMS=" + str([round(float(v), 3) for v in rms]) + ";")
print(f"wrote {out}: {n} frames")
