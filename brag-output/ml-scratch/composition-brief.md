# Hyperframes Composition Brief: Machine Learning Algorithms From Scratch

## Objective
Create a short launch-style brag video for the repo.

## Output
- Composition directory: `brag-output/ml-scratch/composition/`
- Rendered video: `brag-output/ml-scratch/brag.mp4`
- Format: landscape, 1920x1080, 30fps
- Duration: 22.65s

## Source Material
- Project root: https://github.com/utkarshpophli/ml-algorithms-from-scratch (read via the GitHub API; not run locally)
- Primary files read: `README.md`, `app.py`, `models/supervised/linear_regression.py`, `models/unsupervised/kmeans.py`, `models/deep_learning/activation_function.py`
- Product name: Machine Learning Algorithms From Scratch
- Strongest claim: 14 algorithms implemented "using only Python and NumPy", visualised with Plotly in a Streamlit app
- Key UI moment to recreate: the Streamlit sidebar and plot (Linear Regression, then K-Means Clustering)
- Copy that must appear verbatim:
  - Machine Learning Algorithms from Scratch (app title)
  - Choose an algorithm; Learning Rate; Number of Iterations; Number of Clusters (K); Maximum Iterations; Plot Steps
  - Linear Regression; K-Means Clustering; Activation Function; Accuracy Metrics; Visualization
  - Mean Absolute Error; Mean Squared Error; R-squared (R2) Score
  - Supervised Learning, Unsupervised Learning, Deep Learning and the 14 names from the README
- Computation must follow the repo: gradient descent `dw = (1/n) Xᵀ(ŷ − y)`, `db = (1/n) Σ(ŷ − y)`, weights start at zero, lr 0.01, 1000 iterations; K-Means Lloyd iterations with K=5; sigmoid `1/(1+e^-x)`, relu `max(0, x)`, tanh, linear.

## Creative Direction
- Tone preset: polished
- Creative direction: a 3Blue1Brown-style notebook page, calm and confident
- Avoid: generic SaaS language, claims the repo does not make (for example, do not say "no libraries": the app uses scikit-learn to generate sample data), made-up benchmark numbers

## Visual Identity
- Dark scenes #0C0F14 with Manim palette; the Streamlit window uses the app's light theme
- Fonts: Segoe UI; Georgia italic for maths

## Audio
- Music: `assets/music/happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`, volume 0.28, fade out last 1.4s
- Music cue guidance: bundled preset; strong cues 1.60, 3.70, 8.96, 12.65, 17.91
- Audio-reactive: subtle title glow from `assets/rms.js`
- SFX: one pre-mixed track `assets/sfx-mix.wav` (CC0 Kenney sets) via `_tools/mix_sfx.py`

## Hyperframes Instructions
Native Hyperframes conventions (paused GSAP timeline on `window.__timelines`, `data-start`/`data-duration`, local assets, deterministic logic only; canvas drawing driven by timeline proxies). Run `hyperframes check` before render.
