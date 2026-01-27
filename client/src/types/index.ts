/**
 * Blog and Application Type Definitions
 */

export interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  blog: Blog;
  name: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationProps {
  totalCards: number;
  cardperPage: number;
  setCurrentPageBlog: (page: number) => void;
  currentPageBlog: number;
}

export interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

export interface BlogpageProps {
  setCurrentPage?: (page: string) => void;
}

export interface BlogListItem {
  id: number;
  title: string;
  date: string;
  status: string;
}

export interface ListBlogProps {
  blogs: BlogListItem[];
}

export interface StatCard {
  label: string;
  value: string | number;
  icon: any;
}

export interface DashboardProps {
  stats: StatCard[];
  blogs: BlogListItem[];
}
