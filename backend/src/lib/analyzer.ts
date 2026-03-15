export type HalalStatus = "halal" | "haram" | "doubtful" | "unknown";

export interface FlaggedIngredient {
  matched: string;
  keyword: string;
  status: "haram" | "doubtful";
  reason: string;
  eNumber?: string;
}

export interface IngredientAnalysis {
  status: HalalStatus;

  verdictTier:
    | "certified-safe"
    | "contains-haram"
    | "needs-verification"
    | "unverified"
    | "unknown";
  verdictNote: string;
  reasons: string[];
  flaggedIngredients: FlaggedIngredient[];
  isValidIngredientList: boolean;
  validationMessage?: string;
}

interface Rule {
  keywords: string[];
  status: "haram" | "doubtful";
  reason: string;
  eNumber?: string;
  halalOverrideContext?: string[];
  haramUpgradeContext?: string[];
}

const RULES: Rule[] = [
  {
    keywords: [
      "alcohol",
      "ethanol",
      "ethyl alcohol",
      "alkol",
      "etil alkol",
      "isopropanol",
      "methanol",
    ],
    status: "haram",
    reason: "Contains alcohol",
  },
  {
    keywords: [
      "wine",
      "şarap",
      "beer",
      "bira",
      "spirits",
      "vodka",
      "rum",
      "whiskey",
      "liqueur",
    ],
    status: "haram",
    reason: "Contains alcoholic beverage derivative",
  },
  {
    keywords: ["fermented", "fermente"],
    status: "doubtful",
    reason: "Fermented ingredient — alcohol content unclear",
  },

  {
    keywords: [
      "pork",
      "domuz",
      "pig",
      "swine",
      "ham",
      "bacon",
      "lard",
      "prosciutto",
      "pancetta",
      "salami",
      "chorizo",
      "pepperoni",
    ],
    status: "haram",
    reason: "Contains pork or pork derivative",
  },
  {
    keywords: ["pork gelatin", "porcine gelatin", "domuz jelatini"],
    status: "haram",
    reason: "Contains pork-derived gelatin",
    eNumber: "E441",
  },
  {
    keywords: ["pork fat", "domuz yağı"],
    status: "haram",
    reason: "Contains pork fat",
  },

  {
    keywords: ["gelatin", "gelatine", "jelatin"],
    status: "doubtful",
    reason: "Gelatin source unspecified — may be porcine or bovine",
    eNumber: "E441",
    halalOverrideContext: [
      "fish",
      "balık",
      "vegetable",
      "bitkisel",
      "plant",
      "agar",
      "bovine certified",
      "beef",
      "halal",
    ],
    haramUpgradeContext: ["pork", "pig", "porcine", "domuz"],
  },

  {
    keywords: [
      "e120",
      "e-120",
      "e 120",
      "carmine",
      "cochineal",
      "karmin",
      "ci 75470",
      "carminic acid",
      "crimson lake",
      "natural red 4",
    ],
    status: "haram",
    reason: "Carmine (E120) is derived from insects",
    eNumber: "E120",
  },
  {
    keywords: ["e904", "e-904", "e 904", "shellac"],
    status: "haram",
    reason: "E904 (Shellac) is an insect-derived resin",
    eNumber: "E904",
  },

  {
    keywords: ["e441", "e-441", "e 441"],
    status: "haram",
    reason: "E441 is pork gelatin",
    eNumber: "E441",
  },
  {
    keywords: [
      "e542",
      "e-542",
      "e 542",
      "bone phosphate",
      "edible bone phosphate",
    ],
    status: "haram",
    reason: "E542 is derived from animal bones, often porcine",
    eNumber: "E542",
  },

  {
    keywords: ["e910", "e-910", "e 910", "l-cysteine", "l cysteine", "sistein"],
    status: "doubtful",
    reason:
      "L-Cysteine (E910) can be derived from pork or human hair — source must be verified",
    eNumber: "E910",
  },
  {
    keywords: ["e966", "e-966", "e 966", "lactitol"],
    status: "doubtful",
    reason:
      "Lactitol (E966) is dairy-derived — generally considered halal but source should be confirmed",
    eNumber: "E966",
  },
  {
    keywords: [
      "e322",
      "e-322",
      "e 322",
      "lecithin",
      "lesitin",
      "soya lecithin",
    ],
    status: "doubtful",
    reason:
      "Lecithin (E322) source unspecified — may be soy (halal) or animal-derived",
    eNumber: "E322",
    halalOverrideContext: ["soy", "soya", "sunflower", "ayçiçeği", "rapeseed"],
    haramUpgradeContext: ["pork", "animal", "porcine"],
  },
  {
    keywords: [
      "e422",
      "e-422",
      "e 422",
      "glycerol",
      "glycerin",
      "gliserin",
      "glycerine",
    ],
    status: "doubtful",
    reason:
      "Glycerol (E422) can be animal or plant-derived — source unspecified",
    eNumber: "E422",
    halalOverrideContext: ["vegetable", "bitkisel", "plant", "palm", "coconut"],
    haramUpgradeContext: ["pork", "animal", "porcine"],
  },
  {
    keywords: [
      "e470",
      "e-470",
      "e 470",
      "e471",
      "e-471",
      "e 471",
      // FIX #8: added E472 sub-variants
      "e472",
      "e-472",
      "e 472",
      "e472a",
      "e472b",
      "e472c",
      "e472d",
      "e472e",
      "mono and diglycerides",
      "mono- and diglycerides",
      "monoglycerides",
      "diglycerides",
      "mono ve digliseridler",
    ],
    status: "doubtful",
    reason: "Mono/diglycerides (E470–E472) can be animal or plant-derived",
    eNumber: "E471",
    halalOverrideContext: [
      "vegetable",
      "bitkisel",
      "plant",
      "sunflower",
      "palm",
    ],
    haramUpgradeContext: ["pork", "animal", "porcine", "lard"],
  },
  {
    keywords: ["e481", "e-481", "e 481", "sodium stearoyl lactylate", "ssl"],
    status: "doubtful",
    reason: "E481 may be derived from animal fats",
    eNumber: "E481",
  },
  {
    keywords: ["e482", "e-482", "e 482", "calcium stearoyl lactylate"],
    status: "doubtful",
    reason: "E482 may be derived from animal fats",
    eNumber: "E482",
  },
  {
    keywords: ["e491", "e-491", "e 491", "sorbitan monostearate"],
    status: "doubtful",
    reason: "E491 stearic acid component may be animal-derived",
    eNumber: "E491",
  },

  {
    keywords: ["e903", "e-903", "e 903", "carnauba wax", "carnauba"],
    status: "doubtful",
    reason:
      "Carnauba wax (E903) is plant-derived but may be processed with animal-derived solvents — verify source",
    eNumber: "E903",
  },

  {
    keywords: [
      "natural flavor",
      "natural flavors",
      "natural flavouring",
      "natural flavourings",
      "aroma",
      "doğal aroma",
      "aroma vericiler",
      "natural aroma",
    ],
    status: "doubtful",
    reason: "Natural flavors — source and alcohol carrier not disclosed",
  },
  {
    keywords: [
      "artificial flavor",
      "artificial flavors",
      "artificial flavouring",
    ],
    status: "doubtful",
    reason:
      "Artificial flavors — carrier solvent (often alcohol) not disclosed",
  },

  {
    keywords: ["vanilla extract", "vanilya ekstresi"],
    status: "doubtful",
    reason:
      "Vanilla extract typically uses an alcohol carrier — halal status depends on production method",
    halalOverrideContext: ["alcohol-free", "non-alcoholic", "halal"],
  },

  {
    keywords: ["rennet", "animal rennet"],
    status: "doubtful",
    reason:
      "Rennet source unspecified — animal rennet requires halal slaughter",
    halalOverrideContext: ["microbial", "vegetable", "vegetarian", "bitkisel"],
    haramUpgradeContext: ["pork", "porcine"],
  },

  {
    keywords: ["blood", "kan", "blood plasma", "plasma", "blood products"],
    status: "haram",
    reason: "Blood and blood products are forbidden in Islamic dietary law",
  },

  {
    keywords: ["tallow", "suet", "animal fat", "hayvansal yağ"],
    status: "doubtful",
    reason: "Animal fat — halal status depends on source and slaughter method",
    haramUpgradeContext: ["pork", "pig", "porcine", "domuz"],
  },
  {
    keywords: ["shortening", "margarine"],
    status: "doubtful",
    reason: "Shortening/margarine may contain animal-derived fats",
    halalOverrideContext: ["vegetable", "bitkisel", "plant"],
  },

  {
    keywords: ["enzymes", "enzimler", "lipase", "protease", "amylase"],
    status: "doubtful",
    reason: "Enzymes — may be animal-derived depending on source",
    halalOverrideContext: ["microbial", "fungal", "vegetable", "bitkisel"],
  },

  {
    keywords: ["pepsin"],
    status: "doubtful",
    reason:
      "Pepsin is a gastric enzyme commonly derived from porcine sources — source must be verified",
    haramUpgradeContext: ["pork", "porcine", "pig"],
  },

  {
    keywords: ["collagen", "kolajen"],
    status: "doubtful",
    reason: "Collagen source (bovine/porcine) unspecified",
    halalOverrideContext: ["fish", "marine", "balık", "plant"],
    haramUpgradeContext: ["pork", "porcine", "domuz"],
  },
  {
    keywords: ["isinglass"],
    status: "doubtful",
    reason:
      "Isinglass is fish-derived — halal by source but processing concerns",
  },

  {
    keywords: ["whey", "peynir altı suyu"],
    status: "doubtful",
    reason:
      "Whey is dairy-derived — generally halal but source and rennet used in processing should be confirmed",
    halalOverrideContext: ["halal certified", "halal"],
  },
  {
    keywords: ["casein", "kazein", "caseinate"],
    status: "doubtful",
    reason:
      "Casein is dairy-derived — generally halal but source should be confirmed",
    halalOverrideContext: ["halal certified", "halal"],
  },

  {
    keywords: ["l-carnitine", "l carnitine", "carnitine"],
    status: "doubtful",
    reason:
      "L-Carnitine can be derived from animal muscle tissue — verify source is plant-based or synthetic",
    halalOverrideContext: ["synthetic", "plant", "vegetable", "fermentation"],
  },
];

