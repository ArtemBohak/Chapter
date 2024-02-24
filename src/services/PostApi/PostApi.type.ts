import { CommentValues, IPost } from "@/src/types";
import { RefsType } from "@/src/utils/callBacks/callBacks.type";

export type FeedType = IPost;
export type FeedRefType = FeedType & RefsType;
export type FeedsType = Array<FeedRefType> | [];

export type CommentType = CommentValues;
export type CommentRefType = CommentType & RefsType;
export type CommentsType = Array<CommentRefType> | [];
