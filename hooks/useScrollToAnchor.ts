/**
 * @param offset
 */
export const useScrollToAnchor = (offset: number = 0) => {
  return (targetHashAnchor: string): void => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const targetElement = document.querySelector(`${targetHashAnchor}`);
    const startWithHashRegex: RegExp = /^#\w+/g;

    if (!startWithHashRegex.test(targetHashAnchor) || !targetElement) {
      return;
    }

    const elementPosition: number = targetElement.getBoundingClientRect().top;
    const offsetPosition: number = elementPosition + window.pageYOffset - offset;

    requestAnimationFrame((): void => {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  };
};
