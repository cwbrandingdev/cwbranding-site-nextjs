const SERVICE_IMAGES: Record<number, string> = {
  1: "/fotos-servicos/SOCIAL MEDIA.png",
  2: "/fotos-servicos/IDENTIDADE VISUAL.png",
  3: "/fotos-servicos/TRÁFEGO.png",
  4: "/fotos-servicos/LANDING PAGES.png",
  5: "/fotos-servicos/ASSESSORIA.png",
  6: "/fotos-servicos/ENSAIOS FOTOGRAFICOS.png",
  7: "/fotos-servicos/MATERIAIS GRÁFICOS.png",
  8: "/fotos-servicos/EVENTOS.png",
};

export function getServiceImageUrl(id: string | number): string {
  const path = SERVICE_IMAGES[Number(id)];
  if (!path) return "/cwbranding/servicos.png";
  return encodeURI(path);
}
