export interface Post {
   id: string;
   title: string;
   content: string; // HTML content from WYSIWYG
   createdAt: string;
   updatedAt?: string;
}
