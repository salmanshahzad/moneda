// allows importing .jpg in .tsx files
declare module "*.jpg" {
    const content: any;
    export default content;
}
