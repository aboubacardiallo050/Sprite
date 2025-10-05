// Générateur de configuration pour le sprite mapping
export function generateSpriteMap(columns, rows, characterLayout) {
  const spriteMap = {};
  let charIndex = 0;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (charIndex < characterLayout.length) {
        const char = characterLayout[charIndex];
        if (char && char !== ' ') {
          spriteMap[char] = { 
            x: col, 
            y: row,
            width: 1,    // Largeur relative
            height: 1    // Hauteur relative
          };
        }
        charIndex++;
      }
    }
  }
  
  // Ajouter l'espace
  spriteMap[' '] = { width: 0.5 };
  
  return spriteMap;
}

// Layouts prédéfinis
export const LAYOUTS = {
  RUSSIAN: [
  'А','Б','В','Г','Д','Е','Ё','Ж','З','И',
  'Й','К','Л','М','Н','О','П','Р','С','Т',
  'У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь',
  'Э','Ю','Я',
  '0','1','2','3','4','5','6','7','8','9'
],

  ENGLISH: [
    'A','B','C','D','E','F','G','H','I',
    'J','K','L','M','N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z','?',
    '0','1','2','3','4','5','6','7','8','9'
  ],
  
  FRENCH: [
    'A','B','C','D','E','F','G','H','I',
    'J','K','L','M','N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z','É','È',
    '0','1','2','3','4','5','6','7','8','9'
  ],
  
  SYMBOLS: [
    '!','@','#','$','%','^','&','*','(',
    ')','-','_','=','+','[',']','{','}',
    ';',':',"'",'"',',','.','/','<','>','?'
  ]
};

// Créer une configuration complète
export function createSpriteConfig(spritePath, layout, columns = 10, rows = 4, fontSize = 32) {
  const spriteMap = generateSpriteMap(columns, rows, layout);
  
  return {
    spritePath,
    spriteMap,
    columns,
    rows,
    fontSize
  };
}