import { images, type SiteImage } from "./images";

/* ------------------------------------------------------------------ */
/* The watch                                                           */
/* ------------------------------------------------------------------ */

export const watch = {
  name: "Reference 01",
  subtitle: "Automatic Chronograph",
  intro:
    "A tool watch in blackened titanium, built around a column-wheel chronograph and finished with the restraint of a dress watch.",
  highlights: [
    {
      title: "Blackened titanium",
      text: "Light on the wrist and hard-wearing. The coating is matte, so the case catches as little light as the dial.",
    },
    {
      title: "Three-register dial",
      text: "Running seconds, 30-minute and 12-hour counters, with red chronograph hands that only come alive when the pushers are pressed.",
    },
    {
      title: "Open caseback",
      text: "A sapphire window shows the rotor and the movement at work. The watch is as finished on the inside as on the outside.",
    },
  ],
  specs: [
    { group: "Case", items: [
      ["Diameter", "42 mm"],
      ["Thickness", "14.5 mm"],
      ["Material", "Grade 5 titanium, black coating"],
      ["Crystal", "Domed sapphire, anti-reflective inside"],
      ["Caseback", "Sapphire exhibition window"],
      ["Water resistance", "100 m"],
    ] },
    { group: "Movement", items: [
      ["Type", "Automatic chronograph"],
      ["Frequency", "28,800 vph (4 Hz)"],
      ["Power reserve", "Approx. 42 hours"],
      ["Jewels", "25"],
      ["Functions", "Hours, minutes, small seconds, date, chronograph"],
    ] },
    { group: "Bracelet", items: [
      ["Material", "Titanium, black coating"],
      ["Clasp", "Folding clasp with micro-adjust"],
    ] },
  ],
  gallery: [images.assembled, images.dial, images.bezelLift, images.case, images.movement, images.caseback] as SiteImage[],
};

/* ------------------------------------------------------------------ */
/* Movement anatomy                                                    */
/* ------------------------------------------------------------------ */

export type Part = {
  id: string;
  name: string;
  text: string;
  image: SiteImage;
  /** Hotspot position on the exploded view, in percent. */
  x: number;
  y: number;
};

export const parts: Part[] = [
  {
    id: "case",
    name: "Case & crystal",
    text: "The case is milled from a single block of titanium. A domed sapphire crystal, the hardest material on the watch after diamond tooling, seals the top.",
    image: images.case,
    x: 50,
    y: 10,
  },
  {
    id: "dial",
    name: "Dial & hands",
    text: "Three counters, a date window and applied indices. The red chronograph hands are balanced so they snap back to zero without overshooting.",
    image: images.dialExploded,
    x: 47,
    y: 33,
  },
  {
    id: "gears",
    name: "Gear train",
    text: "A chain of wheels steps the mainspring's energy down into seconds, minutes and hours. Each pivot runs in a synthetic ruby to cut friction.",
    image: images.gearTrain,
    x: 30,
    y: 42,
  },
  {
    id: "crown",
    name: "Crown & pushers",
    text: "The crown winds and sets the watch. The two pushers start, stop and reset the chronograph through a column wheel, which gives them a crisp, even feel.",
    image: images.crown,
    x: 70,
    y: 48,
  },
  {
    id: "movement",
    name: "Movement",
    text: "Bridges, springs, levers and the balance wheel, beating eight times a second. This is the part of the watch that actually keeps time.",
    image: images.movement,
    x: 49,
    y: 58,
  },
  {
    id: "rotor",
    name: "Rotor",
    text: "A weighted half-disc that spins with every movement of the wrist and winds the mainspring, so the watch never needs a battery.",
    image: images.rotor,
    x: 29,
    y: 61,
  },
  {
    id: "caseback",
    name: "Caseback",
    text: "Screwed down against a gasket for water resistance, with a sapphire window so the movement stays on view.",
    image: images.caseback,
    x: 52,
    y: 78,
  },
];

/* ------------------------------------------------------------------ */
/* Craft                                                               */
/* ------------------------------------------------------------------ */

