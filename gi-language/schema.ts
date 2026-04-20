export interface GiLanguageOperation {
  id: string;
  type: "translate" | "summarize" | "rewrite" | "tone" | "style";
  input: string;
  output: string;
  metadata?: any;
  created: number;
}

