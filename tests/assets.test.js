// @vitest-environment node
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// The frame's pictures are legacy's own files, byte for byte, each listed in
// theme/assets/legacy/SOURCES.json with where it came from and its hash.
const root = new URL('../', import.meta.url)
const sources = JSON.parse(readFileSync(new URL('theme/assets/legacy/SOURCES.json', root), 'utf8'))

describe('the legacy frame pictures', () => {
  it('lists every file in theme/assets/legacy/, and no other', () => {
    const files = readdirSync(new URL('theme/assets/legacy/', root)).filter((name) => name !== 'SOURCES.json')
    expect(Object.keys(sources.files).map((path) => path.split('/').pop()).sort()).toEqual(files.sort())
  })

  it('holds each file as legacy serves it', () => {
    for (const [path, { source, sha256 }] of Object.entries(sources.files)) {
      expect(source, path).toMatch(/^https:\/\/travels\.museumwnf\.org\/images\//)
      expect(createHash('sha256').update(readFileSync(new URL(path, root))).digest('hex'), path).toBe(sha256)
    }
  })
})
