// Utility to add minimum loading time to ensure loaders are visible
export const withMinimumLoadTime = (importFunction, minLoadTime = 1000) => {
  return async () => {
    const startTime = Date.now();
    const modulePromise = importFunction();

    // Wait for both the module and minimum time
    const [module] = await Promise.all([
      modulePromise,
      new Promise((resolve) => setTimeout(resolve, minLoadTime)),
    ]);

    const elapsedTime = Date.now() - startTime;

    // If loading was faster than minimum time, wait for the remaining time
    if (elapsedTime < minLoadTime) {
      await new Promise((resolve) =>
        setTimeout(resolve, minLoadTime - elapsedTime)
      );
    }

    return module;
  };
};

// Simulate slow network for development
export const simulateSlowNetwork = (delay = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
