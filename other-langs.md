# Correction des chemins CSS dans les 12 autres langues

## Problème identifié
- Fichier racine : `/style.css` (et `consent.js`, `script.js`, `manifest.json`)
- Depuis un sous-dossier `/en/`, il faut **un seul `../`** pour remonter au niveau racine.
- Les fichiers créés précédemment utilisaient `../../style.css` (trop de `../`), donc le CSS ne se chargeait pas sur tous les langages.

## Correction appliquée
Remplacement de `../../style.css` → `../style.css` dans chaque sous-dossier langue (16 fichiers au total) :

| Dossier | Ancien chemin | Nouveau chemin |
|---|---|---|
| `en/` | `../../style.css` | `../style.css` |
| `zh/` | `../../style.css` | `../style.css` |
| `hi/` | `../../style.css` | `../style.css` |
| `es/` | `../../style.css` | `../style.css` |
| `ar/` | `../../style.css` | `../style.css` |
| `pt/` | `../../style.css` | `../style.css` |
| `ru/` | `../../style.css` | `../style.css` |
| `de/` | `../../style.css` | `../style.css` |
| `ja/` | `../../style.css` | `../style.css` |
| `it/` | `../../style.css` | `../style.css` |
| `sv/` | `../../style.css` | `../style.css` |
| `nl/` | `../../style.css` | `../style.css` |
| `pl/` | `../../style.css` | `../style.css` |
| `tr/` | `../../style.css` | `../style.css` |
| `ko/` | `../../style.css` | `../style.css` |
| `fr/` | déjà correct (`../style.css`) | inchangé |

## Vérification
`../style.css` depuis `/en/` pointe vers `/style.css` → OK (200 OK).

Côté `consent.js` et `script.js` (situés à la racine), les liens `../../consent.js` et `../../script.js` restent corrects car ces fichiers sont aussi à la racine et la logique de remontée est la même (1 `../` suffit). Le CSS est le seul qui nécessitait la correction.

## Rappel
- `style.css`, `consent.js`, `script.js`, `manifest.json` → à la racine.
- `index.html`, sous-pages légales, `logoNightRush.PNG`, `assets/` → également à la racine ou dans `assets/`.

Aucun changement n'est nécessaire pour les pages fr/ (déjà corrects avec `../style.css`).