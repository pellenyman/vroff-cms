export const fallbackImages = {
  hero: "/assets/a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png",
  feature1: "/assets/50bd69f5fdd8bee31086dcd752e9faef3c2d5853.png",
  feature2: "/assets/a3c84ae7751b81b4cbd620fcee7d2577b3f201dc.png",
  feature3: "/assets/573e77a25801c64ed5aee33c55804dfe3fcf92d1.png",
  avatar: "/assets/283a376b0fafb9874fefe43652d98fad3cdad31c.png",
  security1: "/assets/4c252a4b255cda49a808c6317a1e8e87c8b89453.png",
  security2: "/assets/487818f4b6cf2397615f34f309fe40a712ebec95.png",
  security3: "/assets/5281ab6aa0636038040ed64dad74e65a1211041f.png",
  film: "/assets/1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png",
  case1: "/assets/4dc6e4130302c1fff2514ea9247cc5842789902a.png",
};

export function img(storyblokAsset: any, fallback: string): string {
  return storyblokAsset?.filename || fallback;
}
