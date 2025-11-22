/**
 * Batch data utilities for processing and formatting batch information
 */

/**
 * Get batch data by ID
 * @param {Array} batches - Array of batch objects
 * @param {string} batchId - Batch ID to find
 * @returns {Object|null} Found batch or null
 */
export const getBatchById = (batches, batchId) => {
  return batches.find((batch) => batch.id === batchId) || null;
};

/**
 * Get batch notes by ID
 * @param {Object} batchNotes - Batch notes object
 * @param {string} batchId - Batch ID
 * @returns {Object|null} Found batch notes or null
 */
export const getBatchNotesById = (batchNotes, batchId) => {
  return batchNotes[batchId] || null;
};

/**
 * Calculate progress percentage from string
 * @param {string} progressString - Progress string like "75%"
 * @returns {number} Progress as number
 */
export const parseProgress = (progressString) => {
  return parseInt(progressString) || 0;
};

/**
 * Get difficulty color for practice problems
 * @param {string} difficulty - Difficulty level
 * @returns {string} MUI color name
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "primary";
  }
};

/**
 * Format section content for mobile display
 * @param {string} content - Section content
 * @param {number} maxLength - Maximum length for preview
 * @returns {Object} Formatted content with preview and full text
 */
export const formatSectionContent = (content, maxLength = 200) => {
  if (content.length <= maxLength) {
    return {
      preview: content,
      full: content,
      needsExpansion: false,
    };
  }

  return {
    preview: content.substring(0, maxLength) + "...",
    full: content,
    needsExpansion: true,
  };
};

/**
 * Generate section navigation data
 * @param {Array} sections - Array of sections
 * @returns {Array} Navigation items
 */
export const generateSectionNavigation = (sections) => {
  return sections.map((section, index) => ({
    id: section.id,
    title: section.title,
    order: index + 1,
    anchor: `section-${section.id}`,
  }));
};
