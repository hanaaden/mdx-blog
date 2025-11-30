import withMDX from "@next/mdx";

const mdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default mdx(nextConfig);