export const craftSteps = [
  {
    step: "01",
    title: "Design",
    text: "Every proportion is drawn and redrawn: case to dial, hand length to index, the exact radius of the crystal's dome. A watch is read in a glance, so legibility comes first.",
    image: images.assembled,
  },
  {
    step: "02",
    title: "Machining",
    text: "Cases, bridges and plates are cut on CNC machines to tolerances of a few microns. Titanium is slow and unforgiving to machine, which is part of why it is worth using.",
    image: images.case,
  },
  {
    step: "03",
    title: "Finishing",
    text: "Edges are bevelled, surfaces brushed or polished, screw heads blued or blackened. Most of this is done by hand and most of it you will only see through a loupe.",
    image: images.gearTrain,
  },
  {
    step: "04",
    title: "Assembly",
    text: "A watchmaker builds the movement part by part, oiling each pivot with a drop smaller than a pinhead. A chronograph has dozens more parts than a simple watch.",
    image: images.movement,
  },
  {
    step: "05",
    title: "Regulation",
    text: "The finished movement is tested in several positions and temperatures over days, and adjusted until its daily rate sits within a few seconds.",
    image: images.dial,
  },
  {
    step: "06",
    title: "Casing & quality control",
    text: "The movement is cased, the bracelet fitted, and the watch is pressure-tested and worn on a machine that simulates real wrists before it leaves.",
    image: images.caseback,
  },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export type Block = { type: "p" | "h2" | "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  readTime: string;
  date: string;
  image: SiteImage;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "why-the-chronograph-endures",
    title: "Why the Chronograph Endures",
    dek: "Built for racing drivers and pilots, the stopwatch complication has outlived every reason it was invented — and become more popular for it.",
    category: "Essay",
    readTime: "6 min read",
    date: "2026-09-12",
    image: images.dial,
    body: [
      { type: "p", text: "A chronograph is a watch with a stopwatch built in. Press the top pusher and a large seconds hand sweeps away from twelve; press it again and it stops; press the lower pusher and every counter snaps back to zero. It is the most common complication after the date, and arguably the most satisfying to use." },
      { type: "h2", text: "A tool with a job" },
      { type: "p", text: "For most of the twentieth century, timing things to the second mattered. Racing drivers timed laps, pilots timed fuel and headings, doctors timed pulses. The chronograph gave them a reliable instrument on the wrist, readable at a glance, that did not need batteries or a signal." },
      { type: "p", text: "Those jobs have mostly gone to electronics. And yet the chronograph has only grown in popularity, because the things that made it a good tool — legibility, a clear layout, physical controls that click — also make it a good object." },
      { type: "quote", text: "The pushers are the point. A chronograph is a watch you can interact with." },
      { type: "h2", text: "What to look for" },
      { type: "p", text: "Look at how the pushers feel. A column-wheel chronograph, like the one in Reference 01, tends to give a crisp, even action, while simpler cam-actuated designs can feel heavier. Neither is wrong, but you will notice the difference." },
      { type: "p", text: "Look at the layout. Three registers can look busy; two can look sparse. The best dials balance the counters against the hour markers so the time is still the first thing you read." },
      { type: "p", text: "And look at the reset. The hands should fly back to zero together and stop dead, without a wobble. It is a tiny thing, and the kind of tiny thing that separates a good chronograph from a great one." },
    ],
  },
  {
    slug: "anatomy-of-a-movement",
    title: "Anatomy of a Movement",
    dek: "Mainspring, gear train, escapement, balance. A plain-language tour of what is actually going on under the dial.",
    category: "Watch 101",
    readTime: "8 min read",
    date: "2026-08-28",
    image: images.movement,
    body: [
      { type: "p", text: "A mechanical watch has four jobs: store energy, release it slowly, count the releases, and show the count. Every movement, from the simplest to the most complicated, is organised around those four jobs." },
      { type: "h2", text: "Energy: the mainspring" },
      { type: "p", text: "A coiled ribbon of metal inside a drum called the barrel. Winding the crown — or, in an automatic, the rotor spinning on your wrist — tightens the spring. As it unwinds, it turns the barrel, and that is the only power source the watch has." },
      { type: "h2", text: "Transmission: the gear train" },
      { type: "p", text: "A series of wheels carries the barrel's torque to the rest of the movement while changing its speed. One wheel turns once an hour to carry the minute hand; another turns once a minute for the seconds." },
      { type: "h2", text: "Control: the escapement and balance" },
      { type: "p", text: "Left alone, the mainspring would unwind in seconds. The escapement stops that: it lets the gear train advance one tiny step at a time, each step triggered by the balance wheel swinging back and forth on its hairspring. In Reference 01 the balance swings 28,800 times an hour — that is the ticking you hear." },
      { type: "quote", text: "The balance wheel is the heartbeat. Everything else is plumbing." },
      { type: "h2", text: "What are jewels for?" },
      { type: "p", text: "Jewels are small synthetic rubies used as bearings at points of high friction, mostly where wheel pivots turn. They are not decorative and they are not valuable on their own. A higher jewel count usually means more functions, not a better watch." },
    ],
  },
  {
    slug: "caring-for-a-mechanical-watch",
    title: "Caring for a Mechanical Watch",
    dek: "A good mechanical watch can run for generations. A few simple habits make sure yours does.",
    category: "Guide",
    readTime: "5 min read",
    date: "2026-08-04",
    image: images.caseback,
    body: [
      { type: "p", text: "Mechanical watches are tough, but they are machines with moving parts and oils that age. Treat them like a good car: use them, keep them clean, and have them serviced on schedule." },
      { type: "h2", text: "Everyday habits" },
      { type: "p", text: "Wind a manual watch at roughly the same time every day, and stop when you feel resistance. Set the date outside the 'danger zone' of roughly 9pm to 3am, when the date mechanism is engaged. And do not operate the chronograph pushers or the crown underwater unless the watch is specifically designed for it." },
      { type: "h2", text: "Water, magnets and shocks" },
      { type: "p", text: "Water resistance is tested when the watch is new; gaskets age. Have it pressure-tested every year or two if you swim with it. Keep the watch away from strong magnets — speakers, laptop lids, bag clasps — which can make it run fast. A hard knock on a tiled floor is the most common way to damage a balance staff." },
      { type: "quote", text: "The best thing you can do for a mechanical watch is wear it." },
      { type: "h2", text: "Servicing" },
      { type: "p", text: "Every five to eight years, a watchmaker should take the movement apart, clean it, replace worn parts and re-oil it. If your watch starts losing or gaining noticeably, or the power reserve drops, do not wait. A service costs far less than repairing wear caused by old, dried oil." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
