import "./RandomPokemon.css";

export default function RandomPokemon() {
  const randomNumber = Math.floor(Math.random() * 151) + 1;
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`;
  return (
    <div className="RandomPokemon">
      <p>
        <h1>Pokemon #{randomNumber}</h1>
      </p>
      <p>
        <img src={imgSrc} />
      </p>
    </div>
  );
}