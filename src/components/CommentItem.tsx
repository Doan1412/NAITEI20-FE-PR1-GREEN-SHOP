import { Rate } from "antd";
import React from "react";
import { Comment } from "../types/comment.type";
import { UserOutlined } from "@ant-design/icons";

interface ICommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  return (
    <div className="flex gap-3 border-b border-[#f4f2f2] pb-3 pt-5">
      <div className="p-1 w-9 h-9 rounded-full border text-center">
        {comment.avatar ? (
          <img
            src={comment.avatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <UserOutlined />
        )}
      </div>
      <div className="comment-item__header-right">
        <p className="text-sm">{comment.userName}</p>
        <Rate allowHalf className="text-sm" value={comment.rating} />
        <p className="mt-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
