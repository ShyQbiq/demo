/**
 * Deterministic demo steps – 44 steps matching the master script spreadsheet.
 * Each step defines what appears in all 3 panes + chat messages.
 */

export interface ChatMsg {
  role: "user" | "assistant" | "thinking";
  content: string;
  /** Optional rich content key for special rendering in chat */
  richContent?: string;
}

export interface DemoStep {
  /** New messages added at this step */
  messages: ChatMsg[];
  /** CTA suggestion buttons shown at this step */
  suggestions?: string[];
  /** Route to navigate to (omit = unchanged from previous) */
  route?: string;
  /** Variant key for center pane content (pages interpret this) */
  centerVariant?: string;
  /** Variant key for right pane content (pages interpret this) */
  rightVariant?: string;
  /** If true, auto-advance waits for signalVideoEnd before proceeding */
  waitForVideo?: boolean;
}

export const DEMO_STEPS: DemoStep[] = [
  // ─── Step 1 (index 0): Opening — World map ───
  {
    messages: [
      {
        role: "assistant",
        content: "Hi! What would you like to work on today?",
      },
    ],
    suggestions: [
      "Explore new site",
      "Compare a few available sites",
      "Review portfolio insights",
    ],
    route: "/sites",
    centerVariant: "world-map",
    rightVariant: "global-overview",
  },

  // ─── Step 2 (index 1): Taylor clicks explore ───
  {
    messages: [
      {
        role: "user",
        content: "Explore new site",
      },
    ],
  },

  // ─── Step 3 (index 2): qbiq asks details ───
  {
    messages: [
      {
        role: "assistant",
        content: "For how many people and where?",
      },
    ],
  },

  // ─── Step 4 (index 3): Taylor provides details ───
  {
    messages: [
      {
        role: "user",
        content:
          "I need to explore new sites for a tech company opening a new center in New York City for about 200 employees",
      },
    ],
  },

  // ─── Step 5 (index 4): NYC zoom with pin balloons ───
  {
    messages: [
      {
        role: "assistant",
        content: "Great choice. I've found several matching sites in that area.\n\nHow would you like to continue?",
      },
    ],
    suggestions: [
      "Pick one site to explore in detail",
      "Compare a few sites side by side",
      "Get a quick overview of all available sites",
    ],
    centerVariant: "nyc-zoom",
    rightVariant: "nyc-overview",
  },

  // ─── Step 4 (index 3): John clicks on a pin ───
  {
    messages: [
      { role: "user", content: "Start exploring this site" },
    ],
  },

  // ─── Step 5 (index 4): Loading site — zoom to address ───
  {
    messages: [
      {
        role: "assistant",
        content: "Perfect. I'm loading the site and bringing it into qbiq now.",
      },
    ],
    centerVariant: "building-zoom",
    rightVariant: "site-details",
    suggestions: [
      "Review the site details and constraints",
      "Go back and choose a different site",
    ],
  },

  // ─── Step 6 (index 5): Taylor clicks "Review the site details and constraints" ───
  {
    messages: [
      { role: "user", content: "Review the site details and constraints" },
    ],
  },

  // ─── Step 7 (index 6): Architectural plan analysis — thinking steps ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Loading site info\nLoading building plan\nClassifying building components:\n- Classifying core boundaries\n- Classifying structural elements\n- Classifying facade boundary\n- Classifying window lines\n- Classifying facade non-window lines\n- Identifying mark main entrance\n- Identifying mark egress exits\nAnalyzing planning area",
      },
    ],
    centerVariant: "classifier-video",
    waitForVideo: true,
  },

  // ─── Step 8 (index 7): Site ready — tagged NFP ───
  {
    messages: [
      {
        role: "assistant",
        content: "Your site is ready. Before we move into design, how would you like to define the program for this project?",
      },
    ],
    centerVariant: "tagged-nfp",
    rightVariant: "floor-details",
    suggestions: ["Use your default presets", "Add custom requirements"],
  },

  // ─── Step 9 (index 8): John clicks "Use your default presets" ───
  {
    messages: [
      { role: "user", content: "Use your default presets" },
    ],
  },

  // ─── Step 10 (index 9): Generating program — thinking steps ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Scanning 2,459 similar layouts from your portfolio and market data.\nProgram analysis agents are evaluating workplace programs across multiple typologies.\nValidation agents are cross-checking results against qbiq performance benchmarks.\nRecommendation agents are generating data-driven insights tailored to this project.",
      },
    ],
    route: "/program",
    centerVariant: "program-loading",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 11 (index 10): Program created ───
  {
    messages: [
      {
        role: "assistant",
        content: "Got it. I've created a program based on your standard setup.\n\nHow would you like to proceed?",
      },
    ],
    route: "/program",
    centerVariant: "program-results",
    rightVariant: "program-analysis",
    suggestions: [
      "Move into design",
      "Review or adjust the program",
      "Explore alternative options",
    ],
  },

  // ─── Step 12 (index 11): John writes about open space + conference rooms ───
  {
    messages: [
      {
        role: "user",
        content:
          "Great! Please add more open space and aim to have at least 20 conference rooms",
      },
    ],
  },

  // ─── Step 12b (index 12): Thinking — updating program ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Updating program requirements\nAdding open space allocation\nValidating conference room count\nRecalculating space distribution",
      },
    ],
  },

  // ─── Step 13 (index 13): Program validated and updated ───
  {
    messages: [
      {
        role: "assistant",
        content: "Your program is validated and ready! What would you like to do next?",
      },
    ],
    centerVariant: "program-updated",
    rightVariant: "program-analysis-updated",
    suggestions: ["Start generate designs", "Back to program editing"],
  },

  // ─── Step 14: John clicks "Start generate designs" ───
  {
    messages: [
      { role: "user", content: "Start generate designs" },
    ],
    route: "/designs",
    rightVariant: "",
  },

  // ─── Step 15: Design gen part 1 — Circulation ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Circulation agent activated.\nGenerating CirculationFlex agent revising circulation.",
      },
    ],
    centerVariant: "generating-part-1",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 16: Design gen part 2 — Zoning & Layout ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Soft program agent setting boundries.\nSchematic topology agent generating rules.\nLayout assignment agent setting rooms.\nDynamic policies agent validating.\nFunction assignment agent applying Milp.",
      },
    ],
    centerVariant: "generating-part-2",
    waitForVideo: true,
  },

  // ─── Step 17: Design gen part 3 — Post-process ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Post process agent cleaning up.\nDiscriminator agent applying final touches.",
      },
    ],
    centerVariant: "generating-part-3",
    waitForVideo: true,
  },

  // ─── Step 20 (index 19): Design results — 50 plans, top scored ───
  {
    messages: [
      {
        role: "assistant",
        content:
          "I've created 50 validated plans — here is the top scored plan.\n\nI couldn't fit 20 conference rooms but I kept your desired density ratio.",
      },
    ],
    centerVariant: "design-results",
    rightVariant: "plan-data",
    suggestions: [
      "Take a quick walkthrough",
      "Review the key metrics and assumptions",
    ],
  },

  // ─── Step 21 (index 20): John clicks "Regenerate…" ───
  {
    messages: [
      {
        role: "user",
        content: "Regenerate with more conference rooms and less density",
      },
    ],
  },

  // ─── Step 22a (index 21): Regenerating — dots spinner ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Conference program agent activated. Regenerating the plan using strict conference definitions.\nFlex-density agent engaged. Applying adaptive density rules where allowed.\nSpatial recalculation agents are re-evaluating room placement and adjacencies.\nValidation agents confirming conference room counts.",
      },
    ],
    centerVariant: "regenerating-spinner",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 23 (index 22): Regenerated plan ready ───
  {
    messages: [
      {
        role: "assistant",
        content:
          "Here is your regenerated plan, with 19 conference rooms and density of 90 sqf/person — in alignment with 92% of similar projects of this industry in your selected region.",
      },
    ],
    centerVariant: "design-option-2",
    rightVariant: "plan-data-v2",
  },

  // ─── Step 23b: Taylor asks for plan analysis ───
  {
    messages: [
      { role: "user", content: "Show me plan's analysis" },
    ],
  },

  // ─── Step 23c: qbiq shows plan analysis dashboard ───
  {
    messages: [
      {
        role: "assistant",
        content: "Great! Here is the complete plan analysis.",
      },
    ],
    centerVariant: "plan-analysis-dashboard",
    rightVariant: "",
  },

  // ─── Step 23d: Taylor asks for best study recommendation ───
  {
    messages: [
      {
        role: "user",
        content:
          "Which is the best study for a software company of 200 employees. Explain it to the management so the project can progress.",
      },
    ],
  },

  // ─── Step 23e: qbiq provides study recommendation ───
  {
    messages: [
      {
        role: "assistant",
        content: "I've analyzed all generated studies against your requirements. Here's a focused overview for management review.",
        richContent: "study-recommendation",
      },
    ],
    rightVariant: "",
  },

  // ─── Step 24: John wants a virtual tour ───
  {
    messages: [
      { role: "user", content: "I would like to have a virtual tour" },
    ],
  },

  // ─── Step 24 (index 23): qbiq asks design style ───
  {
    messages: [
      {
        role: "assistant",
        content: "What design style would you like to apply?",
      },
    ],
    suggestions: ["Natural", "Modern", "Industrial"],
  },

  // ─── Step 25 (index 24): John clicks "Natural" ───
  {
    messages: [
      { role: "user", content: "Natural" },
    ],
  },

  // ─── Step 26 (index 25): Rendering video — thinking ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Visualization agent activated. Rendering a video walkthrough of the space.\nMaterial agents are applying wall type selections.\nMaterial agents are applying floor finishes.\nMaterial agents are applying ceiling systems.\nFurniture generation agents are assembling a natural furniture collection for this layout.",
      },
    ],
    route: "/tour",
    centerVariant: "rendering",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 27 (index 26): Video 1 ready ───
  {
    messages: [
      { role: "assistant", content: "Your video is ready." },
    ],
    centerVariant: "video-1",
    rightVariant: "cost-estimation",
  },

  // ─── Step 28 (index 27): John wants IKEA furniture ───
  {
    messages: [
      { role: "user", content: "Show me with MIKEA furniture collection" },
    ],
  },

  // ─── Step 29 (index 28): Rendering video 2 — thinking ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Visualization agent activated. Rendering a video walkthrough of the space.\nMaterial agents are applying wall type selections.\nMaterial agents are applying floor finishes.\nMaterial agents are applying ceiling systems.\nFurniture generation agents are assembling a MIKEA collection for this layout.",
      },
    ],
    centerVariant: "rendering",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 30 (index 29): Video 2 ready ───
  {
    messages: [
      {
        role: "assistant",
        content: "Your video is ready with updated furniture collection.",
      },
    ],
    centerVariant: "video-2",
    rightVariant: "cost-estimation",
  },

  // ─── Step 31 (index 30): John wants low budget ───
  {
    messages: [
      { role: "user", content: "Show me a low budget alternative" },
    ],
  },

  // ─── Step 32 (index 31): Rendering video 3 — thinking ───
  {
    messages: [
      {
        role: "thinking",
        content:
          "Partition management agent activated. Removing glass partitions from the layout.\nCeiling system agent activated. Applying suspended ceiling systems.",
      },
    ],
    centerVariant: "rendering",
    rightVariant: "",
    waitForVideo: true,
  },

  // ─── Step 33 (index 32): Video 3 ready ───
  {
    messages: [
      {
        role: "assistant",
        content: "Your video is ready with affordable finishes.",
      },
    ],
    centerVariant: "video-3",
    rightVariant: "cost-estimation",
  },

  // ─── Step 34 (index 33): John approves design ───
  {
    messages: [
      { role: "user", content: "Great! Design approved" },
    ],
  },

  // ─── Step 35 (index 34): Generate output package? ───
  {
    messages: [
      {
        role: "assistant",
        content:
          "Perfect. Would you like to generate a complete output package?",
      },
    ],
    route: "/deliverables",
    centerVariant: "deliverables-overview",
    rightVariant: "analytics-highlights",
    suggestions: ["Yes!", "No, I want to review more options"],
  },

  // ─── Step 36 (index 35): John clicks "Yes!" ───
  {
    messages: [
      { role: "user", content: "Yes!" },
    ],
  },

  // ─── Step 37 (index 36): Sharing — Revit model ───
  {
    messages: [
      {
        role: "thinking",
        content: "Delivery agent activated. Sending the Revit model to the building architect.",
      },
    ],
    centerVariant: "sharing-1",
    rightVariant: "analytics-highlights",
  },

  // ─── Step 38 (index 37): Sharing — CAD ───
  {
    messages: [
      {
        role: "thinking",
        content: "Delivery agent activated. Sending CAD drawings to the interior designer.",
      },
    ],
    centerVariant: "sharing-2",
  },

  // ─── Step 39 (index 38): Sharing — ESG ───
  {
    messages: [
      {
        role: "thinking",
        content: "Compliance delivery agent activated. Sending the ESG report to the compliance officer.",
      },
    ],
    centerVariant: "sharing-3",
  },

  // ─── Step 40 (index 39): Sharing — BOQ ───
  {
    messages: [
      {
        role: "thinking",
        content: "Construction delivery agent activated. Sending the bill of quantities to the general contractor.",
      },
    ],
    centerVariant: "sharing-4",
  },

  // ─── Step 41 (index 40): Sharing — Visual assets ───
  {
    messages: [
      {
        role: "thinking",
        content: "Marketing delivery agent activated. Sending visual assets to the marketing manager.",
      },
    ],
    centerVariant: "sharing-5",
  },

  // ─── Step 42 (index 41): Confirmed delivery — save to portfolio? ───
  {
    messages: [
      {
        role: "assistant",
        content:
          "Confirmed outputs' delivery. Would you like to save this project to your portfolio?",
      },
    ],
    suggestions: ["Yes!", "No, I want to review more options"],
  },

  // ─── Step 43 (index 42): John clicks "Yes!" ───
  {
    messages: [
      { role: "user", content: "Yes!" },
    ],
  },

  // ─── Step 44 (index 43): Final — saved to portfolio ───
  {
    messages: [
      {
        role: "assistant",
        content:
          "Wonderful! Your project was saved in your portfolio.\n\nIs there anything else I can assist you with?",
      },
    ],
    route: "/sites",
    centerVariant: "world-map-new-pin",
    rightVariant: "global-overview",
  },
];
