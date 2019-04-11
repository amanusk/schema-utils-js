import fetch from "node-fetch";
import { readJson } from "fs-extra";
import { types } from "@open-rpc/meta-schema";

type TGetOpenRPCDocument = (schema: string) => Promise<types.OpenRPC>;

/**
 *
 */
const fetchUrlSchemaFile: TGetOpenRPCDocument = async (schema) => {
  try {
    const response = await fetch(schema);
    return await response.json();
  } catch (e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schema}`);
  }
};

/**
 *
 */
const readSchemaFromFile = async (schema: string) => {
  try {
    return await readJson(schema);
  } catch (e) {
    if (e.message.includes("SyntaxError")) {
      throw new Error(`Failed to parse json in file ${schema}`);
    } else {
      throw new Error(`Unable to read openrpc.json file located at ${schema}`);
    }
  }
};

export { fetchUrlSchemaFile, readSchemaFromFile };
