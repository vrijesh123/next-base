import { BASE_URL } from '@/api/api'
import BlogDetails from '@/components/blogs/BlogDetails'
import Head from 'next/head'
import React from 'react'

const Index = ({ data }) => {

    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta
                    name="description"
                    content={data?.sub_title}
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Dr. Guinwa" />
                <meta name="publisher" content="Dr. Guinwa Clinic" />

                <link rel="preload" href={`${BASE_URL}${data?.thumbnail}`} as="image" />
                <link rel="canonical" href={`https://drguinwa.com/blogs/${data?.slug}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://drguinwa.com/blogs/${data?.slug}`} />
                <meta property="og:title" content={data?.title} />
                <meta
                    property="og:description"
                    content={data?.sub_title}
                />

                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image" content={`${BASE_URL}${data?.thumbnail}`} />
                <meta property="og:image:alt" content={`${data?.title} blogs at Dr. Guinwa Clinic`} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": data?.title,
                        "description": data?.sub_title,
                        "image": `${BASE_URL}${data?.thumbnail}`,
                        "url": `https://drguinwa.com/blogs/${data?.slug}`,
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [{
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://drguinwa.com/"
                        }, {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Procedures",
                            "item": "https://drguinwa.com/blogs"
                        }, {
                            "@type": "ListItem",
                            "position": 3,
                            "name": data?.title,
                            "item": `https://drguinwa.com/blogs/${data?.slug}`
                        }]
                    })}
                </script>
            </Head>

            <BlogDetails blog_data={data} />
        </>
    )
}

export default Index

export async function getStaticPaths() {
    try {
        const res = await fetch("https://api.drguinwa.com/api/blog/", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            }
        });
        const blogs = await res.json();

        const paths = [];

        if (blogs?.results && Array.isArray(blogs?.results)) {
            blogs?.results?.forEach((blog) => {
                paths.push({
                    params: { slug: blog?.slug },
                });
            });
        }

        return {
            paths,
            fallback: "blocking", // or 'blocking' if you want to serve generated pages on-demand
        };
    } catch (error) {
        console.error("Failed to fetch service IDs:", error);
        return {
            paths: [], // Return an empty array if there's an error
            fallback: "blocking",
        };
    }
}

// For each slug, load any needed data
export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://api.drguinwa.com/api/blog/?slug=${params.slug}&depth=3&nested=True`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            }
        });

        if (!res.ok) {
            return {
                notFound: true,
            };
        }

        const blogs = await res.json();

        return {
            props: {
                data: blogs?.results?.[0],
            },
            revalidate: 10, // seconds - page will be regenerated at most once per minute
        }
    } catch (error) {
        return {
            props: {
                data: null,
                error: error.message,
            },
        }
    }
}