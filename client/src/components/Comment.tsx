import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../app/hook/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface CommentProps {
  housemaidId: string;
}

interface CommentType {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  rating: number;
  createdAt: string;
  likes: number;
  dislikes: number;
  replies: ReplyType[];
}

interface ReplyType {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: string;
}

const StarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
  readOnly?: boolean;
}> = ({ rating, onRatingChange, readOnly = false }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${readOnly ? "" : "cursor-pointer"} ${star <= rating ? "text-yellow-400" : "text-gray-300"} transition-colors duration-200`}
          onClick={() => !readOnly && onRatingChange(star)}
        />
      ))}
    </div>
  );
};

const Comment: React.FC<CommentProps> = ({ housemaidId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [housemaidId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${housemaidId}` 
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to leave a comment",
        variant: "destructive",
      });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`, 
        {
          housemaidId,
          content: newComment,
          rating: newRating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      setNewRating(5);
      fetchComments();
      toast({
        title: "Comment submitted",
        description: "Your comment has been successfully posted",
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (
    commentId: string,
    content: string,
    rating: number
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, 
        {
          content,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
      toast({
        title: "Comment updated",
        description: "Your comment has been successfully updated",
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      toast({
        title: "Error",
        description: "Failed to update comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
      toast({
        title: "Comment deleted",
        description: "Your comment has been successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (commentId: string) => {
    // Implement like functionality
  };

  const handleDislike = async (commentId: string) => {
    // Implement dislike functionality
  };

  const handleReply = async (commentId: string, replyContent: string) => {
    // Implement reply functionality
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Comments</h2>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {comments.map((comment) => (
        <Card
          key={comment._id}
          className="shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user.username}`}
              />
              <AvatarFallback>
                {comment.user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{comment.user.username}</CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="ml-auto">
              <StarRating
                rating={comment.rating}
                onRatingChange={() => {}}
                readOnly
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{comment.content}</p>
            <div className="flex items-center space-x-4 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment._id)}
              >
                <ThumbsUpIcon className="mr-2 h-4 w-4" /> {comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDislike(comment._id)}
              >
                <ThumbsDownIcon className="mr-2 h-4 w-4" /> {comment.dislikes}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MessageCircleIcon className="mr-2 h-4 w-4" /> Reply
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reply to {comment.user.username}</DialogTitle>
                  </DialogHeader>
                  <Textarea
                    placeholder="Write your reply here..."
                    className="mt-2"
                  />
                  <Button
                    onClick={() => handleReply(comment._id, "Reply content")}
                  >
                    Submit Reply
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Replies:</h4>
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">{reply.user.username}</p>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {isAuthenticated && user && user.id === comment.user._id && (
            <CardFooter className="justify-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Comment</DialogTitle>
                  </DialogHeader>
                  <Textarea defaultValue={comment.content} className="mt-2" />
                  <StarRating
                    rating={comment.rating}
                    onRatingChange={() => {}}
                  />
                  <Button
                    onClick={() =>
                      handleUpdate(
                        comment._id,
                        "Updated content",
                        comment.rating
                      )
                    }
                  >
                    Update Comment
                  </Button>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
      {isAuthenticated ? (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
                required
                className="w-full resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Your rating:</span>
                  <StarRating
                    rating={newRating}
                    onRatingChange={setNewRating}
                  />
                </div>
                <Button type="submit">Submit Comment</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertDescription>Please log in to leave a comment.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Comment;