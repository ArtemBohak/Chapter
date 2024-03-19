export type OptionsType = {
  commentsIsShow?: boolean;
  postsIsLoad?: boolean;
} & Partial<IntersectionObserverInit>;

export type HandlerType = (
  entry: IntersectionObserverEntry,
  element: HTMLElement
) => void;
