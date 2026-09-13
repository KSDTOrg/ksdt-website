import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token, // Required if you have a private dataset
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }
      // dayOfWeek is used for string comparison in logic, not display — stega would corrupt it
      if (props.sourcePath.at(-1) === "dayOfWeek") {
        return false;
      }

      return props.filterDefault(props);
    },
  },
});
