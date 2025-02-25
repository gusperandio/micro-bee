export const schemaEnv = {
  type: "object",
  required: ["SECRET_KEY"],
  properties: {
    SECRET_KEY: {
      type: "string",
    },
    DATABASE_URL: {
      type: "string",
    },
  },
};
