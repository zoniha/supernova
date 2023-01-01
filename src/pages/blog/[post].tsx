import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import AuthField from 'components/organisms/AuthField';
import { MarkdownTemplate } from 'components/templates/MarkdownTemplate';
import client from 'graphql/config/ApolloClientConfig';
import { GET_POST_QUERY } from 'graphql/queries/GetPostQuery';
import { GET_POSTS_QUERY } from 'graphql/queries/GetPostsQuery';
import { haveAuthState } from 'states/atoms/haveAuth';
import { convertDateDisplay } from 'utils/convertDateDisplay';
import { BlogPost } from 'types/post';
import { RootLayout } from 'components/layout';

const Blog: NextPage<any> = ({ post }) => {
  const [isSecret, setIsSecret] = useState<boolean>(post.isSecret);
  const dateDisplay = convertDateDisplay(post.createdAt.slice(0, 10));
  const haveAuth = useRecoilValue(haveAuthState);

  if (haveAuth && isSecret) {
    setIsSecret(false);
  }

  return (
    <RootLayout title={post.title}>
      {isSecret ? (
        <AuthField setIsSecret={setIsSecret} />
      ) : (
        <div className="px-12 pt-20 pb-60">
          <article className="mx-auto mt-40 flex max-w-3xl flex-col items-center justify-center">
            <header className="grid justify-items-center gap-12">
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <time dateTime={post.createdAt}>{dateDisplay}</time>
            </header>
            <span className="divider mt-20 mb-0"></span>
            <div className="mt-20 w-full text-lg tracking-wide">
              <MarkdownTemplate content={post.content} />
            </div>
          </article>
        </div>
      )}
    </RootLayout>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_POSTS_QUERY,
  });
  const paths = data.posts.map((post: BlogPost) => `/blog/${post.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { data } = await client.query({
    query: GET_POST_QUERY,
    variables: {
      slug: params.post,
    },
  });

  return {
    props: {
      post: data.posts[0],
    },
  };
};
