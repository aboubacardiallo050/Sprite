<template>
  <div class="sprite-text-container">
    <div 
      class="sprite-text"
      :style="containerStyle"
    >
      <div
        v-for="(char, index) in characters"
        :key="index"
        class="sprite-character"
        :style="getCharacterStyle(char)"
        :class="{ 'character-error': !isCharacterValid(char) }"
        :title="getCharacterTitle(char)"
      >
        <!-- Fallback visuel pour le debug -->
        <span v-if="showDebug && !isCharacterValid(char) && char !== ' '" class="debug-char">
          {{ char }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpriteText',
  props: {
    label: {
      type: String,
      default: 'HELLO'
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDebug: true // Mettre à false une fois que tout fonctionne
    }
  },
  computed: {
    characters() {
      return this.label.toUpperCase().split('');
    },
    containerStyle() {
      return {
        fontSize: `${this.config.fontSize}px`,
        height: `${this.config.fontSize}px`,
        lineHeight: `${this.config.fontSize}px`
      };
    }
  },
  methods: {
    isCharacterValid(char) {
      if (char === ' ') return true;
      return !!this.config.spriteMap[char];
    },
    
    getCharacterTitle(char) {
      if (char === ' ') return 'Espace';
      if (!this.isCharacterValid(char)) return `Caractère non supporté: ${char}`;
      return char;
    },
    
    getCharacterStyle(char) {
      // Gestion des espaces
      if (char === ' ') {
        return {
          width: `${this.config.fontSize * 0.5}px`,
          minWidth: `${this.config.fontSize * 0.5}px`,
          backgroundColor: 'transparent'
        };
      }

      const charData = this.config.spriteMap[char];
      
      // Caractère non trouvé - mode erreur
      if (!charData) {
        return {
          width: `${this.config.fontSize}px`,
          height: `${this.config.fontSize}px`,
          minWidth: `${this.config.fontSize}px`,
          backgroundColor: '#ffebee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #f44336'
        };
      }
      
      const { x, y, width = 1, height = 1 } = charData;
      
      // Style pour l'affichage réel du sprite
      return {
        width: `${width * this.config.fontSize}px`,
        height: `${height * this.config.fontSize}px`,
        minWidth: `${width * this.config.fontSize}px`,
        backgroundImage: `url(${this.config.spritePath})`,
        backgroundPosition: `${-x * 100}% ${-y * 100}%`,
        backgroundSize: `${this.config.columns * 100}% ${this.config.rows * 100}%`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated' // Pour un rendu pixel perfect
      };
    }
  }
}
</script>

<style scoped>
.sprite-text-container {
  display: inline-block;
  padding: 10px;
}

.sprite-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
}

.sprite-character {
  display: inline-block;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.sprite-character:hover {
  transform: scale(1.05);
  z-index: 10;
  position: relative;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.character-error {
  background: #ffebee !important;
  border: 2px dashed #f44336 !important;
}

.debug-char {
  font-size: 12px;
  color: #d32f2f;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

/* Rendu pixel perfect pour les sprites */
.sprite-character {
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

@media (max-width: 768px) {
  .sprite-text {
    justify-content: flex-start;
  }
}
</style>