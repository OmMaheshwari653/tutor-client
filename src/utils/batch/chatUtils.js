/**
 * Chat utility functions for message handling and formatting
 */

/**
 * Generate AI response suggestions based on message content
 * @param {string} message - The input message
 * @returns {string} Suggested AI response
 */
export const generateAIResponse = (message) => {
  const responses = [
    "Main aapke doubt ko solve kar raha hun. Concept clear kar deta hun step by step.",
    "Ye topic important hai! Main example ke saath explain karta hun.",
    "Good question! Iska answer detailed mein deta hun.",
    "Samajh aa raha hai confusion. Main breakdown kar ke batata hun.",
    "Perfect timing! Ye concept practice ke saath clear hoga.",
  ];

  // Simple keyword-based response selection
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("formula") || lowerMessage.includes("derive")) {
    return "Formula derivation step by step explain karta hun. Concept clear ho jayega!";
  }
  if (lowerMessage.includes("example") || lowerMessage.includes("practical")) {
    return "Bilkul! Real-life examples ke saath samjhata hun. Practical approach lenge!";
  }
  if (lowerMessage.includes("practice") || lowerMessage.includes("problems")) {
    return "Great! Practice problems solve karte hain. Step-by-step solution dekhte hain!";
  }

  return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Format message timestamp
 * @param {Date} timestamp - Message timestamp
 * @returns {string} Formatted time string
 */
export const formatMessageTime = (timestamp) => {
  return timestamp.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Get quick suggestion chips for chat
 * @returns {Array<string>} Array of suggestion messages
 */
export const getQuickSuggestions = () => [
  "Ye formula kaise derive karte hain?",
  "Example aur chahiye",
  "Practice problems do sir",
  "Concept clear nahi hai",
  "Step by step explain karo",
  "Real life application batao",
];

/**
 * Create explanation message for a section
 * @param {string} sectionTitle - Title of the section
 * @param {string} sectionId - ID of the section
 * @returns {Object} Formatted explanation message
 */
export const createExplanationMessage = (sectionTitle, sectionId) => ({
  id: Date.now(),
  sender: "ai",
  message: `Main ${sectionTitle} ka detailed explanation deta hun. Isko step by step samjhata hun:\n\n1. Concept clear karte hain\n2. Examples dekhte hain\n3. Practice problems solve karte hain\n\nKoi specific doubt ho toh poochna!`,
  timestamp: new Date(),
  type: "text",
  relatedSection: sectionId,
});

/**
 * Create student message object
 * @param {string} message - Message content
 * @returns {Object} Formatted student message
 */
export const createStudentMessage = (message) => ({
  id: Date.now(),
  sender: "student",
  message,
  timestamp: new Date(),
  type: "text",
});

/**
 * Create AI message object
 * @param {string} message - Message content
 * @returns {Object} Formatted AI message
 */
export const createAIMessage = (message) => ({
  id: Date.now() + 1,
  sender: "ai",
  message,
  timestamp: new Date(),
  type: "text",
});
