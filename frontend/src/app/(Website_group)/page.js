import AboutUs from '@/components/AboutUs'
import ClassicsSection from '@/components/ClassicsSection'
import FeaturedCollection from '@/components/FeaturedCollection'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
import Prod from '@/components/Prod'
import Prod2 from '@/components/Prod2'
import SmallBanner from '@/components/SmallBanner'
import SmallBanner2 from '@/components/SmallBanner2'
import Testimonials from '@/components/Testimonials'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <FeaturedCollection/>
      <AboutUs/>
      <SmallBanner/>
      <Prod/>
      <SmallBanner2/>
      <Prod2/>
      <ClassicsSection/>
      <Testimonials/>
      <Features/>
      <Newsletter/>
    </div>
  )
}
