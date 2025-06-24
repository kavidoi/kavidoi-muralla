const express = require('express')
const router = express.Router()

// GET latest media from public Instagram account (unofficial JSON endpoint)
router.get('/', async (req, res) => {
  const username = 'aestheticc.rooms'
  const igUrl = `https://www.instagram.com/${username}/?__a=1&__d=dis`
  try {
    const igRes = await fetch(igUrl, {
      headers: {
        // Pretend to be a browser to avoid 403 blocks
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })
    if (!igRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch Instagram' })
    }
    const data = await igRes.json()
    // Navigate to edges
    const edges =
      data?.graphql?.user?.edge_owner_to_timeline_media?.edges || []
    const images = edges.map((e) => ({
      id: e.node.id,
      display_url: e.node.display_url,
      shortcode: e.node.shortcode,
      thumbnail_src: e.node.thumbnail_src,
      permalink: `https://www.instagram.com/p/${e.node.shortcode}/`,
    }))
    res.json(images)
  } catch (err) {
    console.error('Instagram proxy error', err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
