import React, { useState, useEffect } from "react";

export default function CardList() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("Network response was not ok (status " + res.status + ")");
                }
                return res.json();
            })
            .then(function (json) {
                var all = json.data || [];
                var extraNames = [
                    "imperial princess quinquery",
                    "chronomaly vimana",
                    "overlay booster",
                    "piri reis map",
                    "obedience schooled",
                    "where arf thou?",
                    "gravity controller",
                    "frightfur patchwork",
                    "polymerization",
                    "mysterion the dragon crown",
                    "edge imp chain",
                    "number 61: volcasaurus"
                ];
                var filtered = all.filter(function (card) {
                    var arch = (card.archetype || "").toLowerCase();
                    var raw = (card.name || "").toLowerCase();
                    return arch === "yummy"
                        || arch === "dragon tail"
                        || arch === "k9"
                        || extraNames.indexOf(raw) !== -1;
                });
                setCards(filtered);
            })
            .catch(function (err) {
                setError(err.message);
            })
            .finally(function () {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading cards…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Filtered Cards</h1>
            {cards.length === 0
                ? <p>No cards matched your filters.</p>
                : (
                    <ul>
                        {cards.map(function (card, idx) {
                            return (
                                <li key={card.id}>
                                    {idx + 1}. {card.name}
                                    {card.archetype ? " (" + card.archetype + ")" : ""}
                                </li>
                            );
                        })}
                    </ul>
                )
            }
        </div>
    );
}