const INGREDIENT_SIGNAL_WORDS = [
  "sugar",
  "salt",
  "water",
  "flour",
  "oil",
  "starch",
  "syrup",
  "extract",
  "acid",
  "vitamin",
  "mineral",
  "flavor",
  "colour",
  "color",
  "preservative",
  "emulsifier",
  "stabilizer",
  "thickener",
  "antioxidant",
  "powder",
  "milk",
  "wheat",
  "corn",
  "soy",
  "palm",
  "sunflower",
  "cocoa",
  "vanilla",
  // Turkish
  "şeker",
  "tuz",
  "su",
  "un",
  "yağ",
  "nişasta",
  "asit",
  "vitamin",
  "mineral",
  "renk",
  "boya",
  "koruyucu",
  "emülgatör",
  "tatlandırıcı",
  "buğday",
  "mısır",
  "soya",
  "kakao",
  "vanilin",
];

const E_NUMBER_PATTERN = /\be-?\d{3,4}[a-z]?\b/i;
const PERCENTAGE_PATTERN = /\d+(\.\d+)?%/;
const SEPARATOR_PATTERN = /[,;]/;

const PROSE_STARTERS = /^(the|this|i |we |it |our |my |these|those|a |an )/i;
const QUESTION_MARK_PATTERN = /\?/;

