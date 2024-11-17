type ConfigType = {
  environment: "production" | "development";
};

export const config: ConfigType = {
  environment: import.meta.env.VITE_ENV,
};
