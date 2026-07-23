import { useMemo, useState } from "react";
import { useProduct } from "../hooks/useProduct";

const editorialImage =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";

const CreateProduct = () => {
  const { handelCreateProduct } = useProduct();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [createdProduct, setCreatedProduct] = useState(null);

  const previewImages = useMemo(
    () => images.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [images],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const nextImages = [...images, ...selectedFiles].slice(0, 7);
    setImages(nextImages);
    event.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.priceAmount.trim()
    ) {
      setMessage({
        type: "error",
        text: "Please complete the required fields.",
      });
      return;
    }

    if (images.length === 0) {
      setMessage({ type: "error", text: "Please add at least one image." });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("priceAmount", form.priceAmount);
      formData.append("priceCurrency", form.priceCurrency);

      images.forEach((file) => {
        formData.append("images", file);
      });

      const createdProductData = await handelCreateProduct(formData);

      setForm({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "INR",
      });
      setImages([]);
      setCreatedProduct(createdProductData);
      setMessage({ type: "success", text: "Product created successfully." });
    } catch (error) {
      const statusCode = error?.response?.status;
      const errorMessage =
        statusCode === 401
          ? "Please log in as a seller before creating a product."
          : error?.response?.data?.message ||
            "Unable to create product right now.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#111111]">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,131,74,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(17,17,17,0.06),_transparent_34%),linear-gradient(180deg,_#f5f1ea_0%,_#f1ece3_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-8 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.34em] text-black/45">
              Seller studio
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Create a product card that feels styled, calm, and ready for a
              drop.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              A clean product entry flow for a fashion store: soft neutrals,
              breathable spacing, and a strong visual story that helps the
              collection feel curated.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-8 rounded-[32px] border border-black/8 bg-white/88 p-5 shadow-[0_24px_90px_rgba(17,17,17,0.08)] backdrop-blur sm:p-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:p-8"
          >
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-black/75"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Tailored linen blazer"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-black/75"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write the story behind the piece, fabric feel, fit, and any styling cues buyers need."
                    className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="priceAmount"
                    className="text-sm font-medium text-black/75"
                  >
                    Price amount
                  </label>
                  <input
                    id="priceAmount"
                    name="priceAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.priceAmount}
                    onChange={handleChange}
                    placeholder="1299"
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/35 focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="priceCurrency"
                    className="text-sm font-medium text-black/75"
                  >
                    Price currency
                  </label>
                  <select
                    id="priceCurrency"
                    name="priceCurrency"
                    value={form.priceCurrency}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/10"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div className="rounded-[28px] border border-dashed border-black/12 bg-[#fbf8f2] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-black">Images</p>
                    <p className="text-xs text-black/55">
                      Upload up to 7 images. Keep the first image as the hero
                      shot.
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.24em] text-black/45">
                    {images.length}/7
                  </span>
                </div>

                <label className="mt-4 flex min-h-28 cursor-pointer items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-6 text-center text-sm text-black/60 transition hover:border-black/20 hover:bg-[#faf7f1]">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <span>Add images or drag them here later</span>
                </label>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {previewImages.map((preview, index) => (
                      <div
                        key={preview.url}
                        className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white"
                      >
                        <img
                          src={preview.url}
                          alt={preview.file.name}
                          className="h-28 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-black shadow-sm transition hover:bg-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="flex h-full flex-col justify-between gap-6 rounded-[28px] border border-black/10 bg-[#faf7f1] p-5 sm:p-6">
              <div className="space-y-5">
                <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_18px_40px_rgba(17,17,17,0.06)]">
                  <div className="relative min-h-[260px]">
                    <img
                      src={editorialImage}
                      alt="Styled clothing rack in a fashion studio"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0)_35%,_rgba(17,17,17,0.38)_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                        Product story
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight">
                        A clean visual that gives the garment room to breathe.
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-7 text-black/65">
                  <p>
                    Write like you are styling the piece for a campaign page.
                  </p>
                  <p>
                    Use concise language and leave visual space around the
                    details.
                  </p>
                  <p>
                    Upload the hero image first so the product feels instantly
                    polished.
                  </p>
                </div>

                {message.text && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      message.type === "success"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {createdProduct && message.type === "success" && (
                  <div className="rounded-[24px] border border-emerald-500/20 bg-white px-4 py-4 text-sm text-black/70">
                    <p className="text-xs uppercase tracking-[0.24em] text-emerald-700/70">
                      Created product
                    </p>
                    <div className="mt-3 space-y-2">
                      <p className="text-base font-medium text-black">
                        {createdProduct?.title}
                      </p>
                      <p className="text-black/55">
                        {createdProduct?.description}
                      </p>
                      <p className="text-black/65">
                        Price: {createdProduct?.price?.amount}{" "}
                        {createdProduct?.price?.currency}
                      </p>
                      <p className="text-black/55">
                        Images uploaded: {createdProduct?.images?.length ?? 0}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-2xl bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating product..." : "Create product"}
              </button>
            </aside>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateProduct;
