import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  languageOptions: {
    globals: {
      ...globals.browser, // Include browser globals if needed
      process: "readonly", // Explicitly define process as a global variable
      __dirname: "readonly", // Optional: if you use __dirname
      __filename: "readonly", // Optional: if you use __filename
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  rules: {
    // Add or customize rules here
  },
};
