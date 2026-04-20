// G.I. GUARDIAN — Safety & Compliance Engine
// Blocks illegal, harmful, unsafe, or copyrighted content.

import { GiGuardianResult, GiLanguageInfo } from "../types";

export function runGiGuardian(
  message: string,
  lang: GiLanguageInfo
): GiGuardianResult {
  const lower = message.toLowerCase();

  // ---------- ILLEGAL / HARMFUL ----------
  const illegalPatterns = [
    "hack",
    "ddos",
    "illegal",
    "sell drugs",
    "make a bomb",
    "bypass security",
    "steal",
    "fraud",
    "crime",
  ];

  for (const pattern of illegalPatterns) {
    if (lower.includes(pattern)) {
      return {
        allowed: false,
        reason: "illegal_or_unsafe",
        policy: "no_illegal_or_harmful_content",
      };
    }
  }

  // ---------- SELF-HARM / VIOLENCE ----------
  const dangerPatterns = [
    "kill myself",
    "hurt myself",
    "suicide",
    "end my life",
    "kill someone",
    "hurt someone",
  ];

  for (const pattern of dangerPatterns) {
    if (lower.includes(pattern)) {
      return {
        allowed: false,
        reason: "self_harm_or_violence",
        policy: "no_self_harm_or_violence",
      };
    }
  }

  // ---------- COPYRIGHT ----------
  const copyrightTriggers = [
    "full lyrics",
    "full song",
    "full book",
    "full script",
    "full chapter",
    "full article",
  ];

  for (const pattern of copyrightTriggers) {
    if (lower.includes(pattern)) {
      return {
        allowed: false,
        reason: "copyright",
        policy: "no_full_protected_content",
      };
    }
  }

  // ---------- DEVICE SAFETY ----------
  const deviceDanger = [
    "format drive",
    "wipe system",
    "delete system32",
    "factory reset",
    "erase everything",
  ];

  for (const pattern of deviceDanger) {
    if (lower.includes(pattern)) {
      return {
        allowed: false,
        reason: "device_safety",
        policy: "no_dangerous_device_actions",
      };
    }
  }

  // ---------- ALLOWED ----------
  return { allowed: true };
}

