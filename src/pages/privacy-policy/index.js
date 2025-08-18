import { useSiteSetting } from '@/context/useSiteSettings';
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Index = () => {
    const { settings } = useSiteSetting();


    return (
        <div className="container">
            <div role="presentation" className="bread-crumbs">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <p>Privacy Policy</p>
                </Breadcrumbs>
            </div>

            <div className="title">
                <h1>Privacy Policy</h1>
            </div>

            <div className="terms" dangerouslySetInnerHTML={{ __html: settings?.privacy_policy }}></div>
        </div>
    )
}

export default Index