import type { PostStatus, Prisma } from "@/generated/prisma/client";

export type PostWithAuthorAndVotes = Prisma.PostGetPayload<{
  include: {
    author: true;
    votes: true;
  };
}>;

export type PostStatusType = PostStatus;
