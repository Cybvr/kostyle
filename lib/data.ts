import type { IconType } from "react-icons";
import {
  MdArticle,
  MdBarChart,
  MdCampaign,
  MdChecklist,
  MdDashboard,
  MdInfo,
  MdSearch,
  MdSend,
} from "react-icons/md";

export type NavItem = { id: string; label: string; icon: IconType };

export const NAV: ReadonlyArray<NavItem> = [
  { id: "overview", label: "Overview", icon: MdDashboard },
  { id: "roadmap", label: "Roadmap", icon: MdChecklist },
  { id: "campaigns", label: "Campaigns", icon: MdCampaign },
  { id: "articles", label: "Articles", icon: MdArticle },
  { id: "seo", label: "SEO", icon: MdSearch },
  { id: "about", label: "About", icon: MdInfo },
  { id: "outreach", label: "Outreach", icon: MdSend },
  { id: "results", label: "Results", icon: MdBarChart },
];

export type RoadmapItem = { n: number; task: string; desc: string; unit: string };

export const ROADMAP: ReadonlyArray<RoadmapItem> = [
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
];

export type Stat = { label: string; start: string; end: string };

export const STATS: ReadonlyArray<Stat> = [
  { label: "Email & WhatsApp list", start: "140", end: "620" },
  { label: "Store visits / month", start: "1,900", end: "5,400" },
  { label: "Pages in Google", start: "2", end: "14" },
  { label: "Press placements", start: "0", end: "4" },
];

export type DropPost = { label: string; copy: string; image?: string };

export const DROP_KIT: ReadonlyArray<DropPost> = [
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
];

export type QuickReply = { title: string; conversation: string };

export const QUICK_REPLIES: ReadonlyArray<QuickReply> = [
  {
    title: "First Visit",
    conversation: "C: How much is this piece?\nKO: It’s [AED price]. UAE shipping is free for orders over AED 250.\nC: What sizes do you have?\nKO: It comes in sizes S to XL. Send us your usual size and we’ll let you know how it fits.\nC: How can I pay?\nKO: You can pay by card, bank transfer, or cash on delivery. We’ll ship once payment is confirmed.\nC: How long will delivery take?\nKO: We ship from Dubai within 1–2 days. UAE delivery usually takes 2–4 days.\nC: I’d like to place the order.\nKO: Your order is confirmed. We’ll send your tracking details once it ships. Thanks for supporting KOStyle!",
  },
];

export type NamedCopy = { name: string; copy: string };

export const WIN_BACK: ReadonlyArray<NamedCopy> = [
  { name: "Win-back post", copy: "It has been a while. Take 15% off your next order with BACK15 before the end of the month." },
  { name: "Feed post", copy: "Bring a training partner. Share your code and you both get AED 30 off. Your code is in your account. Tag someone who needs the kit." },
  { name: "Story", copy: "Refer a friend, you both save AED 30. Swipe up for your code." },
  { name: "Reply to a tag", copy: "Appreciate the tag. Send your friends your referral code and you both get AED 30 off the next order." },
];

export type ArticleStatus = "draft" | "published";
export type Article = {
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  status: ArticleStatus;
  publishDate: string;
};

export const ARTICLES: ReadonlyArray<Article> = [
  {
    title: "How to choose boxing gloves for your training",
    excerpt: "The right boxing gloves should protect your hands, suit your training, and stay comfortable through hard rounds.",
    body: "Choosing boxing gloves starts with how you train. Bag work, pad work, technical drills, and sparring all place different demands on the glove. Look for secure wrist support, dense but responsive padding, and a fit that keeps your hand closed without cutting off circulation.\n\nFor regular training, durability matters as much as first-day comfort. A glove should hold its shape after repeated sessions, dry properly between uses, and give you enough room for hand wraps without feeling loose. In Dubai heat, breathable lining and a clear care routine matter even more.\n\nThe best glove is the one that lets you train consistently. Choose the size and weight for your session, wrap your hands properly, and replace gloves when the padding or wrist support no longer feels reliable.",
    tags: ["boxing gloves", "buying guide", "training"],
    status: "published",
    publishDate: "2026-08-01",
  },
  {
    title: "8oz, 10oz, 12oz, or 16oz? Boxing glove sizes explained",
    excerpt: "Glove weight changes how a session feels. Here is a practical way to choose the right pair for your work.",
    body: "Boxing glove weight is usually measured in ounces, and the right choice depends on the session rather than the colour or shape of the glove. Lighter gloves can feel faster for pad work and competition-style drills. Heavier gloves add more padding and are commonly used for general training and sparring.\n\nIf you are building one everyday training setup, start with a glove that gives you enough protection for the work you actually do. Check your gym's sparring rules before choosing a sparring weight, and remember that hand wraps change the fit inside the glove.\n\nA glove should feel secure around the wrist and snug across the knuckles without forcing your fingers into an awkward position. When in doubt, try the glove with your wraps on and ask your coach what weight suits your sessions.",
    tags: ["boxing gloves", "sizes", "training"],
    status: "draft",
    publishDate: "",
  },
  {
    title: "How to care for boxing gloves in Dubai heat",
    excerpt: "Heat and sweat can shorten a glove's life. A few simple habits keep the padding, lining, and wrist closure in better shape.",
    body: "Boxing gloves hold sweat inside the padding and lining, so leaving them zipped in a kit bag after training is one of the fastest ways to create odour and wear. Open the gloves as soon as you finish, remove your wraps, and let both gloves air out in a cool, dry place.\n\nDo not put boxing gloves on a radiator or use high heat to dry them. Wipe the outside with a soft cloth, use a glove-safe cleaner when needed, and keep the inside as dry as possible. In Dubai's heat, rotating between two pairs can also give each pair more time to dry between sessions.\n\nCare will not make a worn-out glove safe again. Check the knuckle padding, seams, and wrist closure regularly, and replace the pair when protection or fit has noticeably changed.",
    tags: ["boxing gloves", "care guide", "Dubai"],
    status: "draft",
    publishDate: "",
  },
];

