import { InputHTMLAttributes, ReactNode } from 'react';

/** Global types */

export interface ExpandContextType {
  isExpanded: boolean;
  handleExpandClick: () => void;
}

/** API Response Types  */

export interface CollectionType {
  id: number;
  name: string;
  description: string;
  created_at: string | number;
  entries: EntryType[];
}

export interface EntryType {
  id: number;
  collection_id: number;
  title: string;
  title_translated?: string,
  publication: string;
  link: string;
  full_text: string;
  full_text_translated?: string | null;
  ai_summary?: string | null;
  date_posted: any;
}

export interface ErrorType {
  error: number | string;
  text?: string;
  message?: string;
}

export interface SourceType {
  value: string;
  label: string;
}

/** Component prop types */

export interface CollectionCardProps {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  handleDelete: (data: { id: number; name: string; description: string; createdAt: string; }) => void;
}

export interface DeleteCollectionModalProps {
  showModal: boolean;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
  collectionData: {[key: string]: string | number};
}

export interface ContentAreaProps {
  children: ReactNode;
}

export interface AddCollectionModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => Promise<void>;
}

export interface EntryCardProps {
  id: number;
  datePosted: string | number;
  publication: string;
  title: string;
  titleTranslated?: string;
  fullText: string;
  fullTextTranslated?: string;
  aiSummary?: string;
  link: string;
}

export interface EntriesListProps {
  onSelectionChange: (selectedIds: number[]) => void;
  entries: EntryType[];
}

export interface IndeterminateCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate: boolean;
}