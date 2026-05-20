/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Wishlist from "@/svg/home-one/Wishlist"
import Clock from "@/svg/home-one/Clock"
import User from "@/svg/home-one/User"
import Location from "@/svg/home-one/Location"
import { useDispatch } from "react-redux"
import { addToWishlist } from "@/redux/features/wishlistSlice"
import {
  fetchHomeListingPackages,
  getCachedHomeListingPackages,
  pickFeaturedPackages,
} from "@/services/featuredPackagesHome"
import type { TravelPackage } from "@/services/packageApi"

import shape_1 from "@/assets/img/listing/su/shape-2.png"
import shape_2 from "@/assets/img/listing/su/shape-1.png"
import styles from "./Listing.module.scss"

const SKELETON_COUNT = 6

function FeaturedCardSkeleton() {
  return (
    <div className={`col-xl-4 col-lg-4 col-md-6 ${styles.skeletonCard}`}>
      <div className="tg-listing-card-item tg-listing-su-card-item mb-25">
        <div className={`${styles.skeletonThumb} ${styles.skeletonPulse}`} />
        <div className="tg-listing-card-content">
          <div className={`${styles.skeletonLine} ${styles.skeletonPulse}`} />
          <div className={`${styles.skeletonLineTitle} ${styles.skeletonPulse}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort} ${styles.skeletonPulse}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonPulse}`} style={{ marginBottom: 0 }} />
        </div>
      </div>
    </div>
  )
}

const Listing = () => {
  const dispatch = useDispatch()
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const cached = getCachedHomeListingPackages()
    if (cached?.length) {
      setPackages(cached)
      setLoading(false)
    }

    fetchHomeListingPackages()
      .then((data) => {
        if (!cancelled) {
          setPackages(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error("Failed to load featured packages", err)
        if (!cancelled) {
          if (!cached?.length) setPackages([])
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const featuredPackages = useMemo(() => pickFeaturedPackages(packages), [packages])

  const handleAddToWishlist = (item: any) => {
    dispatch(addToWishlist(item))
  }

  const showSkeleton = loading && featuredPackages.length === 0

  return (
    <div className="tg-listing-area tg-listing-su-spacing tg-grey-bg-2 pt-120 p-relative">
      <Image className="tg-listing-su-shape d-none d-xl-block" src={shape_1} alt="" />
      <Image className="tg-listing-su-shape-2 d-none d-xxl-block" src={shape_2} alt="" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="tg-listing-section-title-wrap text-center mb-40">
              <h5
                className="tg-section-su-subtitle su-subtitle-2 mb-15 wow fadeInUp"
                data-wow-delay=".4s"
                data-wow-duration=".9s"
              >
                Explore the world
              </h5>
              <h2
                className="tg-section-su-title text-capitalize wow fadeInUp mb-15"
                data-wow-delay=".5s"
                data-wow-duration=".9s"
              >
                Our Amazing Featured Tour Package The World
              </h2>
            </div>
          </div>
        </div>
        <div className={`row ${showSkeleton ? styles.loadingRow : ""}`}>
          {showSkeleton
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => <FeaturedCardSkeleton key={i} />)
            : featuredPackages.map((item) => (
                <div key={item._id} className="col-xl-4 col-lg-4 col-md-6">
                  <Link
                    href={`/tour-details/${item._id}`}
                    className="tg-listing-card-item tg-listing-su-card-item mb-25 d-block text-decoration-none"
                    style={{ color: "inherit", cursor: "pointer" }}
                  >
                    <div className="tg-listing-card-thumb fix mb-25 p-relative">
                      <img
                        className="tg-card-border w-100"
                        src={item.images?.[0] || shape_1.src}
                        alt={item.packageName}
                        loading="lazy"
                        decoding="async"
                        style={{ height: 210, objectFit: "cover", background: "#e5e7eb" }}
                        onError={(e) => {
                          const imgEl = e.currentTarget
                          imgEl.onerror = null
                          imgEl.src = shape_1.src
                        }}
                      />
                      <span className="tg-listing-item-price-discount">Featured</span>
                      <div className="tg-listing-item-wishlist">
                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleAddToWishlist(item)
                          }}
                          style={{
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            padding: 0,
                          }}
                        >
                          <Wishlist />
                        </button>
                      </div>
                    </div>
                    <div className="tg-listing-card-content">
                      <div className="tg-listing-card-duration-tour d-flex align-items-center gap-3">
                        <span className="tg-listing-card-duration-map mb-5">
                          <Clock />
                          {(item.duration?.nights ?? 0).toString().padStart(2, "0")} Nights /{" "}
                          {(item.duration?.days ?? 0).toString().padStart(2, "0")} Days
                        </span>
                        <span className="tg-listing-card-duration-time mb-5">
                          <User />
                          02 Adults
                        </span>
                      </div>
                      <h4 className="tg-listing-card-title mb-10">{item.packageName}</h4>
                      <div className="tg-listing-card-duration-tour mb-20">
                        <span className="tg-listing-card-duration-map">
                          <Location />
                          {[item.destination, "India"].filter(Boolean).join(", ")}
                        </span>
                      </div>
                      <div className="tg-listing-card-price d-flex align-items-end justify-content-between">
                        <div>
                          <span className="tg-listing-card-currency-amount d-flex align-items-center">
                            <span className="currency-symbol mr-5">
                              {(item.duration?.nights ?? 0).toString().padStart(2, "0")}N/
                              {(item.duration?.days ?? 0).toString().padStart(2, "0")}D
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="tg-listing-rating-icon">
                            <i className="fa-sharp fa-solid fa-star"></i> 5.0
                          </span>
                          <span className="tg-listing-rating-percent">(50 Reviews)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          {!showSkeleton && !loading && featuredPackages.length === 0 && (
            <div className="col-12 text-center py-4" style={{ color: "#64748b" }}>
              No featured packages available right now.
            </div>
          )}
          <div className="col-12">
            <div className="text-center mt-15">
              <Link href="/packages" className="tg-btn tg-btn-transparent tg-btn-su-transparent">
                See More Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing
