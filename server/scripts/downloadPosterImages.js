const fs = require('fs')
const path = require('path')
const https = require('https')

// Path to seed file we will parse
const seedFile = path.join(__dirname, 'seedPosters.js')
const seedContents = fs.readFileSync(seedFile, 'utf8')

// Regex to capture title & imageUrl pairs regardless of whitespace/newlines.
// Uses a lazy match between title and imageUrl to avoid spanning multiple objects.
const pairRegex = /title:\s*'([^']+?)'[\s\S]*?imageUrl:\s*'([^']+?)'/g

/** Slugify a title -> "orgullo-ancestral" */
function slugify (text) {
  return text
    .toString()
    .normalize('NFD') // split accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
}

const posters = []
let match
while ((match = pairRegex.exec(seedContents)) !== null) {
  const [_, title, url] = match
  posters.push({ title, url })
}

if (posters.length === 0) {
  console.error('No posters found in seed file. Make sure the regex matches.')
  process.exit(1)
}

const outputDir = path.join(__dirname, '../../muralla-dashboard/public/posters')
fs.mkdirSync(outputDir, { recursive: true })

console.log(`Downloading ${posters.length} images to ${outputDir}...`)

function download (url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close()
          fs.unlink(dest, () => {})
          return reject(new Error(`Failed to get '${url}' (${res.statusCode})`))
        }
        res.pipe(file)
      })
      .on('error', (err) => {
        file.close()
        fs.unlink(dest, () => {})
        reject(err)
      })

    file.on('finish', () => file.close(resolve))
    file.on('error', (err) => {
      file.close()
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

;(async () => {
  for (const { title, url } of posters) {
    try {
      const filename = slugify(title) + path.extname(url).split('?')[0] || '.jpg'
      const dest = path.join(outputDir, filename)
      await download(url, dest)
      console.log(`✔ Downloaded ${title} -> ${filename}`)
    } catch (err) {
      console.error(`✖ Error downloading ${title}:`, err.message)
    }
  }
  console.log('Done.')
})()
