export class CreateArticleDto {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

export class UpdateArticleDto {
    id: number;
    title: string;
    content: string;

    constructor(id: number, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
