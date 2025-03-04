import fs from "fs";

const build = () => {
  fs.copyFileSync("./packages/components.d.ts", "./types/components.d.ts");
  fs.copyFileSync("./packages/global.d.ts", "./types/global.d.ts");
  fs.appendFileSync("./types/index.d.ts", `\nimport "./components.d.ts";\n`);
  fs.appendFileSync("./types/index.d.ts", `import "./global.d.ts";\n`);
};

build();
