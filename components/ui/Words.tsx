// Splits text into masked words so a parent can slide them up with GSAP.
// The extra bottom padding keeps descenders (g, y, p) from being clipped.
export default function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <span data-word className="inline-block will-change-transform">
            {w}
            {" "}
          </span>
        </span>
      ))}
    </span>
  );
}
