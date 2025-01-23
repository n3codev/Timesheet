const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "3t+38wHHmqIdBzjkjrh88A==xZLMMEfvTDkAIsub";

export const fetchRandomQuote = async (maxLength = 100) => {
  try {
    let quoteData;

    do {
      const response = await fetch(API_URL, {
        headers: { "X-Api-Key": API_KEY },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        quoteData = data[0];
      }
    } while (quoteData && quoteData.quote.length > maxLength);

    return { quote: quoteData.quote, author: quoteData.author };
  } catch (error) {
    console.error("Greška prilikom povlačenja citata:", error);
    return {
      quote: "Keep it simple and short.",
      author: "Unknown",
    };
  }
};
