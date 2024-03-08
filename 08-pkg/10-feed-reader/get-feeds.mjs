import { parseFeed } from "htmlparser2";

export default async function getFeedEntries(url, maxEntries = 5) {
    const feedFetched = await fetch(url);
    if (!feedFetched.ok) {
        throw new Error("Feed fetch failed");
    }
    const feedContent = await feedFetched.text();
    const { items } = parseFeed(feedContent);
    return items.slice(0, maxEntries);
}
