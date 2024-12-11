import React from "react";

type Props = {
  title: string;
  content: string;
  commentsQty: number;
  tags: string[];
  // 8 - enum
    category: Category
};

export enum Category {
  JS = "javascript",
  TS = "typescript",
  REACT = "react",
  NODE = "node",
}

const Destructuring = ({ title, content, commentsQty, tags, category }: Props) => {
  return (
    <div>
      {/* <h2>{props.title}</h2>
      <p>{props.content}</p>
      <p>Comentarios: {props.commentsQty}</p>
      <p>Tags: {props.tags}</p> */}
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Comentarios: {commentsQty}</p>
      {tags &&
        tags.length > 0 &&
        tags.map((item) => {
          return (
            <span key={item}>
              #{item}
              <br></br>
            </span>
          );
        })}
        <h4>Category: {category}</h4>
    </div>
  );
};

export default Destructuring;
