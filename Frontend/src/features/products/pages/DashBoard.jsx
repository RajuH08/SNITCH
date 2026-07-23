import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";

const editorialImage =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80";

const DashBoard = () => {
  const { handelGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        await handelGetSellerProduct();
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            "Unable to load your dashboard right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [handelGetSellerProduct]);

  const dashboardStats = useMemo(() => {
    const totalProducts = sellerProducts.length;
    const totalImages = sellerProducts.reduce(
      (count, product) => count + (product?.images?.length || 0),
      0,
    );
    const totalValue = sellerProducts.reduce(
      (sum, product) => sum + Number(product?.price?.amount || 0),
      0,
    );

    return {
      totalProducts,
      totalImages,
      totalValue,
      averagePrice: totalProducts ? totalValue / totalProducts : 0,
    };
  }, [sellerProducts]);

  const recentProducts = useMemo(
    () =>
      [...sellerProducts]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 6),
    [sellerProducts],
  );

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError("");
      await handelGetSellerProduct();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to refresh your products right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount, currency = "INR") => {
    const numericAmount = Number(amount || 0);

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#111111]">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,131,74,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(17,17,17,0.06),_transparent_34%),linear-gradient(180deg,_#f5f1ea_0%,_#f1ece3_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <section className="grid gap-6 rounded-[32px] border border-black/8 bg-white/88 p-5 shadow-[0_24px_90px_rgba(17,17,17,0.08)] backdrop-blur sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-black/10 bg-[#faf7f1] px-4 py-2 text-xs uppercase tracking-[0.3em] text-black/60">
                  Seller dashboard
                </span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/65">
                  SNITCH studio
                </span>
              </div>

              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                  Manage your collection with calm clarity.
                </h1>
                <p className="text-base leading-8 text-black/60 sm:text-lg">
                  A minimal workspace for your catalog, designed with clean
                  spacing and a fashion-first editorial tone.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-[#faf7f1] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-black/45">
                    Products
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-black">
                    {dashboardStats.totalProducts}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#faf7f1] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-black/45">
                    Images
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-black">
                    {dashboardStats.totalImages}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#faf7f1] px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-black/45">
                    Avg. price
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-black">
                    {formatPrice(dashboardStats.averagePrice)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/seller/create-product"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                  Create product
                </Link>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="inline-flex items-center justify-center rounded-2xl border border-black/12 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-[#faf7f1]"
                >
                  Refresh list
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_40px_rgba(17,17,17,0.06)]">
              <img
                src={editorialImage}
                alt="Curated clothing rack in a studio"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0)_30%,_rgba(17,17,17,0.45)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  Seller note
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Keep each listing crisp, visual, and easy to scan.
                </h2>
              </div>
            </div>
          </section>

          <section className="mt-8 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                  Recent products
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-black">
                  Your latest catalog entries
                </h3>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-800">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-3xl border border-black/8 bg-white/85 px-6 py-10 text-sm text-black/60">
                Loading your products...
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/12 bg-white/75 px-6 py-12 text-center">
                <p className="text-lg font-medium text-black">
                  No products yet
                </p>
                <p className="mt-2 text-sm text-black/55">
                  Start by creating your first product listing.
                </p>
                <Link
                  to="/seller/create-product"
                  className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                  Add first product
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {recentProducts.map((product) => (
                  <article
                    key={product._id}
                    className="overflow-hidden rounded-[26px] border border-black/10 bg-white/90 shadow-[0_14px_30px_rgba(17,17,17,0.05)]"
                  >
                    <div className="relative aspect-[4/3] bg-[#f4efe5]">
                      {product?.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-black/45">
                          No preview image
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 p-4">
                      <div>
                        <p className="line-clamp-1 text-lg font-semibold text-black">
                          {product.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-black/55">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 border-t border-black/8 pt-3 text-sm">
                        <p className="font-medium text-black">
                          {formatPrice(
                            product?.price?.amount,
                            product?.price?.currency || "INR",
                          )}
                        </p>
                        <p className="text-black/50">
                          {product?.images?.length || 0} images
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
