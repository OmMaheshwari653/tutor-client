import { useState, useCallback } from "react";

/**
 * Custom hook for managing chat functionality
 * @param {string} batchId - The current batch ID
 * @param {Array} initialMessages - Initial chat messages
 * @returns {Object} Chat state and functions
 */
export const useChat = (batchId, initialMessages = []) => {
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const addMessage = useCallback((message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "student",
      message: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    addMessage(newMsg);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Main aapke doubt ko solve kar raha hun. Concept clear kar deta hun step by step.",
        "Ye topic important hai! Main example ke saath explain karta hun.",
        "Good question! Iska answer detailed mein deta hun.",
        "Samajh aa raha hai confusion. Main breakdown kar ke batata hun.",
        "Perfect timing! Ye concept practice ke saath clear hoga.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai",
        message: randomResponse,
        timestamp: new Date(),
        type: "text",
      };
      addMessage(aiResponse);
    }, 1000);
  }, [newMessage, addMessage]);

  const sendExplanation = useCallback(
    (sectionTitle) => {
      const explanationMsg = {
        id: Date.now(),
        sender: "ai",
        message: `Main ${sectionTitle} ka detailed explanation deta hun. Isko step by step samjhata hun:\n\n1. Concept clear karte hain\n2. Examples dekhte hain\n3. Practice problems solve karte hain\n\nKoi specific doubt ho toh poochna!`,
        timestamp: new Date(),
        type: "text",
        relatedSection: sectionTitle,
      };
      addMessage(explanationMsg);
    },
    [addMessage]
  );

  const sendDoubtMessage = useCallback((sectionTitle) => {
    setNewMessage(
      `Sir, ${sectionTitle} section mein doubt hai. Kya aap explain kar sakte hain?`
    );
  }, []);

  return {
    chatMessages,
    newMessage,
    setNewMessage,
    setChatMessages,
    sendMessage,
    sendExplanation,
    sendDoubtMessage,
  };
};
