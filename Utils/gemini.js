const genAI = require("../Config/gemini.js");

const schema = `
Product Schema (MongoDB / Mongoose):

name: String (required)
slug: String (unique)
description: String
price: Number
discountedPrice: Number
category: ObjectId (Category)
brand: String
images: [{ url: String, alt: String }]
stock: Number
sku: String
attributes: [{ key: String, value: String }]
ratings: { average: Number, count: Number }
isFeatured: Boolean
isActive: Boolean
createdBy: ObjectId (User)
createdAt, updatedAt
`;

const SYSTEM_PROMPT = `
You are an AI shopping assistant.

Your task:
- Convert the user's query into MongoDB filters or aggregation pipelines
- Output ONLY valid JSON
- No explanation, no Markdown, no extra text
- Follow this schema strictly:

${schema}

Examples:
User: "cheap nike shoes under 3000"
Output:
{
  "brand": "Nike",
  "price": { "$lte": 3000 }
}
`;

const getAIInsights = async (query) => {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "user", parts: [{ text: `User Query: ${query}` }] },
      ],
      generationConfig: { responseMimeType: "application/json" },
    });
    const text = result.text;
    const cleanJson = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Gemini AI Error:", err);
    return null;
  }
};

module.exports = { getAIInsights };
