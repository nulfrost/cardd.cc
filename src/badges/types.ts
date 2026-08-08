import type { Context } from "hono";

export type BadgeData = { label: string; value: string };

export type BadgePreset = { label: string; value: string };

export abstract class Badge {
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract path: string;
  abstract examplePath: string;

  pathParams: { name: string; description: string }[] = [];
  demoPresets: BadgePreset[] = [];

  abstract fetch(c: Context): Promise<BadgeData>;

  onError(err: Error, c: Context): BadgeData {
    return { label: "error", value: err.message };
  }

  get method(): string {
    return "GET";
  }

  buildDemoPath(presetValue: string): string {
    const parts = presetValue.split("/");
    let result = this.path;
    for (let i = 0; i < this.pathParams.length; i++) {
      result = result.replace(`:${this.pathParams[i].name}`, parts[i] ?? "");
    }
    return result;
  }
}
