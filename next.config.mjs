import { build } from "velite";

const isDev = process.env.NODE_ENV === "development";
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
export default {};
