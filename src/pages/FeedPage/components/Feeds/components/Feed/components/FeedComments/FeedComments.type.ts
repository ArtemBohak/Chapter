import { Feed } from "@/src/pages/FeedPage/FeedPage.types";

export type FeedCommentsProps = Pick<Feed, "id" | "totalComments">;
