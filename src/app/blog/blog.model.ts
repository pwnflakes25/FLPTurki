export interface Blog {
     blogId: string;
     title: string;
     content: string;
     summary: string;
     description: string;
     imageUrl: string;
     authorId: string;
     date: Date;
     tags: string[];
     isPublished: boolean;
     views: number;
     likes: number;
     userLikes: string[];
     genres: string[];
     references: string[];

}
