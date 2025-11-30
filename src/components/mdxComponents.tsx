import React, { HTMLAttributes } from "react";

type MDXComponentProps = HTMLAttributes<HTMLElement>;

export const mdxComponents = {
  h1: (props: MDXComponentProps) => (
    <h1 className="text-4xl font-bold my-6" {...props} />
  ),
  h2: (props: MDXComponentProps) => (
    <h2 className="text-3xl font-semibold my-5" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="text-2xl font-semibold my-4" {...props} />
  ),
  p: (props: MDXComponentProps) => (
    <p className="my-3 text-gray-700 leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  li: (props: MDXComponentProps) => (
    <li className="ml-6 list-disc my-1" {...props} />
  ),
  ul: (props: MDXComponentProps) => <ul className="my-3" {...props} />,
  ol: (props: MDXComponentProps) => (
    <ol className="my-3 ml-6 list-decimal" {...props} />
  ),
  blockquote: (props: MDXComponentProps) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props: MDXComponentProps) => (
    <pre
      className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
};
