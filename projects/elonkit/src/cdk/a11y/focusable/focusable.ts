export const FOCUSABLE =
  'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])';

export function getFocusableElemets(parent: Document | HTMLElement): HTMLElement[] {
  return Array.from(parent.querySelectorAll(FOCUSABLE)).filter(
    (e) => !e.hasAttribute('disabled')
  ) as HTMLElement[];
}

export function getInnerFocusableElement(element: HTMLElement) {
  const elements = getFocusableElemets(element);

  return (elements[0] as HTMLElement) || null;
}

export function getPrevFocusableElement(element: HTMLElement) {
  const elements = getFocusableElemets(document);

  return elements.find(
    (e) => element.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING
  );
}

export function getNextFocusableElement(element: HTMLElement) {
  const elements = getFocusableElemets(document);

  return elements.find(
    (e) => element.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING
  );
}
