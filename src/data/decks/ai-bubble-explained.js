// "The AI Bubble, Explained Simply": the text of every slide.
//
// Used for: the alt text of each slide image, and the full text version
// below the viewer (so search engines and screen readers can read the deck).
// Slide images: src/assets/decks/ai-bubble-explained/01.png … 14.png (same order).
//
// Each slide: heading, then any of: intro (paragraphs), items (title + text),
// outro (paragraphs). `alt` is a short description of the image itself.

export default {
  slides: [
    {
      heading: "Everyone talks about the AI bubble.",
      alt: "Cover slide: “Everyone talks about the AI bubble.” Subtitle: here’s what it actually is, and who carries the risk.",
      intro: [
        "Here’s what it actually is, and who carries the risk.",
        "Plain language. No finance degree needed.",
      ],
    },
    {
      heading: "First, what is a “bubble”?",
      alt: "Slide defining a bubble: prices built on expectations that grow faster than reality.",
      intro: ["A bubble is when prices are built on expectations that grow faster than reality."],
      items: [
        {
          title: "It does not mean the technology isn’t real.",
          text: "The internet was real in 2000. Prices just ran ahead of it.",
        },
        {
          title: "So the real question isn’t “Is AI real?”",
          text: "It’s this: will the money come in fast enough to repay what was borrowed?",
        },
      ],
    },
    {
      heading: "Meet the 4 players",
      alt: "Four cards: model labs, Big Tech, builders (marked most exposed) and lenders.",
      items: [
        {
          title: "Player 1: Model labs",
          text: "Build the AI models, like ChatGPT. They have promised to buy huge amounts of computing power for years.",
        },
        {
          title: "Player 2: Big Tech",
          text: "Microsoft, Google, Amazon, Meta. Highly profitable, so they pay for much of their AI building from their own earnings.",
        },
        {
          title: "Player 3: Builders (most exposed)",
          text: "Borrow heavily to build data centers and rent out computing power. Examples include Oracle and CoreWeave.",
        },
        {
          title: "Player 4: Lenders",
          text: "Banks, private credit funds, insurers, pension funds. They lend savers’ money, including yours, directly or through banks and mutual funds.",
        },
      ],
    },
    {
      heading: "Six terms to know",
      alt: "Glossary of six terms: data center, GPU, inference, private credit, collateral and default.",
      items: [
        { title: "Data center", text: "A giant building full of computer chips that run AI." },
        { title: "GPU", text: "The specialized AI chip. Often over half of a data center’s cost." },
        {
          title: "Inference",
          text: "Each time an AI model answers a question or completes a task. This is what customers pay for.",
        },
        {
          title: "Private credit",
          text: "Loans from investment funds instead of banks. Less regulated and less transparent.",
        },
        { title: "Collateral", text: "What a lender can take if the loan isn’t repaid." },
        { title: "Default", text: "When a borrower can’t repay the loan." },
      ],
    },
    {
      heading: "How the bubble builds up (steps 1–3 of 9)",
      alt: "Steps 1 to 3 of 9: the promise, the borrowing, and people’s money.",
      items: [
        {
          title: "1. The promise",
          text: "Model labs promise to buy huge amounts of computing power for years. OpenAI alone has reportedly committed to over $1 trillion in such deals.",
        },
        {
          title: "2. The borrowing",
          text: "Builders take huge loans to build data centers. Lenders lend against those promises.",
        },
        {
          title: "3. People’s money",
          text: "The loan is ultimately other people’s money, through banks, mutual funds, pension funds and insurers. About $3 trillion of data centers are planned through 2028, and roughly half is expected to be financed externally, mostly through loans.",
        },
      ],
    },
    {
      heading: "Where it gets shaky (steps 4–5 of 9)",
      alt: "Steps 4 and 5 of 9: revenue is growing but not fast enough, and the chips age fast.",
      items: [
        {
          title: "4. Revenue is growing, but not fast enough",
          text: "Revenues are increasing as businesses pay for more inference (AI usage). Businesses are cutting costs and putting the savings into AI. But the money coming in is still far below what was promised and borrowed. Demand has not yet reached the level the plans assumed.",
        },
        {
          title: "5. The chips age fast",
          text: "A faster AI chip comes out every year or so, so older chips earn less each year. A loan backed by chips is more like a car loan than a home loan.",
        },
      ],
      outro: ["In short: demand is real. It has not yet reached the planned level."],
    },
    {
      heading: "How it unwinds (steps 6–8 of 9)",
      alt: "Steps 6 to 8 of 9: doubt, money gets expensive, and the most indebted are hit first.",
      items: [
        {
          title: "6. Doubt",
          text: "Investors begin to doubt the growth estimates, and stock prices start coming down. As of November 9, 2026, Oracle was down about 38% for the year and CoreWeave about 32%.",
        },
        {
          title: "7. Money gets expensive",
          text: "Lower share prices make raising new money harder and costlier. Lenders get nervous about lending again.",
        },
        {
          title: "8. The most indebted are hit first",
          text: "Builders with the most debt and the fewest customers may default. Their lenders absorb the losses.",
        },
      ],
    },
    {
      heading: "When a builder defaults (step 8, up close)",
      alt: "Flowchart of what happens when a builder defaults, ending with lenders taking a loss.",
      items: [
        { title: "The model lab pays less than it promised", text: "It cuts orders, renegotiates or can’t pay." },
        {
          title: "The builder tries to rent the data center to someone else",
          text: "If it finds new customers, even at lower prices, the builder survives and earns less, and the chain stops here.",
        },
        {
          title: "If not, the builder defaults",
          text: "Not enough customers, so it can’t make its loan payments. Suing the lab is slow, and a bankrupt lab has little money to pay.",
        },
        {
          title: "Lenders claim the collateral",
          text: "The building and power keep their value and can be rented again. The chips lose value quickly, especially if many holders sell at the same time. The lab contract is worth little if the lab is struggling.",
        },
        {
          title: "Lenders get back only part of the loan: a loss",
          text: "Does the loss spread? See the next slide.",
        },
      ],
      outro: ["Also possible: a builder can default even if the lab pays, when its loans cost more than it earns."],
    },
    {
      heading: "Does it spread? (step 9 of 9)",
      alt: "Step 9 of 9: the loss spreads only if lenders put too much of their money into AI. Two statistics from the Financial Stability Board.",
      intro: [
        "Only if the lenders put too much of their money into AI: too concentrated in one sector.",
      ],
      items: [
        { title: "A little money in AI", text: "The lender absorbs the loss." },
        {
          title: "A lot of money in AI",
          text: "The lender can’t absorb it. It then struggles to repay its own lenders and investors (banks, pension funds, insurers), and the damage moves down the chain.",
        },
        {
          title: "1 in 3",
          text: "Over a third of private credit deals in 2025 were AI-related, up from 17%.",
        },
        { title: "$220B+", text: "Lent or promised by banks to private credit funds." },
      ],
      outro: ["Source: Financial Stability Board, May 2026."],
    },
    {
      heading: "A common misunderstanding",
      alt: "Myth versus reality: company shares are not the guarantee for these loans.",
      items: [
        {
          title: "What many people think",
          text: "Company shares are the guarantee for these loans. When the stock falls, the bank sells the shares, the loans go bad, and the bank goes down.",
        },
        {
          title: "What actually happens",
          text: "Shares aren’t the guarantee. The loans are backed by real things, as slide 8 showed. Falling shares hurt in a different way: they make it harder and costlier to raise money, which is what pushes weak builders toward default.",
        },
      ],
    },
    {
      heading: "If only the builders are fragile, why does the whole market care?",
      alt: "About 45% of the S&P 500’s market value comes from AI-linked companies, with three reasons the whole market cares.",
      intro: [
        "About 45% of the S&P 500’s total market cap comes from AI-linked companies, up from about 25% in 2022 (Goldman Sachs, 2026). Market cap is what the stock market says a company is worth: share price × number of shares.",
      ],
      items: [
        {
          title: "1. Almost half the market depends on AI.",
          text: "If you own an index fund, you are exposed to AI too.",
        },
        {
          title: "2. One company’s spending is another’s income.",
          text: "If builders stop buying, chipmakers and suppliers lose sales.",
        },
        {
          title: "3. A fall would be a timing signal.",
          text: "Prices assume AI pays off soon. A sharp fall in these stocks would be a strong signal that the timeline is longer than expected: AI should still pay off, just not that soon.",
        },
      ],
    },
    {
      heading: "A useful comparison: the 2000 internet-cable boom",
      alt: "The 2000 internet-cable boom in three steps: the overbuild, the bust, and the payoff later.",
      items: [
        {
          title: "1. The overbuild",
          text: "Telecom companies borrowed heavily to lay internet cables, more than demand required at the time.",
        },
        { title: "2. The bust", text: "Many of those companies failed, and their investors lost a lot of money." },
        {
          title: "3. The payoff, later",
          text: "The banking system survived, and those cables were later used as the internet grew.",
        },
      ],
      outro: ["Right technology. Wrong timing."],
    },
    {
      heading: "My view: the risk is real, but it’s not as serious as people say.",
      alt: "Author’s view: a market correction, not a crash. The bubble is in the timing, not the technology.",
      intro: [
        "I expect a market correction, not a crash.",
        "AI is likely to deliver most of what is expected of it, but it may take longer than some labs and builders have planned for.",
        "The bubble isn’t in the technology. It’s in the timing.",
      ],
    },
    {
      heading: "Found this useful?",
      alt: "Closing slide: save and share, with the list of sources and a note that this is for education only.",
      intro: [
        "Save it for later, and share it with someone trying to make sense of the AI bubble.",
      ],
    },
  ],

  // Shown as links under the text version. Add `url` to each one to make it a link;
  // entries without a url are shown as plain text.
  sources: [
    { label: "Financial Stability Board, private credit report (May 2026)", url: "" },
    { label: "Morgan Stanley, data center financing estimates", url: "" },
    { label: "Goldman Sachs, AI’s share of the S&P 500 (2026)", url: "" },
    { label: "Reuters, Axios, Fortune and Morningstar reporting on AI debt and OpenAI’s commitments", url: "" },
    { label: "Stock moves through the Nov 9, 2026 close (Motley Fool, Trefis)", url: "" },
  ],
};
