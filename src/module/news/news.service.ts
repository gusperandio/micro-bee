export const readTime = (content: string) : number =>{
    const wordsPerMinute = 200;
    const textLength = content.split(" ").length;
    return Math.ceil(textLength / wordsPerMinute);
}