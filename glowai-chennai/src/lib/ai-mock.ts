// Mock AI responses — ready to swap for Lovable AI Gateway / Gemini API.
import { salons } from "@/data/salons";
import type { Salon } from "@/types";

export async function aiMatchmaker(query: string): Promise<{ reasoning: string; matches: Salon[] }> {
  await new Promise(r => setTimeout(r, 900));
  const q = query.toLowerCase();
  const budgetMatch = q.match(/(\d{3,6})/);
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : undefined;
  const wantsBridal = /brid|wedding|marriage/.test(q);
  const wantsHair = /hair|spa|smoothen|kerat/.test(q);
  const wantsStudent = /student|cheap|budget|afford/.test(q);
  const wantsArea = ["t nagar","anna nagar","velachery","adyar","mylapore","besant","nungam","omr"].find(a => q.includes(a));

  const scored = salons.map(s => {
    let score = 0;
    if (wantsBridal && s.tags.some(t => t === "Bridal")) score += 5;
    if (wantsHair && s.services.some(x => x.category === "Hair")) score += 3;
    if (wantsStudent && s.tags.includes("Student-friendly")) score += 5;
    if (wantsArea && s.area.toLowerCase().includes(wantsArea)) score += 4;
    if (budget && s.services.some(x => x.price <= budget)) score += 3;
    score += s.rating;
    return { s, score };
  }).sort((a,b) => b.score - a.score).slice(0, 3);

  const reasoning = `Based on "${query}", I prioritized ${
    [
      wantsBridal && "bridal expertise",
      wantsHair && "hair specialists",
      wantsStudent && "student-friendly pricing",
      wantsArea && `salons near ${wantsArea}`,
      budget && `services under ₹${budget}`,
    ].filter(Boolean).join(", ") || "top-rated salons matching your style"
  }. Here are my top picks:`;

  return { reasoning, matches: scored.map(x => x.s) };
}

export async function aiBeautyAdvisor(question: string): Promise<string> {
  await new Promise(r => setTimeout(r, 800));
  const q = question.toLowerCase();
  if (/oily skin|acne/.test(q)) {
    return `For oily / acne-prone skin in Chennai's humidity:\n\n• **Salicylic acid facial** every 3 weeks to unclog pores\n• Lightweight gel moisturizer with niacinamide\n• Clay mask 2× per week\n• SPF 50 PA+++ daily — non-comedogenic\n\nAvoid heavy creams and over-cleansing. Try the **Anti-Acne Facial** at Bloom Beauty Studio.`;
  }
  if (/hair fall|thin/.test(q)) {
    return `Hair fall is often Chennai's hard-water + heat. Try:\n\n• **Scalp detox + protein hair spa** monthly\n• Onion-biotin serum 3× per week\n• Silk pillowcase, no tight ties when wet\n• Iron, zinc, vitamin D bloodwork if it persists 8+ weeks\n\nNaturals Lounge and Enrich both offer good scalp treatments.`;
  }
  if (/wedding|bridal/.test(q)) {
    return `**Bridal prep timeline (6 weeks out):**\n\n• Week 6: trial facial + hair treatment\n• Week 4: full body polish, fitness lock-in\n• Week 2: brow shape + manicure trial\n• Week 1: hydration facial, no new products\n• Day before: blowout + early sleep\n\nBlush by Shreya and Lakmé Signature both run great trial packages.`;
  }
  return `Great question. A few principles:\n\n• Match treatments to your **skin/hair type**, not trends\n• Frequency > intensity — gentle weekly beats harsh monthly\n• Hydration & SPF outperform 90% of premium serums\n\nTell me more about your concern and I'll tailor a routine.`;
}

export async function aiRoutineGenerator(input: { skinType: string; goals: string }): Promise<{ daily: string[]; weekly: string[]; monthly: string[] }> {
  await new Promise(r => setTimeout(r, 700));
  return {
    daily: [
      "Gentle cleanser (AM + PM)",
      "Vitamin C serum (AM)",
      "Lightweight moisturizer + SPF 50 (AM)",
      "Niacinamide + ceramide moisturizer (PM)",
      "5-min facial massage with rose oil",
    ],
    weekly: [
      "Exfoliate with PHA toner (2× week)",
      "Clay or hydrating mask (1× week)",
      "Hair oil overnight treatment",
      "Deep conditioning hair mask",
      "Lip & eye-area treatment",
    ],
    monthly: [
      "Professional facial matching your skin type",
      "Hair spa or scalp detox at a trusted salon",
      "Manicure + pedicure refresh",
      "Brow shape & tint",
      "Body polish or massage day",
    ],
  };
}

export const styleInspiration = {
  Hairstyles: [
    { name: "Boho Bridal Braid", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80" },
    { name: "Korean Hime Cut", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80" },
    { name: "Curtain Bangs", image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=600&q=80" },
    { name: "Long Layered Waves", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80" },
  ],
  Makeup: [
    { name: "Glass Skin Glow", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80" },
    { name: "Smokey Bronze", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80" },
    { name: "Soft Bridal Glam", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80" },
    { name: "Editorial Graphic Liner", image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80" },
  ],
  Bridal: [
    { name: "South Indian Silk Bride", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80" },
    { name: "Pastel Lehenga Look", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80" },
    { name: "Modern Minimal Bride", image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80" },
    { name: "Royal Maroon Glam", image: "https://images.unsplash.com/photo-1522335789203-aaa0c4d518cb?w=600&q=80" },
  ],
  Grooming: [
    { name: "Sharp Skin Fade", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80" },
    { name: "Sculpted Beard", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80" },
    { name: "Textured Crop", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&q=80" },
    { name: "Classic Pompadour", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80" },
  ],
};

export const beautyTrends = [
  { title: "Glass Skin Movement", desc: "Korean-inspired dewy, poreless finish using layered hydration.", change: "+128%", emoji: "✨" },
  { title: "Hair Botox Treatments", desc: "Deep protein restoration without harsh chemicals.", change: "+94%", emoji: "💆‍♀️" },
  { title: "Sustainable Beauty", desc: "Refill packaging, vegan formulas, zero-waste salons.", change: "+71%", emoji: "🌱" },
  { title: "Personalized AI Skincare", desc: "Routines built from quiz + photo analysis.", change: "+65%", emoji: "🤖" },
  { title: "Soft Glam Makeup", desc: "Replacing heavy contour with luminous, blurred finish.", change: "+58%", emoji: "🌸" },
  { title: "Scalp-First Hair Care", desc: "Treating the scalp like a skin barrier for long-term hair health.", change: "+44%", emoji: "🌿" },
];
