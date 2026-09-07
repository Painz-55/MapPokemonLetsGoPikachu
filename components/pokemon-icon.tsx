import { pokemonImage } from '@/lib/pokemon';
import Image from 'next/image';
export function PokemonIcon({ name }: { name: string }) {
  const src = pokemonImage(name);
  return src ? (
    <Image
      className="pokemon-icon"
      src={src}
      alt=""
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
    />
  ) : null;
}
