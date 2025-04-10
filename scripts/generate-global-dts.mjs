import fs from 'fs'

const GLOBAL_DIR = './packages/global'
const OUTPUT_FILE = './packages/global.d.ts'


function generateGlobalDts() {
    // 读取 global 目录下的所有文件夹
    const globals = fs.readdirSync(GLOBAL_DIR).map(name => ({
        name: `${name}`,
        path: `./global/${name}/index.ts`
    }))

    // 生成声明文件内容
    const content = `// This file is generated by scripts/generate-global-dts.mjs
import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
${globals
            .map(
                global =>
                    `    $${global.name}: typeof import("./global/${global.name}/index")["default"];`
            )
            .join('\n')}
  }
}
`

    // 写入文件
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8')
    console.log('\x1b[32m【BUILD】Generated global.d.ts successfully!\x1b[0m')
}

generateGlobalDts()