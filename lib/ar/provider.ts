import type { ARStatus, GarmentCategory } from "@/lib/types";

export interface ARGenerateInput {
  customerPhoto: string; // object URL / data URL in the prototype
  garmentPhoto: string;
  category: GarmentCategory;
  customerType?: "Male" | "Female";
  productId?: string;
  customerId?: string;
}

export interface ARResult {
  id: string;
  status: ARStatus;
  resultUrl: string;
  variants: string[];
  provider: string;
  creditCost: number;
  createdAt: string;
}

export interface ARProgress {
  pct: number;
  label: string;
}

export interface ARProvider {
  name: string;
  generate(input: ARGenerateInput, onProgress?: (p: ARProgress) => void): Promise<ARResult>;
  getStatus(id: string): Promise<ARStatus>;
}

const STAGES = [
  { pct: 12, label: "Analyzing body pose" },
  { pct: 34, label: "Segmenting garment" },
  { pct: 58, label: "Mapping fabric drape" },
  { pct: 79, label: "Rendering try-on" },
  { pct: 94, label: "Upscaling preview" },
  { pct: 100, label: "Done" },
];

// Deterministic placeholder previews (gradient SVGs) so no network/model is needed.
function placeholderPreview(seed: string): string {
  const hues = ["#9b99fe", "#6366f1", "#2bc8b7", "#c084fc", "#38bdf8"];
  const a = hues[seed.charCodeAt(0) % hues.length];
  const b = hues[(seed.charCodeAt(1) || 3) % hues.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='800'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
    <rect width='640' height='800' fill='#0a0a0a'/>
    <rect width='640' height='800' fill='url(#g)' opacity='0.18'/>
    <circle cx='320' cy='300' r='150' fill='url(#g)' opacity='0.5'/>
    <rect x='220' y='360' width='200' height='340' rx='40' fill='url(#g)' opacity='0.65'/>
    <text x='320' y='760' fill='#fff' font-family='sans-serif' font-size='26' text-anchor='middle' opacity='0.8'>AR Preview</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export class MockARProvider implements ARProvider {
  name = "wearbefore-mock-v1";

  async generate(input: ARGenerateInput, onProgress?: (p: ARProgress) => void): Promise<ARResult> {
    for (const stage of STAGES) {
      await new Promise((r) => setTimeout(r, 420));
      onProgress?.(stage);
    }
    const id = `arg_${Math.random().toString(36).slice(2, 10)}`;
    return {
      id,
      status: "ready",
      resultUrl: placeholderPreview(input.category),
      variants: [
        placeholderPreview(input.category + "1"),
        placeholderPreview(input.category + "2"),
        placeholderPreview(input.category + "3"),
      ],
      provider: this.name,
      creditCost: 1,
      createdAt: new Date().toISOString(),
    };
  }

  async getStatus(): Promise<ARStatus> {
    return "ready";
  }
}

// Swap this for a real provider later without touching UI code.
export const arProvider: ARProvider = new MockARProvider();
