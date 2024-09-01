import { fetchQuery, init } from "@airstack/node";

import dotenv from "dotenv";

interface FarcasterCastsQueryResponse {
  data: FarcasterData;
  error: QueryError;
}

interface FarcasterData {
  FarcasterCasts: FarcasterCasts;
}

interface FarcasterCasts {
  Cast: Cast[];
}

interface Cast {
  rawText: string;
}

interface QueryError {
  message: string;
}

export const fetchRawTextByFname = async (fname: string): Promise<string[]> => {
  dotenv.config();

  init(process.env.AIRSTACK_API_KEY || "");
  // Hardcoded query with dynamic fname parameter
  const query = `
    query MyQuery {
      FarcasterCasts(
        input: {filter: {castedBy: {_eq: "fc_fname:${fname}"}}, blockchain: ALL, limit: 1}
      ) {
        Cast {
          rawText
        }
      }
    }
  `;

  try {
    const response: FarcasterCastsQueryResponse = await fetchQuery(query);

    if (response.error) {
      throw new Error(response.error.message);
    }

    // Extract and return rawText from the response
    const rawTexts = response.data.FarcasterCasts.Cast.map(
      (cast) => cast.rawText
    );
    return rawTexts;
  } catch (error) {
    throw new Error(`Failed to fetch raw texts: ${(error as Error).message}`);
  }
};
