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

    // constructor(title: string, content: string, summary: string, description: string, imageUrl: string, tags: string[], date: Date) {
    //   this.title = title;
    //   this.content = content;
    //   this.summary = summary;
    //   this.description = description;
    //   this.imageUrl = imageUrl;
    //   this.userID = null;
    //   this.date = new Date();
    //   this.tags = tags;
    //   this.categories = categories;
    //   this.location = location;
    // }

}
