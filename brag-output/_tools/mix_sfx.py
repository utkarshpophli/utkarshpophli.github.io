"""Mix a list of SFX cues into one stereo WAV, so a composition needs a single
<audio> clip for all effects. Usage: mix_sfx.py cues.json out.wav seconds sfx_root"""
import json, subprocess, sys, wave
import numpy as np

SR = 44100
cues_path, out_path, seconds, root = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]


def decode(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)


mix = np.zeros((int(seconds * SR), 2), dtype=np.float32)
for cue in json.load(open(cues_path)):
    clip = decode(f"{root}/{cue['file']}") * cue.get("vol", 0.6)
    start = int(cue["t"] * SR)
    end = min(len(mix), start + len(clip))
    if start < len(mix):
        mix[start:end] += clip[: end - start]

peak = float(np.max(np.abs(mix))) or 1.0
if peak > 0.92:
    mix *= 0.92 / peak
pcm = (np.clip(mix, -1, 1) * 32767).astype("<i2")
with wave.open(out_path, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"wrote {out_path}: {len(json.load(open(cues_path)))} cues, peak {peak:.2f}")
