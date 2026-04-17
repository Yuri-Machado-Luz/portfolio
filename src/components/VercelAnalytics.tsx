import { QuartzComponentConstructor } from "./types";

function VercelAnalytics() {
  // Vercel Analytics script for static deployments.
  return <script defer src="/_vercel/insights/script.js"></script>;
}

export default (() => VercelAnalytics) satisfies QuartzComponentConstructor;
