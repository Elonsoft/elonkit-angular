export const FOCUSABLE =
  'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])';

export function getInnerFocusableElement(element: HTMLElement): HTMLElement {
  const elements = Array.from(element.querySelectorAll(FOCUSABLE)).filter(
    e => !e.hasAttribute('disabled')
  );

  return (elements[0] as HTMLElement) || null;
}

export function getPrevFocusableElement(element: HTMLElement): HTMLElement {
  const elements = Array.from(document.querySelectorAll(FOCUSABLE)).filter(
    e => !e.hasAttribute('disabled')
  );

  for (const e of elements) {
    if (element.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING) {
      return e as HTMLElement;
    }
  }

  return null;
}

export function getNextFocusableElement(element: HTMLElement): HTMLElement {
  const elements = Array.from(document.querySelectorAll(FOCUSABLE)).filter(
    e => !e.hasAttribute('disabled')
  );

  for (const e of elements) {
    if (element.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING) {
      return e as HTMLElement;
    }
  }

  return null;
}
