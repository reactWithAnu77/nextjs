import React from "react";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  const paths = data.map((curElem) => ({
    params: { pageNo: curElem.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  try {
    const id = context.params.pageNo;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return { notFound: true };
    }

    return { props: { data } };
  } catch (error) {
    console.error(`Error fetching data for pageNo: ${context.params.pageNo}`, error);
    return { notFound: true };
  }
};

const BlogPost = ({ data }) => {
  if (!data) return <div>No post found.</div>;
  const { id, title, body } = data;
  return (
    <div>
      <h3>{id}</h3>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default BlogPost;

