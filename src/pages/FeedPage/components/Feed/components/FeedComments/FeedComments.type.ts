import { Feed } from "@/src/pages/FeedPage/types/FeedPage.types";

export type FeedCommentsProps = Pick<Feed, "id" | "totalComments">;
