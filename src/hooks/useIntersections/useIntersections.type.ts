export type OptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
} & Partial<IntersectionObserver>;

export type HandlerType = (
  entry: IntersectionObserverEntry,
  element: HTMLElement
) => void;
