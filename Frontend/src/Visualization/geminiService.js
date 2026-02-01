import { marked } from "marked";
import { API_URL } from "../utils";

export const callGemini = async ({
  prompt,
  setLoading,
  onSuccess,
  onError,
}) => {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}/api/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Too many requests. Please wait.");
      }
      throw new Error("Gemini service error.");
    }

    const data = await res.json();
    const html = marked.parse(data.response || "");
    onSuccess(html);

  } catch (err) {
    console.error("Gemini call failed:", err);
    onError(err.message || "Gemini API error");
  } finally {
    setLoading(false);
  }
};
