/**
 * Blog posts live at /post/<slug>/, identical to the legacy Wix URL
 * structure, so legacy links keep working with no redirects.
 */
export const blogIndexPath = '/posts/';
export const postPath = (slug: string) => `/post/${slug}/`;
