import { StaticBadge } from "./static.js";
import { NpmVersionBadge } from "./npm-version.js";
import { NpmDownloadsBadge } from "./npm-downloads.js";
import { GhStarsBadge } from "./gh-stars.js";

export const BADGES = [
  new StaticBadge(),
  new NpmVersionBadge(),
  new NpmDownloadsBadge(),
  new GhStarsBadge(),
];
