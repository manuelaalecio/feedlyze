"use client";
import { useState, useOptimistic, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MessageSquare, ThumbsUp, User } from "lucide-react";

import { Badge } from "./ui/badge";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { STATUS_GROUPS } from "@/app/data/status";
import { getCategoryDesign } from "@/app/data/category";
import type { PostWithAuthorAndVotes } from "@/types/post";

export default function FeedbackList({
  initialPosts,
  userId,
}: {
  initialPosts: PostWithAuthorAndVotes[];
  userId: number | null;
}) {
  const [posts, setPosts] = useState<PostWithAuthorAndVotes[]>(initialPosts);
  const [isPending, startTransition] = useTransition();

  const makeOptimisticVote = (postId: number, dbUserId: number) => ({
    id: -Date.now(),
    postId,
    userId: dbUserId,
  });

  const [optimisticPosts, toggleOptimisticVote] = useOptimistic(
    posts,
    (currentPosts, postId: number) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        if (userId == null) return post;
        const alreadyVoted = post.votes.some((v) => v.userId === userId);
        return {
          ...post,
          votes: alreadyVoted
            ? post.votes.filter((v) => v.userId !== userId)
            : [...post.votes, makeOptimisticVote(postId, userId)],
        };
      }),
  );

  const handleVote = async (postId: number) => {
    if (!userId) {
      toast.error("Por favor, faça login para votar");
      return;
    }

    startTransition(async () => {
      toggleOptimisticVote(postId);

      try {
        const response = await fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });

        if (!response.ok) throw new Error("Vote failed");

        const data = await response.json();

        setPosts((current) =>
          current.map((post) => {
            if (post.id !== postId) return post;
            const voteCount = post.votes.length;
            return {
              ...post,
              votes: data.voted
                ? [...post.votes, makeOptimisticVote(postId, userId)]
                : post.votes.filter((v) => v.userId !== userId),
            };
          }),
        );

        toast.success(data.voted ? "Voto adicionado!" : "Voto removido");
      } catch (error) {
        toast.error("Erro ao enviar voto. Por favor, tente novamente");
      }
    });
  };
  return (
    <div className="space-y-4">
      {optimisticPosts.map((post) => (
        <Card
          key={post.id}
          className="hover:shadow-md transition-shadow border"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-1">
                  <User className="h-3 w-3" />
                  {post.author.name}
                  <span>|</span>
                  <span className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </CardDescription>
              </div>
              <div className="flex gap-1.5">
                {(() => {
                  const statusGroup =
                    STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];
                  if (!statusGroup) return null;
                  const StatusIcon = statusGroup.icon;

                  return (
                    <Badge
                      className={`${statusGroup.countColor} border ${statusGroup.color} flex items-center gap-1`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusGroup.title}
                    </Badge>
                  );
                })()}

                {(() => {
                  const design = getCategoryDesign(post.category);
                  const Icon = design.icon;

                  return (
                    <Badge
                      variant="outline"
                      className={`text-xs ${design.border} ${design.text} flex items-center gap-1`}
                    >
                      <Icon className="h-3 w-3" />
                      {post.category}
                    </Badge>
                  );
                })()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">{post.description}</p>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(post.id)}
                disabled={isPending}
                className="gap-2"
              >
                <ThumbsUp
                  className={`h-4 w-4 ${
                    post.votes.some((v) => v.userId === userId)
                      ? "fill-current"
                      : ""
                  }`}
                />
                {post.votes.length} Votos
              </Button>
              <div className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Comentário
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
