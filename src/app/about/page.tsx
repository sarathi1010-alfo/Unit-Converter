export default function AboutPage() {
  return (
    <article className="prose prose-slate max-w-3xl mx-auto py-12">
      <h1>About UnitConverter</h1>

      <p className="lead text-xl text-slate-600 mb-8">
        A fast, visual, and entirely offline-capable unit converter designed for immediate answers.
      </p>

      <h2>What It Does</h2>
      <p>
        UnitConverter is built to eliminate the friction of converting measurements. Whether you&apos;re
        cooking, coding, traveling, or doing homework, you need instant, accurate results. Our tool
        runs calculations with zero-latency, meaning the math happens the moment you type.
      </p>
      <p>
        We also generate ready-to-share links. The exact state of your conversion is saved in the URL,
        so you can easily bookmark or send specific conversions (like exactly 25 Celsius to Fahrenheit)
        to a friend.
      </p>

      <h2>Why It Exists</h2>
      <p>
        Most conversion websites are slow, bloated with pop-ups, or require page reloads. We built
        UnitConverter as part of the <strong>alfo.online</strong> ecosystem to prove that utility
        apps should be clean, respectful of your time, and highly performant.
      </p>

      <h2>Part of the Ecosystem</h2>
      <p>
        UnitConverter is one node in a larger network of free, high-quality tools built by the
        alfo.online team. We focus on creating tools that solve specific problems beautifully.
      </p>

      <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h3 className="mt-0">Educational Content</h3>
        <p>
          We are committed to helping you understand the math behind measurement. Check out our latest guide on <a href="/blog/quick-unit-conversion-guide" className="text-primary font-bold hover:underline">how to convert units quickly and accurately</a> for tips, tricks, and mental math shortcuts.
        </p>
        <p className="text-xs text-slate-500 italic mt-2">Last Modified: July 3, 2024</p>
      </div>

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
        <h3 className="mt-0">Powered by alfo.online</h3>
        <p className="mb-0">Building the next generation of internet utilities.</p>
      </div>
    </article>
  );
}
