# Brag Plan: Machine Learning Algorithms From Scratch

## What is this app?
A Python project that implements 14 classic machine learning algorithms from scratch using only Python and NumPy, plus a Streamlit app that visualises each one in interactive Plotly charts.

## The angle
**Watch the maths run.** Every algorithm in the repo is hand-written, so the video lets the real code do the talking: gradient descent fits a line with the repo's own update rule, K-Means converges step by step, and the activation functions are drawn live. Manim-style graph paper, no gimmicks.

## Hook (first 2-3 seconds)
Dark graph paper. "14 machine learning algorithms." then, on the beat, "From scratch."

## Key moments (the middle)
- The Streamlit app: sidebar "Choose an algorithm", the real sliders (Learning Rate 0.01, Number of Iterations 1000), and a regression line that settles onto the data as the real gradient-descent loop runs. The Mean Absolute Error, Mean Squared Error and R-squared (R2) Score lines update live.
- The algorithm dropdown opens to the full list of 15 entries, then K-Means Clustering runs on screen with "Plot Steps": centroids move, colours reassign, five Viridis clusters.
- The Activation Function view: relu, sigmoid, tanh and linear draw themselves on a number plane, with the formulas from the code.

## Outro / punchline
The README's own grouping: Supervised Learning (8), Unsupervised Learning (4), Deep Learning (2), then the repo URL.

## User flow worth showing
Entry: pick an algorithm in the sidebar. Key action: tune a parameter and run it. Result: a live plot and accuracy metrics.

## Tone
- Preset: polished
- Creative direction: a 3Blue1Brown-style notebook page, calm and confident
- Interpretation: serif italic maths labels, thin strokes, long holds on each plot, restrained audio.

## Format: landscape, 1920x1080
## Duration: 22.65s

## Visual identity (from the project)
- Background: #0C0F14 (dark graph paper) for the title and outro scenes; the Streamlit window is the app's own light theme (#FFFFFF main, #F0F2F6 sidebar, #31333F text, #FF4B4B primary)
- Plot colours from `app.py`: data points red, regression line blue; Viridis for K-Means
- Manim-style accents: blue #58C4DD, teal #5CD0B3, green #83C167, gold #F0AC5F, red #FC6255
- Display font: Segoe UI; maths labels in an italic serif (Georgia)
- Strongest visual element: the Streamlit app with its live plot

## Share copy (draft)
14 machine learning algorithms, written from scratch with Python and NumPy, and a Streamlit app to watch each one work.

## Audio direction
- Role: sparse professional accents
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (warm, steady), 114.84 BPM
- Music treatment: volume 0.28, fade in 0.8s, fade out over the last 1.4s
- Music cue guidance: bundled preset read. Strong cues locked: 1.60s ("From scratch."), 3.70s (the app appears), 8.96s (algorithm menu), 12.65s (activation functions), 17.91s (outro). Curve reveals land on beats 13.18, 14.22, 15.28, 16.34.
- Audio-reactive treatment: subtle; music loudness lifts the glow on the title text. No waveform visuals.
- SFX posture: sparse, motion-matched: soft hit on the hook, UI clicks on the app, ticks on K-Means steps, soft rollovers on curves, one bell and one bong in the outro
- Restraint rule: nothing louder than the music except the hook hit and the outro bell

## Storyboard

### Scene 1 - Hook - 3.70s
Dark graph paper with a faint curve drawing itself. "14 machine learning algorithms." at 0.3s. "From scratch." in blue at 1.60s, held to the end.
Sequential/interaction: none (two staged lines).
Audio intent: a clean soft hit on "From scratch."
Transition mood: hard cut on the beat -> Scene 2

### Scene 2 - Gradient descent - 5.26s
The Streamlit window slides in at 3.70s. Sidebar: "Choose an algorithm", selected "Linear Regression", sliders "Learning Rate" 0.01 and "Number of Iterations" 1000. Main: "Machine Learning Algorithms from Scratch", "Linear Regression", the three metric lines, "Visualization". Red data points; the blue regression line fits from iteration 0 to 1000 using the repo's update rule. Metrics tick as it improves.
Sequential/interaction: yes, simulated "run": the iteration count climbs and the line settles.
Audio intent: one click as it starts, then quiet.
Transition mood: clean -> Scene 3

### Scene 3 - Pick another - 3.69s
The selectbox opens to the list of algorithms from `app.py`, the highlight lands on "K-Means Clustering". The main area switches: sliders "Number of Clusters (K)" 5, "Maximum Iterations" 100, "Plot Steps" ticked. Points start grey, then five centroids move and colours reassign across a few iterations.
Sequential/interaction: yes, dropdown selection, then iteration steps.
Audio intent: select click, a tick per iteration.
Transition mood: clean wipe to dark -> Scene 4

### Scene 4 - Activation Function - 5.26s
Dark number plane. Title "Activation Function". Curves draw on the beats: relu `max(0, x)`, sigmoid `1 / (1 + e^-x)`, tanh, linear. A labelled legend builds as they appear.
Sequential/interaction: yes, four curves one per beat-pair (readable labels).
Audio intent: soft rollovers.
Transition mood: soft -> Scene 5

### Scene 5 - Outro - 4.74s
"Machine Learning Algorithms From Scratch". Three columns deal in: Supervised Learning (8 names), Unsupervised Learning (4), Deep Learning (2), from the README. Final line `github.com/utkarshpophli/ml-algorithms-from-scratch`. Fade to dark with the music.
Sequential/interaction: yes, three column groups.
Audio intent: bell on the title, soft slide per column, one bong on the URL.
Transition mood: fade to black.

**Music mood for this video:** warm, steady
**Audio summary:** a clean hit on the hook, small human clicks while the app runs, light rollovers on curves, one bell and a bong to close.
