import { useState } from "react";
import { getHeadImageUrl } from "../utils/headImage";

/**
 * Exibe a imagem real do head ou um avatar fallback com iniciais.
 */
export default function HeadAvatar({ firstName, lastName }) {
  const [errored, setErrored] = useState(false);
  const imgUrl = getHeadImageUrl(firstName, lastName);

  if (errored) {
    // Fallback: Avatar inicial
    return (
      <span className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">
        {firstName[0]}{lastName[0]}
      </span>
    );
  }

  return (
    <img
      src={imgUrl}
      alt={`${firstName} ${lastName}`}
      className="w-10 h-10 rounded-full object-cover bg-white"
      onError={() => setErrored(true)}
    />
  );
}