// Hears for regex of an instagram post URL and extracts two groups:
// 1. Instagram Shortcode
// 2. Optional image index
const instagramUrlRegex =
  /https:\/\/www\.instagram\.com\/p\/(.+)\/(?:\?img_index=(\d))?/

export { instagramUrlRegex }
