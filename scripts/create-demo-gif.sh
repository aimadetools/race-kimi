#!/usr/bin/env bash
set -euo pipefail

# create-demo-gif.sh
# Assembles the screenshot frames from generate-demo-gif.js into an optimized
# 60-second GIF for README / GitHub releases.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRAMES_DIR="$ROOT_DIR/assets/demo-gif-frames"
OUT_GIF="$ROOT_DIR/assets/schemalens-60-seconds.gif"
FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

if [ ! -d "$FRAMES_DIR" ]; then
  echo "Frames directory not found: $FRAMES_DIR"
  echo "Run 'node scripts/generate-demo-gif.js' first (with a local server on :3000)."
  exit 1
fi

cd "$FRAMES_DIR"

# Frame durations: 6 scenes × 11.25s with 1.5s crossfade = 60s total.
DURATION="11.25"
FADE="1.5"

# Scene captions (bottom center)
CAPTIONS=(
  "SchemaLens — free SQL schema diff in your browser"
  "Paste two CREATE TABLE schemas..."
  "...or load a sample in one click"
  "See every change visually"
  "Get ready-to-run migration SQL"
  "Add schema diff to your CI/CD pipeline"
)

# Build per-scene drawtext filters.
build_text_filter() {
  local idx="$1"
  local text="${CAPTIONS[$idx]}"
  printf "%s" "drawtext=fontfile=$FONT:text='$text':x=(w-text_w)/2:y=h-text_h-40:fontsize=36:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=12:line_spacing=4"
}

SCALE="scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black,setsar=1,format=yuv420p"

# Apply scaling + text to each input.
FILTER=""
for i in 1 2 3 4 5 6; do
  FRAME=$(printf "%02d" "$i")
  TEXT_FILTER=$(build_text_filter $((i-1)))
  FILTER="$FILTER[$((i-1)):v]$SCALE,$TEXT_FILTER[v$i];"
done

# Chain xfade transitions.
# Offsets are cumulative: each input is 11.25s, overlap is 1.5s.
FILTER="${FILTER}[v1][v2]xfade=transition=fade:duration=$FADE:offset=9.75[vt1];"
FILTER="${FILTER}[vt1][v3]xfade=transition=fade:duration=$FADE:offset=19.5[vt2];"
FILTER="${FILTER}[vt2][v4]xfade=transition=fade:duration=$FADE:offset=29.25[vt3];"
FILTER="${FILTER}[vt3][v5]xfade=transition=fade:duration=$FADE:offset=39.0[vt4];"
FILTER="${FILTER}[vt4][v6]xfade=transition=fade:duration=$FADE:offset=48.75[outv]"

TMP_MP4="$ROOT_DIR/assets/demo-gif-tmp.mp4"

# Pass 1: assemble the 60-second slideshow with crossfades and captions.
ffmpeg -y \
  -loop 1 -t "$DURATION" -i 01-homepage-hero.png \
  -loop 1 -t "$DURATION" -i 02-app-empty.png \
  -loop 1 -t "$DURATION" -i 03-app-loaded.png \
  -loop 1 -t "$DURATION" -i 04-visual-diff.png \
  -loop 1 -t "$DURATION" -i 05-migration-sql.png \
  -loop 1 -t "$DURATION" -i 06-cicd-integration.png \
  -filter_complex "$FILTER" \
  -map "[outv]" \
  -t 60 \
  -pix_fmt yuv420p \
  "$TMP_MP4"

# Pass 2: convert to an optimized 800px-wide GIF for fast README loading.
ffmpeg -y -i "$TMP_MP4" \
  -vf "fps=5,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" \
  -loop 0 \
  "$OUT_GIF"

rm -f "$TMP_MP4"

echo "Created $OUT_GIF"
ls -lh "$OUT_GIF"
