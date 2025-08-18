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
                    <p>Terms & Conditions</p>
                </Breadcrumbs>
            </div>

            <div className="title">
                <h1>Terms & Conditions</h1>
            </div>

            <div className="terms" dangerouslySetInnerHTML={{ __html: settings?.terms_and_conditions }}></div>
        </div>
    )
}

export default Index