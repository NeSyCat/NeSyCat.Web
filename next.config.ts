import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // While the site is parked, point the nesycat.org host straight at the
  // NeSyCat Torch paper. Scoped to that host so the deployment still serves
  // normally on its *.vercel.app URLs. Temporary (307) → reversible: remove
  // this block to bring the site back at nesycat.org.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "nesycat.org" }],
        destination: "https://arxiv.org/abs/2606.19279",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
