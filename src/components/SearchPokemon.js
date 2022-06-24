import { useEffect, useState } from 'react';
import axios from 'axios';


const baseUrl = "https://pokeapi.co/api/v2/ability/";
export default function SearchPokemon() {
    const [search, setSearch] = useState("");
    const [pokemonName, setPokemonName] = useState([]);

    const [pokemonEffectEntries, setPokemonEffectEntries] = useState([]);
    const [pokemonFlavorText, setPokemonFlavorText] = useState([]);

    const findPokemon = () => {
        axios(
            {
                method: "GET",
                url: `${baseUrl}${search}`
            }
        ).then(result => {
            setPokemonName(result.data.pokemon);
            setPokemonEffectEntries(result.data.effect_entries);
            setPokemonFlavorText(result.data.flavor_text_entries);
        })
    }

    return (
        <div>
            <h1>POKEMON COMPONENT</h1>
            <div>
                <input placeholder="skill" onChange={(x) => setSearch(x.target.value)} />
                <button onClick={() => findPokemon()}>Find Now!</button>
            </div>
            <div><b>Pokemon name list:</b>
                {pokemonName.map((data, i) => {
                    return (
                        <span key={i}>{data.pokemon.name},</span>
                    )
                })}
            </div>
            <div><b>Pokemon Effect Entries:</b>
                {pokemonEffectEntries.map((data, i) => {
                    return (
                        <span key={i}>{data.short_effect},</span>
                    )
                })}
            </div>
            <div><b>Pokemon Flavor Text:</b>
                {pokemonFlavorText.map((data, i) => {
                    if(data.language.name === "en")
                    {
                        return <span key={i}>{data.flavor_text}</span>
                    }
                })}
            </div>
        </div>
    )

}