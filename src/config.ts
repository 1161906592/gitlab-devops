import { parse } from "yaml"
import { readFileSync } from "fs"

const config = parse(readFileSync(`${process.cwd()}/application.yaml`, 'utf8'))

export default config