"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useAuth } from "@/app/context/AuthContext";

const supabase = createClient();

interface DbReview {
  id: string;
  reviewer_name: string;
  rating: number;
  body: string;
  created_at: string;
  reviewer_id: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${sz} ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InteractiveStar({ value, hovered, onHover, onClick }: {
  value: number;
  hovered: number;
  onHover: (v: number) => void;
  onClick: (v: number) => void;
}) {
  const filled = value <= hovered;
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      onClick={() => onClick(value)}
      className="transition-transform hover:scale-110 focus:outline-none"
    >
      <svg className={`w-8 h-8 transition-colors ${filled ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
}

const RATING_LABELS: Record<number, string> = {
  1: "גרוע",
  2: "בינוני",
  3: "סביר",
  4: "טוב",
  5: "מצוין",
};

function ReviewCard({ review, isOwn, onDelete }: { review: DbReview; isOwn: boolean; onDelete: () => void }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await supabase.from("reviews").delete().eq("id", review.id);
    onDelete();
  }

  const date = new Date(review.created_at).toLocaleDateString("he-IL", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-sm">{review.reviewer_name[0]}</span>
          </div>
          <div>
            <div className="text-white font-medium text-sm">{review.reviewer_name}</div>
            <div className="text-gray-500 text-xs">{date}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StarRating rating={review.rating} />
          {isOwn && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-gray-600 hover:text-red-400 transition-colors text-xs disabled:opacity-50 mr-1"
              title="מחק ביקורת"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{review.body}</p>
    </div>
  );
}

export default function ReviewsTab({ agentId, agentName }: { agentId: number; agentName: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("agent_id", agentId)
      .order("created_at", { ascending: false });
    setReviews((data as DbReview[]) ?? []);
    setLoading(false);
  }, [agentId]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const userReview = user ? reviews.find((r) => r.reviewer_id === user.id) : null;
  const avgRating = reviews.length ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length
      ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || rating === 0) return;
    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("reviews").insert({
      agent_id: agentId,
      reviewer_id: user.id,
      reviewer_name: user.name,
      rating,
      body: body.trim(),
    });

    if (error) {
      setSubmitError(error.code === "23505" ? "כבר כתבתם ביקורת על מתווך זה" : "אירעה שגיאה, נסו שנית");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
    setRating(0);
    setBody("");
    fetchReviews();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div>
      {/* Rating summary */}
      {reviews.length > 0 && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-6 mb-6 flex flex-col sm:flex-row gap-6 items-center">
          <div className="text-center flex-shrink-0">
            <div className="text-5xl font-bold text-[#C9A84C] mb-1">{avgRating.toFixed(1)}</div>
            <StarRating rating={avgRating} size="md" />
            <div className="text-gray-500 text-xs mt-1">{reviews.length} ביקורות</div>
          </div>
          <div className="flex-1 w-full space-y-2">
            {ratingDist.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-gray-400 text-xs w-3 text-left flex-shrink-0">{star}</span>
                <svg className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 h-2 rounded-full bg-[#2A2A2A] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs w-6 text-left flex-shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write review — logged-in users who haven't reviewed yet */}
      {user && !userReview && (
        <div className="rounded-xl border border-[#C9A84C]/20 bg-[#161616] p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">כתבו ביקורת על {agentName}</h3>

          {submitted && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              הביקורת שלכם נשמרה, תודה!
            </div>
          )}

          {submitError && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs mb-2">דירוג</label>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <InteractiveStar
                      key={v}
                      value={v}
                      hovered={hovered || rating}
                      onHover={setHovered}
                      onClick={setRating}
                    />
                  ))}
                </div>
                {(hovered || rating) > 0 && (
                  <span className="text-gray-400 text-sm mr-1">{RATING_LABELS[hovered || rating]}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1.5">הביקורת שלכם</label>
              <textarea
                required
                minLength={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={`שתפו את חוויתכם עם ${agentName}...`}
                rows={4}
                className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors resize-none"
              />
              <div className="flex justify-end mt-1">
                <span className={`text-xs ${body.length < 10 ? "text-gray-600" : "text-gray-400"}`}>
                  {body.length} / 10 תווים מינימום
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || rating === 0 || body.trim().length < 10}
              className="px-6 py-2.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  שולח...
                </>
              ) : "פרסמו ביקורת"}
            </button>
          </form>
        </div>
      )}

      {/* Prompt to log in */}
      {!user && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-6 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-3">
            כדי לכתוב ביקורת יש{" "}
            <a href="/login" className="text-[#C9A84C] hover:text-[#E8C96A] font-medium transition-colors">
              להתחבר לחשבון
            </a>
          </p>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <svg className="w-6 h-6 animate-spin text-[#C9A84C]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">אין ביקורות עדיין — היו הראשונים!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwn={user?.id === review.reviewer_id}
              onDelete={fetchReviews}
            />
          ))}
        </div>
      )}
    </div>
  );
}