const ALL_RULE_KEYWORDS: string[] = RULES.flatMap((r) => r.keywords);

function isKnownIngredient(lower: string): boolean {
  return ALL_RULE_KEYWORDS.some((kw) => {
    const kwLower = kw.toLowerCase();
    if (!kwLower.includes(" ")) {
      return new RegExp(`\\b${kwLower}\\b`).test(lower);
    }
    return lower.includes(kwLower);
  });
}

function isValidIngredientList(text: string): {
  valid: boolean;
  message?: string;
} {
  const lower = text.toLowerCase().trim();

  if (lower.length < 2) {
    return { valid: false, message: "Input is too short." };
  }

  if (QUESTION_MARK_PATTERN.test(lower) || PROSE_STARTERS.test(lower)) {
    return {
      valid: false,
      message:
        "This looks like a sentence or question, not an ingredient list.",
    };
  }

  if (isKnownIngredient(lower)) {
    return { valid: true };
  }

  const hasSignalWord = INGREDIENT_SIGNAL_WORDS.some((w) => lower.includes(w));
  const hasENumber = E_NUMBER_PATTERN.test(lower);
  const hasPercentage = PERCENTAGE_PATTERN.test(lower);
  const hasSeparators = SEPARATOR_PATTERN.test(lower);

  const signalCount = [
    hasSignalWord,
    hasENumber,
    hasPercentage,
    hasSeparators,
  ].filter(Boolean).length;

  if (signalCount === 0) {
    return {
      valid: false,
      message:
        "This doesn't appear to be an ingredient or ingredient list. Please enter an ingredient name or paste the ingredients from a product label.",
    };
  }

  return { valid: true };
}

function getContextWindow(
  text: string,
  matchIndex: number,
  windowSize = 40,
): string {
  const start = Math.max(0, matchIndex - windowSize);
  const end = Math.min(text.length, matchIndex + windowSize);
  return text.slice(start, end).toLowerCase();
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0,
    ),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function fuzzyMatch(token: string, keyword: string): boolean {
  if (keyword.includes(" ")) {
    return token.includes(keyword);
  }

  if (keyword.length <= 6) {
    return token === keyword || token.includes(keyword);
  }

  const maxDist = keyword.length <= 8 ? 1 : 2;
  return levenshtein(token, keyword) <= maxDist || token.includes(keyword);
}

interface Token {
  text: string;
  index: number; // position in the lowercased source string
}

