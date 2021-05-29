import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  const count = post.data?.content.reduce((acc, item) => {
    const section = RichText.asText(item.body).split(' ').length;
    return acc + section;
  }, 0);
  const readingTime = Math.ceil(count / 200);
  return (
    <>
      <Header />
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          {post.data.banner?.url && (
            <div
              className={styles.banner}
              style={{ backgroundImage: `url(${post.data.banner?.url})` }}
            />
          )}
          <header>
            <h1>{post?.data.title}</h1>
            <div className={styles.info}>
              <div>
                <FiCalendar />
                <span>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
              </div>
              <div>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div>
                <FiClock />
                <span>{`${readingTime} min`}</span>
              </div>
            </div>
          </header>
          <article>
            {post?.data.content.map(content => (
              <div key={Math.random().toString()} className={styles.postBody}>
                <h2>{content.heading}</h2>
                {content.body.map(item => (
                  <p key={Math.random().toString()}>{item.text}</p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'pos')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 3,
    }
  );
  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('pos', String(params.slug), {
    fetch: ['post.title', 'post.banner', 'post.author', 'post.content'],
  });
  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url ?? '',
      },
      content: response.data.content,
    },
  };
  return {
    props: {
      post,
    },
  };
};
