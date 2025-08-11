/**
 * Monta uma URL de imagem para um personagem do Fandom Wiki.
 * Usa nome + sobrenome, substitui espaços por underscore.
 * Exemplo: "Minerva McGonagall" => https://static.wikia.nocookie.net/harrypotter/images/9/92/Minerva_McGonagall_HP5_promo.jpg
 */
export function getHeadImageUrl(firstName, lastName) {
  const fullName = `${lastName.toLowerCase()}`;
  // Pattern genérico, maioria dos personagens conhecidos tem imagem no Fandom Wiki.
  return `https://ik.imagekit.io/hpapi/${fullName}.jpg`;
}