export type SeoRow = { page: string; title: string; desc: string; copy: boolean };

export const SEO_ROWS: ReadonlyArray<SeoRow> = [
  { page: "Homepage", title: "Kostyle · Boxing Wear Made in Dubai", desc: "Boxing and training wear made in Dubai. Free UAE shipping over AED 250.", copy: true },
  { page: "Collection", title: "Training Hoodies · Kostyle", desc: "Heavyweight hoodies built for training and daily wear. Shop the collection at kostyle.ae.", copy: true },
  { page: "Hoodie", title: "Heavyweight Boxing Hoodie · Kostyle", desc: "400gsm cotton, cut for training. Free UAE shipping over AED 250.", copy: true },
  { page: "About", title: "About Kostyle · Made in Dubai", desc: "Why Ali Hamze makes boxing wear the way he does, and where it is made.", copy: true },
  { page: "SEO follow-through", title: "Product pages and images", desc: "Remaining product pages follow the same pattern. Alt text describes every product image and colour.", copy: false },
  { page: "Technical", title: "Sitemap and performance", desc: "Sitemap submitted to Search Console. Page speed checked, images compressed, and theme scripts trimmed.", copy: false },
];

export const FOUNDER_STORY =
  "Kostyle began with a simple frustration: Ali Hamze wanted boxing and training wear that could handle hard sessions, fit properly, and still look right outside the gym. After years of training in pieces that wore out quickly or were not built for the demands of the ring, he started developing a better local alternative in Dubai. The brand is built around durable materials, practical cuts, and a straightforward belief that athletes should not have to choose between performance and style. What started as a response to a gap in his own kit has grown into a homegrown label making hoodies, shorts, and tees for people who train seriously and live actively.";

export const PRESS_KIT_URL = "http://kostyle.ae/presskit";

export type OutreachMessage = { kind: string; subject: string; body: string; image?: string };

export const OUTREACH: ReadonlyArray<OutreachMessage> = [
  {
    kind: "Press",
    subject: "Dubai-made boxing brand built for real training",
    body: "Hi [Name], I’m Ali Hamze, founder of Kostyle, a boxing and training wear brand made in Dubai. I started Kostyle after years of training in kit that wore out quickly or was never built for the demands of the ring. We make durable hoodies, shorts, and tees for people who train seriously. I’d love to share the story of building a homegrown alternative to imported labels. Press kit: http://kostyle.ae/presskit",
  },
  {
    kind: "Podcast",
    subject: "Guest idea — building a boxing-wear brand in Dubai",
    body: "Hi [Name], I’m Ali Hamze, founder of Kostyle, a Dubai-made boxing and training wear brand. I’d love to join you to talk about building a homegrown label in a market full of imported brands, designing kit for real training, and turning a frustration from the gym into a business. I can share the founder story, lessons from building the product, and what it takes to grow a local sports brand. Press kit: http://kostyle.ae/presskit",
  },
];

export const AS_SEEN_IN: ReadonlyArray<NamedCopy> = [
  { name: "Post caption", copy: "Kostyle in [outlet]. Thanks to [name or handle] for the feature. Link in our story." },
  { name: "Story line", copy: "We are in [outlet]. Tap to read." },
  { name: "Store trust strip", copy: "A homepage row reading “As seen in” with each outlet’s logo, added as coverage lands." },
];

export type ResultRow = { measure: string; start: string; end: string };

export const RESULTS: ReadonlyArray<ResultRow> = [
  { measure: "Email & WhatsApp list", start: "140", end: "620" },
  { measure: "Store visits / month", start: "1,900", end: "5,400" },
  { measure: "Email open rate", start: "—", end: "41%" },
  { measure: "Content published", start: "0", end: "3 + 12" },
  { measure: "Pages showing in Google", start: "2", end: "14" },
  { measure: "Press placements", start: "0", end: "4" },
];

export type EditableContent = {
  roadmap: RoadmapItem[];
  campaigns: DropPost[];
  quickReplies: QuickReply[];
  winBack: NamedCopy[];
  articles: Article[];
  seo: SeoRow[];
  founderStory: string;
  pressKitUrl: string;
  outreach: OutreachMessage[];
  asSeenIn: NamedCopy[];
  results: ResultRow[];
};

/** Local seed used to create the first Firestore workspace document. */
export const INITIAL_CONTENT: EditableContent = {
  roadmap: ROADMAP.map((item) => ({ ...item })),
  campaigns: DROP_KIT.map((item) => ({ ...item })),
  quickReplies: QUICK_REPLIES.map((item) => ({ ...item })),
  winBack: WIN_BACK.map((item) => ({ ...item })),
  articles: ARTICLES.map((item) => ({ ...item, tags: [...item.tags] })),
  seo: SEO_ROWS.map((item) => ({ ...item })),
  founderStory: FOUNDER_STORY,
  pressKitUrl: PRESS_KIT_URL,
  outreach: OUTREACH.map((item) => ({ ...item })),
  asSeenIn: AS_SEEN_IN.map((item) => ({ ...item })),
  results: RESULTS.map((item) => ({ ...item })),
};
