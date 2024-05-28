import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Champions League RI",
    short_name: "CLRI",
    icons: [
      {
        src: "/icons/logo.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/logo.webp",
        sizes: "384x384",
        type: "image/webp",
      },
      {
        src: "/icons/logo.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
    theme_color: "#1F2937", // Updated theme color
    background_color: "#FFFFFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    share_target: {
      action: "api/scorecard",
      method: "post",
      enctype: "multipart/form-data",
      files: [
        {
          name: "scorecard",
          accept: ["text/csv", ".csv"],
        },
      ],
    },
  };
}
