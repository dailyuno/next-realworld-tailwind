type Props = {
  tag: string;
};

const PostTag = ({ tag }: Props) => (
  <div className="p-2 mr-2 bg-gray-400 rounded text-xs text-white">{tag}</div>
);

export default PostTag;
