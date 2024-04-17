import axios from "axios";
import React, { useState, useEffect } from "react";
import "./blog.css";

interface Post {
  title: any;
  excerpt: any;
  _links: {
    "wp:featuredmedia": {
      href: string;
    };
  };
}

export default function Blog({ post }: { post: Post }) {
  const [featuredImage, setFeaturedImage] = useState<string | undefined>(undefined);

  const getImage = async () => {
    axios
        .get((post?._links["wp:featuredmedia"] as unknown as any[])[0]?.href)
        .then((res) => {
            setFeaturedImage(res.data.source_url);
        });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="container">
      <div className="blog-container">
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <img src={featuredImage} className="mask" />
      </div>
    </div>
  );
}