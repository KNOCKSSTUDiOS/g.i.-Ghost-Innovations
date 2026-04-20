// G.I. TYPES — Shared Interfaces & Type Definitions

// ---------- Roles & Tiers ----------
export type GiRole = "FOUNDER" | "ADMIN" | "CREATOR" | "CONTROL" | "ASSIST";
export type GiTier = "ASSIST" | "CONTROL" | "CREATOR" | "OEM";

// ---------- Voices ----------
export type GiVoice =
  | "GI_ALPHA"
  | "GI_NOVA"
  | "GI_ECHO"
  | "GI_FLUX"
  | "GI_REBEL";

// ---------- Client ----------
export interface GiClient {
  engine_id: string;
  device_id: string;
  platform?: string;
}

// ---------- User ----------
export interface GiUser {
  user_id: string;
  role?: GiRole;
  subscription_token?: string;
}

// ---------- Context ----------
export interface GiContext {
  mode?: "assist" | "control" | "creator";
  project?: string;
  voice?: GiVoice;
}

// ---------- Request Body ----------
export interface GiRequestBody {
  gi_version: string;
  gi_client: GiClient;
  gi_user: GiUser;
  gi_context?: GiContext;
  gi_message: string;
}

// ---------- Identity ----------
export interface GiIdentity {
  user_id: string;
  role: GiRole;
  tier: GiTier;
  status: "ACTIVE" | "INACTIVE";
  expires: string | "NEVER";
  permissions: string[];
}

// ---------- Language ----------
export interface GiLanguageInfo {
  language: string;
  confidence: number;
}

// ---------- Guardian ----------
export interface GiGuardianResult {
  allowed: boolean;
  reason?: string;
  policy?: string;
}

// ---------- Router ----------
export interface GiModelRoute {
  model: string;
  provider: string;
}

// ---------- Actions ----------
export type GiActionType =
  | "OPEN_APP"
  | "SHOW_STEPS"
  | "RUN_ENGINE_MODULE"
  | "CREATE_BLUEPRINT"
  | "GENERATE_ASSET_LINK";

export interface GiAction {
  type: GiActionType;
  id?: string;
  label?: string;
  steps?: string[];
  module?: string;
  params?: Record<string, unknown>;
  target?: string;
}

// ---------- Meta ----------
export interface GiMeta {
  tier: GiTier;
  role: GiRole;
  tokens_used?: number;
  mode?: GiContext["mode"];
  language?: string;
}

// ---------- Response ----------
export interface GiResponseBody {
  gi_reply: string;
  gi_actions: GiAction[];
  gi_meta: GiMeta;
}

