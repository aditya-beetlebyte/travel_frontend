"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HeaderThree from "@/layouts/headers/HeaderThree";
import FooterSix from "@/layouts/footers/FooterSix";
import type { TravelPackage } from "@/services/packageApi";
import { fetchPublicPackages } from "@/services/packagePublicApi";

export default function PackagesCatalog() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedNights, setSelectedNights] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchPublicPackages({ limit: 300 })
      .then((res) => setPackages(res.data || []))
      .catch((err) => {
        console.error("Failed to fetch packages page data", err);
        setPackages([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const destinationOptions = useMemo(() => {
    return Array.from(new Set(packages.map((p) => p.destination).filter(Boolean)));
  }, [packages]);

  const nightOptions = useMemo(() => {
    return Array.from(
      new Set(packages.map((p) => p.duration?.nights).filter((n): n is number => typeof n === "number"))
    ).sort((a, b) => a - b);
  }, [packages]);

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      if (selectedDestinations.length > 0 && !selectedDestinations.includes(p.destination || "")) {
        return false;
      }
      if (selectedNights.length > 0 && !selectedNights.includes(p.duration?.nights ?? -1)) {
        return false;
      }
      return true;
    });
  }, [packages, selectedDestinations, selectedNights]);

  const toggleDestination = (value: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleNight = (value: number) => {
    setSelectedNights((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <HeaderThree />
      <main>
        <div className="tg-breadcrumb-spacing-3 include-bg p-relative fix" style={{ backgroundImage: "url(/assets/img/breadcrumb/breadcrumb-2.jpg)" }}>
          <div className="tg-hero-top-shadow"></div>
        </div>
        <div className="container pt-50 pb-80">
          <div className="row">
            <div className="col-xl-3 col-lg-4 mb-30">
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff" }}>
                <h5 style={{ marginBottom: 14 }}>Filters</h5>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Destination</label>
                  {destinationOptions.map((d) => (
                    <label key={d} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(d)}
                        onChange={() => toggleDestination(d)}
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
                <hr style={{ margin: "12px 0", borderColor: "#e5e7eb" }} />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Duration</label>
                  {nightOptions.map((n) => (
                    <label key={n} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <input
                        type="checkbox"
                        checked={selectedNights.includes(n)}
                        onChange={() => toggleNight(n)}
                      />
                      <span>{n} Nights</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div style={{ marginBottom: 14, color: "#475569", fontSize: 14 }}>
                Showing {filtered.length} of {packages.length} packages
              </div>
              {loading ? (
                <div>Loading packages...</div>
              ) : filtered.length === 0 ? (
                <div>No packages found for selected filters.</div>
              ) : (
                <div className="row">
                  {filtered.map((item) => (
                    <div key={item._id} className="col-xl-4 col-md-6 mb-25">
                      <Link
                        href={`/tour-details/${item._id}`}
                        className="tg-listing-card-item tg-listing-su-card-item d-block text-decoration-none"
                        style={{ color: "inherit", cursor: "pointer" }}
                      >
                        <div className="tg-listing-card-thumb fix mb-20 p-relative">
                          {item.images?.[0] ? (
                            <img className="tg-card-border w-100" src={item.images[0]} alt={item.packageName} style={{ height: 190, objectFit: "cover" }} />
                          ) : (
                            <div className="tg-card-border w-100" style={{ height: 190, background: "#e5e7eb" }} />
                          )}
                        </div>
                        <div className="tg-listing-card-content">
                          <h4 className="tg-listing-card-title mb-10">{item.packageName}</h4>
                          <div className="tg-listing-card-duration-tour mb-15">
                            <span className="tg-listing-card-duration-map">{item.destination}, India</span>
                          </div>
                          <div style={{ fontSize: 13, color: "#0f172a", marginBottom: 8 }}>
                            {(item.duration?.nights ?? 0).toString().padStart(2, "0")} Nights / {(item.duration?.days ?? 0).toString().padStart(2, "0")} Days
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FooterSix />
    </>
  );
}
