export interface TweetCardProps {
  id?: string;
  name?: string;
  authorName?: string;
  handle?: string;
  avatar?: string;
  verified?: boolean;
  text?: string;
  content?: string;
  timestamp?: string;
  date?: string;
  likes?: number | string;
  retweets?: number | string;
  video?: boolean;
  videoUrl?: string;
  mediaUrl?: string;
  media?: any[];
  images?: string[];
  urlPreview?: any;
  autoPlay?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  showFooter?: boolean;
  className?: string;
  class?: string;
  apiUrl?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function TweetCard(props?: TweetCardProps): any;
