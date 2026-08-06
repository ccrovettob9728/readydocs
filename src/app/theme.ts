import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: "var(--font-inter)",
        },
        body: {
          value: "var(--font-inter)",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);