import Blogs from '@/components/blogs/Blogs'
import { renderHeadTags } from '@/utils/renderHeadTags'
import Head from 'next/head'
import React from 'react'

const Index = ({ data }) => {
    return (
        <>
            <Head>
                {renderHeadTags(data?.head)}
            </Head>

            <Blogs />
        </>
    )
}

export default Index

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://api.thecaliphhotel.com/api/head/`, {
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

        const heads = await res.json();

        const pageHead = heads?.results?.find(
            (item) => item.target_url === "https://thecaliphhotel.com/dinning"
        );

        return {
            props: {
                data: pageHead,
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