function tokenize(lower: string): Token[] {
  const tokens: Token[] = [];

  const delimPattern = /[,;()[\]/\n]/g;
  let lastEnd = 0;

  const pushSegment = (segment: string, offset: number) => {
    const trimmed = segment.trim();
    if (trimmed.length > 1) {
      const innerOffset = segment.indexOf(trimmed);
      tokens.push({ text: trimmed, index: offset + innerOffset });
    }
  };

  let match: RegExpExecArray | null;
  while ((match = delimPattern.exec(lower)) !== null) {
    pushSegment(lower.slice(lastEnd, match.index), lastEnd);
    lastEnd = match.index + 1;
  }
  pushSegment(lower.slice(lastEnd), lastEnd);

  return tokens;
}

export function analyzeIngredients(rawText: string): IngredientAnalysis {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  const validation = isValidIngredientList(text);
  if (!validation.valid) {
    return {
      isValidIngredientList: false,
      validationMessage: validation.message,
      status: "unknown",
      verdictTier: "unknown",
      verdictNote:
        "Could not analyse — input does not appear to be an ingredient list.",
      reasons: [],
      flaggedIngredients: [],
    };
  }

  const tokens = tokenize(lower);

  const flagged: FlaggedIngredient[] = [];

  const consumedRanges: Array<[number, number]> = [];

  function isOverlappingConsumed(index: number, length: number): boolean {
    const end = index + length;
    return consumedRanges.some(([cs, ce]) => index < ce && end > cs);
  }

  for (const rule of RULES) {
    for (const keyword of rule.keywords) {
      const keywordLower = keyword.toLowerCase();
      const directIndex = lower.indexOf(keywordLower);

      let matched: string | null = null;
      let matchIndex = -1;

      if (directIndex !== -1) {
        matched = keyword;
        matchIndex = directIndex;
      } else {
        for (const token of tokens) {
          if (fuzzyMatch(token.text, keywordLower)) {
            matched = token.text;
            matchIndex = token.index;
            break;
          }
        }
      }

      if (!matched || matchIndex === -1) continue;

      if (isOverlappingConsumed(matchIndex, matched.length)) continue;

      const context = getContextWindow(lower, matchIndex, 60);

      let effectiveStatus = rule.status;

      if (rule.haramUpgradeContext?.some((ctx) => context.includes(ctx))) {
        effectiveStatus = "haram";
      } else if (
        effectiveStatus === "doubtful" &&
        rule.halalOverrideContext?.some((ctx) => context.includes(ctx))
      ) {
        consumedRanges.push([matchIndex, matchIndex + matched.length]);
        continue;
      }

      flagged.push({
        matched,
        keyword,
        status: effectiveStatus,
        reason: rule.reason,
        eNumber: rule.eNumber,
      });

      consumedRanges.push([matchIndex, matchIndex + matched.length]);

      break;
    }
  }

  const haramItems = flagged.filter((f) => f.status === "haram");
  const doubtfulItems = flagged.filter((f) => f.status === "doubtful");

  let status: HalalStatus;

  if (haramItems.length > 0) {
    status = "haram";
  } else if (doubtfulItems.length > 0) {
    status = "doubtful";
  } else {
    status = "halal";
  }

  type VerdictTier = IngredientAnalysis["verdictTier"];
  let verdictTier: VerdictTier;
  let verdictNote: string;

  const isSingleKnownSafeIngredient =
    tokens.length <= 1 &&
    (isKnownIngredient(lower) ||
      INGREDIENT_SIGNAL_WORDS.some((w) => lower.includes(w)));

  if (status === "haram") {
    verdictTier = "contains-haram";
    verdictNote =
      "One or more ingredients are considered haram under Islamic dietary law.";
  } else if (status === "doubtful") {
    verdictTier = "needs-verification";
    verdictNote =
      "One or more ingredients require further verification. Check for halal certification or contact the manufacturer.";
  } else {
    verdictTier = isSingleKnownSafeIngredient ? "certified-safe" : "unverified";
    verdictNote = isSingleKnownSafeIngredient
      ? "No known haram ingredients detected."
      : "No known haram or doubtful ingredients detected, but halal status cannot be fully guaranteed without official certification.";
  }

  const reasons: string[] = [];

  if (haramItems.length > 0) {
    const names = [...new Set(haramItems.map((i) => i.matched))].join(", ");
    reasons.push(`Haram ingredient(s) detected: ${names}`);
  }

  if (doubtfulItems.length > 0) {
    const names = [...new Set(doubtfulItems.map((i) => i.matched))].join(", ");
    reasons.push(`Doubtful ingredient(s) require verification: ${names}`);
  }

  if (status === "halal") {
    reasons.push("No known haram or doubtful ingredients detected.");
    reasons.push(
      "Note: halal status cannot be fully guaranteed without certification.",
    );
  }

  return {
    isValidIngredientList: true,
    status,
    verdictTier,
    verdictNote,
    reasons,
    flaggedIngredients: flagged,
  };
}
