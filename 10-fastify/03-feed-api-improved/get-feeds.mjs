import { parseFeed } from "htmlparser2";
import { compareDesc } from "date-fns";

export default async function getFeedEntries(url, maxEntries = 5) {
    const feedFetched = await fetch(url);
    if (!feedFetched.ok) {
        throw new Error("Feed fetch failed");
    }
    const feedContent = await feedFetched.text();
    const { items } = parseFeed(feedContent);
    return items.slice(0, maxEntries);
}

export async function getLatestEntries(urls) {
    const feedsFetches = urls.map((s) => getFeedEntries(s));
    const fetchesPromises = await Promise.allSettled(feedsFetches);
    const retrievedFeeds = fetchesPromises
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
    const latestItems = retrievedFeeds.flat().map((i) => {
        return { title: i.title, link: i.link, date: i.pubDate };
    });
    latestItems.sort((a, b) => compareDesc(a.date, b.date));
    return latestItems;
}
