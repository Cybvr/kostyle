import Header from "@/components/Header";
import { SideNav } from "../components/SideNav";
import { CopyBox } from "@/components/ui/copy-box";

function ImageSlot({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return (
    <div className={`bg-border flex items-center justify-center shrink-0 ${className}`}>
      <span className="text-muted-foreground text-xs font-heading text-center p-2 leading-snug">
        {placeholder}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <SideNav />

        {/* ── Home ── */}
        <section
          id="home"
          className="relative w-full min-h-[60vh] flex flex-col justify-center overflow-hidden scroll-mt-20 bg-foreground text-background"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(18,16,14,.94) 0%, rgba(18,16,14,.78) 34%, rgba(18,16,14,.28) 60%, rgba(18,16,14,.42) 100%), url('/cover-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 flex flex-col justify-center">
            <div className="absolute -left-[100px] -top-[100px] w-[360px] h-[360px] sm:-left-[140px] sm:-top-[140px] sm:w-[560px] sm:h-[560px] border border-accent/35 rounded-full" />
            <div className="relative z-10 flex flex-col gap-2">
              <h1 className="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl leading-none tracking-[-0.02em] m-0">
                KOStyle Aug-Dec 2026
              </h1>
              <p className="font-heading text-base sm:text-lg tracking-wider text-background/80 uppercase m-0">
                Marketing Deliverables Growth Pack
              </p>
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section
          id="problem"
          className="relative w-full scroll-mt-20 bg-accent text-accent-foreground"
        >
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-4 pb-4 border-b-2 border-current max-w-[22ch]">
              The Problem
            </h2>
            <p className="text-sm leading-relaxed text-foreground max-w-[65ch] m-0">
              The followers are there and engaged. What&apos;s missing is desire and
              incentive — for most of them, buying Kostyle just isn&apos;t a
              priority yet. Give them a reason, and the audience you already have
              starts converting.
            </p>
          </div>
        </section>

        {/* ── The Roadmap ── */}
        <section id="roadmap" className="relative w-full scroll-mt-20 bg-background text-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-6">
              The Roadmap
            </h2>

            <div className="-mx-6 sm:mx-0 overflow-x-auto">
            <div className="flex flex-col text-sm min-w-[600px] px-6 sm:px-0">
              <div className="grid grid-cols-[40px_1.2fr_2fr_90px_60px] gap-6 py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-foreground">
                <div className="text-center">#</div>
                <div>Task</div>
                <div>Description</div>
                <div className="text-center">Unit / Qty</div>
                <div className="text-center">Done</div>
              </div>
              {[
                { n: 1, task: "Offer built on the store", desc: "bundle or launch price live, with promo code, homepage banner and free-UAE-shipping message.", unit: "1 setup" },
                { n: 2, task: "Drop campaign kit", desc: "teaser, launch-day and last-call posts plus stories and captions for one drop or restock.", unit: "9 assets" },
                { n: 3, task: "WhatsApp ordering setup", desc: "catalogue link, saved quick replies and a how-to-order graphic.", unit: "1 setup" },
                { n: 4, task: "Win-back + referral posts", desc: "one win-back post and three referral posts ready to publish.", unit: "4 posts" },
                { n: 5, task: "Buying-guide articles", desc: "around 800 words each, written and published.", unit: "3 posts" },
                { n: 6, task: "Founder story", desc: "written founder bio and story angle for the brand.", unit: "1 story" },
                { n: 7, task: "Press kit", desc: "press kit hosted at kostyle.ae/presskit.", unit: "1 link" },
                { n: 8, task: "Outreach", desc: "press and podcast outreach planned with tailored messages ready to send.", unit: "1 plan" },
                { n: 9, task: '"As seen in" assets', desc: "each press hit turned into a post, plus a trust strip on the store.", unit: "3 posts" },
                { n: 10, task: "End-of-plan results report", desc: "written review of what converted and where to double down next.", unit: "1 report" },
              ].map(({ n, task, desc, unit }, index, arr) => (
                <div
                  key={n}
                  className={`grid grid-cols-[40px_1.2fr_2fr_90px_60px] gap-6 py-2.5 items-center ${
                    index !== arr.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="text-center font-semibold text-foreground">{n}</div>
                  <div className="font-semibold text-foreground">{task}</div>
                  <div className="text-foreground">{desc}</div>
                  <div className="text-center text-foreground">{unit}</div>
                  <div className="flex justify-center">
                    <div className="w-4 h-4 border border-foreground/40" />
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* ── Drop campaign kit ── */}
        <section id="drop-kit" className="relative w-full min-h-screen scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 flex flex-col h-full">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-4 pb-4 border-b-2 border-current">
              Drop campaign kit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 flex-1">
              {[
                {
                  label: "TEASER · 3–5 DAYS OUT",
                  copy: "The Heavyweight Hoodie drops Friday. 80 made. Set a reminder. A first look at what lands Friday. Tap the story to see it move. Friday, 8pm. Turn on notifications so you do not miss it.",
                },
                {
                  label: "LAUNCH DAY · AT DROP TIME",
                  copy: "Live now. The Heavyweight Hoodie is on the site. Link in bio. Here is how it wears. 400gsm cotton, cut for training. Shop it at kostyle.ae. Free UAE shipping over AED 250 on the drop. Sizes are going in order.",
                },
                {
                  label: "LAST CALL · STOCK LOW",
                  copy: "Low stock on medium and large. If it is in your cart, check out before it goes. Almost gone. This run will not restock. Final pieces on the site now. Last chance at this price.",
                },
              ].map(({ label, copy }) => (
                <div key={label} className="bg-background/50 p-7 flex flex-col gap-4">
                  <ImageSlot placeholder="Clip / photo of the piece" className="w-full h-36" />
                  <div className="font-heading font-semibold text-sm tracking-[.06em] text-accent mb-2">{label}</div>
                  <CopyBox value={copy} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WhatsApp ordering ── */}
        <section id="whatsapp" className="relative w-full scroll-mt-20 bg-background text-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 flex flex-col h-full">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-6 pb-4 border-b-2 border-current">
              WhatsApp ordering
            </h2>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-heading font-semibold text-sm tracking-[.12em] uppercase text-foreground mb-3">
                  How to order
                </h3>
                <p className="text-sm leading-relaxed text-foreground max-w-[65ch] m-0">
                  To order via WhatsApp, message us the item and your desired size. We will confirm price and stock availability right away. Payment can be made by card, bank transfer, or cash on delivery. Once confirmed, we ship your order and send tracking details directly to you.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-sm tracking-[.12em] uppercase text-foreground mb-3">
                  Saved quick replies
                </h3>
                <div className="flex flex-col text-sm">
                  <div className="grid grid-cols-[minmax(84px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-foreground">
                    <div>Keyword</div>
                    <div>Response</div>
                  </div>
                  {[
                    { cmd: "/hi", reply: "Thanks for messaging Kostyle. Tell us the item and size and we will check stock." },
                    { cmd: "/price", reply: "That piece is [AED price]. Free UAE shipping over AED 250." },
                    { cmd: "/sizes", reply: "It comes in S to XL. Send your usual size and we will tell you how it runs." },
                    { cmd: "/pay", reply: "Card, bank transfer, or cash on delivery. We ship once payment is confirmed." },
                    { cmd: "/ship", reply: "We ship from Dubai in 1–2 days. UAE delivery takes 2–4 days." },
                    { cmd: "/done", reply: "Order confirmed. We will send tracking once it ships. Thanks for supporting Kostyle." },
                  ].map(({ cmd, reply }, index, arr) => (
                    <div
                      key={cmd}
                      className={`grid grid-cols-[minmax(84px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 items-center ${
                        index !== arr.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="font-semibold text-foreground">{cmd}</div>
                      <CopyBox value={reply} className="border-none p-0 pr-8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Win-back + referral posts ── */}
        <section id="win-back" className="relative w-full scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-6">
              Win-back + referral posts
            </h2>
            <div className="flex flex-col text-sm">
              <div className="grid grid-cols-[minmax(96px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-accent-foreground">
                <div>Name</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-[minmax(96px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-accent-foreground">Win-back post</div>
                <CopyBox value="It has been a while. Take 15% off your next order with BACK15 before the end of the month." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(96px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-accent-foreground">Feed post</div>
                <CopyBox value="Bring a training partner. Share your code and you both get AED 30 off. Your code is in your account. Tag someone who needs the kit." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(96px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-accent-foreground">Story</div>
                <CopyBox value="Refer a friend, you both save AED 30. Swipe up for your code." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(96px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 items-center">
                <div className="font-semibold text-accent-foreground">Reply to a tag</div>
                <CopyBox value="Appreciate the tag. Send your friends your referral code and you both get AED 30 off the next order." className="border-none p-0 pr-8" />
              </div>
            </div>
          </div>
        </section>

        {/* ── On-page SEO pass ── */}
        <section id="seo" className="relative w-full scroll-mt-20 bg-background text-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-6">
              SEO
            </h2>
            <div className="-mx-6 sm:mx-0 overflow-x-auto">
            <div className="flex flex-col text-sm min-w-[620px] px-6 sm:px-0">
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-foreground">
                <div>Page</div>
                <div>Title</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">Homepage</div>
                <div className="font-semibold text-foreground">Kostyle · Boxing Wear Made in Dubai</div>
                <CopyBox value="Boxing and training wear made in Dubai. Free UAE shipping over AED 250." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">Collection</div>
                <div className="font-semibold text-foreground">Training Hoodies · Kostyle</div>
                <CopyBox value="Heavyweight hoodies built for training and daily wear. Shop the collection at kostyle.ae." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">Hoodie</div>
                <div className="font-semibold text-foreground">Heavyweight Boxing Hoodie · Kostyle</div>
                <CopyBox value="400gsm cotton, cut for training. Free UAE shipping over AED 250." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">About</div>
                <div className="font-semibold text-foreground">About Kostyle · Made in Dubai</div>
                <CopyBox value="Why Ali Hamze makes boxing wear the way he does, and where it is made." className="border-none p-0 pr-8" />
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">SEO follow-through</div>
                <div className="font-semibold text-foreground">Product pages and images</div>
                <div className="text-foreground">Remaining product pages follow the same pattern. Alt text describes every product image and colour.</div>
              </div>
              <div className="grid grid-cols-[minmax(110px,.7fr)_1fr_1.4fr] gap-7 py-2.5 items-center">
                <div className="font-semibold text-foreground">Technical</div>
                <div className="font-semibold text-foreground">Sitemap and performance</div>
                <div className="text-foreground">Sitemap submitted to Search Console. Page speed checked, images compressed, and theme scripts trimmed.</div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* ── Buying-guide articles ── */}
        <section id="articles" className="relative w-full scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-4 pb-4 border-b-2 border-current">
              Buying-guide articles
            </h2>
            <ul className="m-0 max-w-[65ch] list-disc pl-6 text-sm leading-relaxed">
              <li>How to choose a training hoodie that lasts</li>
              <li>What to look for in boxing shorts</li>
              <li>Training wear that works in Dubai heat</li>
            </ul>
          </div>
        </section>

        {/* ── Founder story ── */}
        <section id="founder-story" className="relative w-full scroll-mt-20 bg-background text-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-4 pb-4 border-b-2 border-current">
              Founder story
            </h2>
            <CopyBox
              value="Kostyle began with a simple frustration: Ali Hamze wanted boxing and training wear that could handle hard sessions, fit properly, and still look right outside the gym. After years of training in pieces that wore out quickly or were not built for the demands of the ring, he started developing a better local alternative in Dubai. The brand is built around durable materials, practical cuts, and a straightforward belief that athletes should not have to choose between performance and style. What started as a response to a gap in his own kit has grown into a homegrown label making hoodies, shorts, and tees for people who train seriously and live actively."
              className="max-w-[72ch]"
            />
          </div>
        </section>

        {/* ── Press kit ── */}
        <section id="press-kit" className="relative w-full scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-4 pb-4 border-b-2 border-current">
              Press kit
            </h2>
            <CopyBox value="http://kostyle.ae/presskit" className="max-w-md">
              <a
                href="http://kostyle.ae/presskit"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-accent"
              >
                http://kostyle.ae/presskit
              </a>
            </CopyBox>
          </div>
        </section>

        {/* ── Outreach ── */}
        <section id="outreach" className="relative w-full scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-6">
              Outreach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-sm tracking-[.08em] uppercase text-accent-foreground mb-3">
                  Press
                </h3>
                <CopyBox
                  value={
                    "Subject: Dubai-made boxing brand built for real training\n\n" +
                    "Hi [Name], I’m Ali Hamze, founder of Kostyle, a boxing and training wear brand made in Dubai. I started Kostyle after years of training in kit that wore out quickly or was never built for the demands of the ring. We make durable hoodies, shorts, and tees for people who train seriously. I’d love to share the story of building a homegrown alternative to imported labels. Press kit: http://kostyle.ae/presskit"
                  }
                >
                  <p className="m-0">
                    <strong>Subject: Dubai-made boxing brand built for real training</strong>
                    <br />
                    <br />
                    Hi [Name], I’m Ali Hamze, founder of Kostyle, a boxing and training wear brand made in Dubai. I started Kostyle after years of training in kit that wore out quickly or was never built for the demands of the ring. We make durable hoodies, shorts, and tees for people who train seriously. I’d love to share the story of building a homegrown alternative to imported labels. Press kit: http://kostyle.ae/presskit
                  </p>
                </CopyBox>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm tracking-[.08em] uppercase text-accent-foreground mb-3">
                  Podcast
                </h3>
                <CopyBox
                  value={
                    "Subject: Guest idea — building a boxing-wear brand in Dubai\n\n" +
                    "Hi [Name], I’m Ali Hamze, founder of Kostyle, a Dubai-made boxing and training wear brand. I’d love to join you to talk about building a homegrown label in a market full of imported brands, designing kit for real training, and turning a frustration from the gym into a business. I can share the founder story, lessons from building the product, and what it takes to grow a local sports brand. Press kit: http://kostyle.ae/presskit"
                  }
                >
                  <p className="m-0">
                    <strong>Subject: Guest idea — building a boxing-wear brand in Dubai</strong>
                    <br />
                    <br />
                    Hi [Name], I’m Ali Hamze, founder of Kostyle, a Dubai-made boxing and training wear brand. I’d love to join you to talk about building a homegrown label in a market full of imported brands, designing kit for real training, and turning a frustration from the gym into a business. I can share the founder story, lessons from building the product, and what it takes to grow a local sports brand. Press kit: http://kostyle.ae/presskit
                  </p>
                </CopyBox>
              </div>
            </div>
          </div>
        </section>

        {/* ── "As seen in" assets ── */}
        <section id="as-seen-in" className="relative w-full scroll-mt-20 bg-background text-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-3 pb-4 border-b-2 border-current">
              &ldquo;As seen in&rdquo; assets
            </h2>
            <div className="flex flex-col text-sm">
              <div className="grid grid-cols-[minmax(84px,.7fr)_1.6fr] md:grid-cols-[minmax(140px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-foreground">
                <div>Name</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-[minmax(84px,.7fr)_1.6fr] md:grid-cols-[minmax(140px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">Post caption</div>
                <CopyBox value="Kostyle in [outlet]. Thanks to [name or handle] for the feature. Link in our story." className="border-none p-0 pr-8 text-foreground" />
              </div>
              <div className="grid grid-cols-[minmax(84px,.7fr)_1.6fr] md:grid-cols-[minmax(140px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 border-b border-border items-center">
                <div className="font-semibold text-foreground">Story line</div>
                <CopyBox value="We are in [outlet]. Tap to read." className="border-none p-0 pr-8 text-foreground" />
              </div>
              <div className="grid grid-cols-[minmax(84px,.7fr)_1.6fr] md:grid-cols-[minmax(140px,.7fr)_1.6fr] gap-4 sm:gap-7 py-2.5 items-center">
                <div className="font-semibold text-foreground">Store trust strip</div>
                <CopyBox value="A homepage row reading “As seen in” with each outlet’s logo, added as coverage lands." className="border-none p-0 pr-8 text-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Results report ── */}
        <section id="results" className="relative w-full min-h-screen scroll-mt-20 bg-accent text-accent-foreground">
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 flex flex-col h-full">
            <h2 className="font-heading font-medium text-3xl leading-[1.02] tracking-[-0.01em] mb-3 pb-4 border-b-2 border-current">
              Results report
            </h2>
            <div className="flex gap-10 flex-1">
              <div className="flex-[1.25]">
                <div className="text-sm font-bold tracking-[.16em] uppercase text-accent-foreground mb-2.5">
                  Marketing outputs, under our control
                </div>
                <div className="flex flex-col text-sm">
                  <div className="flex py-2.5 border-b-2 border-foreground font-heading font-semibold text-sm tracking-[.06em] uppercase text-accent-foreground">
                    <div className="flex-[2]">Measure</div>
                    <div className="flex-1 text-right">Start</div>
                    <div className="flex-1 text-right">End</div>
                  </div>
                  {[
                    { measure: "Email & WhatsApp list", start: "140", end: "620" },
                    { measure: "Store visits / month", start: "1,900", end: "5,400" },
                    { measure: "Email open rate", start: "—", end: "41%" },
                    { measure: "Content published", start: "0", end: "3 + 12" },
                    { measure: "Pages showing in Google", start: "2", end: "14" },
                    { measure: "Press placements", start: "0", end: "4" },
                  ].map(({ measure, start, end }) => (
                    <div key={measure} className="flex py-2.5 border-b border-border">
                      <div className="flex-[2] text-accent-foreground">{measure}</div>
                      <div className="flex-1 text-right text-accent-foreground">{start}</div>
                      <div className="flex-1 text-right font-semibold text-accent-foreground">{end}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
