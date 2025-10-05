<template>
  <div id="app">
    <header class="app-header">
      <h1>Текст спрайта Vue.js — фактическое отображение</h1>
    </header>
    
    <main class="app-main">
      <section class="demo-section">
        <h2>Демонстрация в реальном времени</h2>
        
        <div class="controls">
          <label>
            Текст для отображения:
            <input v-model="displayText" type="text" placeholder="Entrez votre texte ici" class="text-input">
          </label>
          
          <label>
            Размер шрифта:
            <input v-model.number="fontSize" type="range" min="16" max="96" step="4">
            {{ fontSize }}px
          </label>

          <label>
            Макет:
            <select v-model="selectedLayout">
              <option value="Russian">Russian</option>
              <option value="ENGLISH">English</option>
              <option value="FRENCH">Français</option>
              <option value="SYMBOLS">Symboles</option>
            </select>
          </label>
        </div>
        
        <div class="sprite-display">
          <div class="display-label">Предварительный просмотр в реальном времени:</div>
          <SpriteText 
            :label="displayText"
            :config="spriteConfig"
          />
        </div>
      </section>
      
      <section class="examples-section">
        <h2>Тесты персонажей</h2>
        
        <div class="character-tests">
          <div class="test-group">
            <h3>Заглавные буквы</h3>
            <SpriteText label="ABCDEFGHI" :config="spriteConfig" />
            <SpriteText label="JKLMNOPQR" :config="spriteConfig" />
            <SpriteText label="STUVWXYZ" :config="spriteConfig" />
          </div>
          
          <div class="test-group">
            <h3>Числа</h3>
            <SpriteText label="0123456789" :config="spriteConfig" />
          </div>
          
          <div class="test-group">
            <h3>Полные слова</h3>
            <SpriteText label="BONJOUR" :config="spriteConfig" />
            <SpriteText label="VUE JS" :config="spriteConfig" />
            <SpriteText label="SPRITE TEXT" :config="spriteConfig" />
          </div>
        </div>
      </section>

      <section class="debug-section">
        <h2>Information de Debug</h2>
        <div class="debug-info">
          <p><strong>Image sprite:</strong> {{ spriteConfig.spritePath }}</p>
          <p><strong>Caractères dans le spriteMap:</strong> {{ Object.keys(spriteConfig.spriteMap).length }}</p>
          <p><strong>Caractères disponibles:</strong> {{ availableCharacters }}</p>
          <p><strong>Grille:</strong> {{ spriteConfig.columns }}×{{ spriteConfig.rows }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import SpriteText from './components/SpriteText.vue'
import { createSpriteConfig, LAYOUTS } from './utils/spriteMapGenerator'

export default {
  name: 'App',
  components: {
    SpriteText
  },
  data() {
    return {
      displayText: 'HELLO VUE JS',
      fontSize: 48,
      selectedLayout: 'ENGLISH'
    }
  },
  computed: {
    spriteConfig() {
      return createSpriteConfig(
        '/sprite-font.png', // VOTRE IMAGE SPRITE RÉELLE
        LAYOUTS[this.selectedLayout],
        10,  // colonnes - DOIT CORRESPONDRE À VOTRE IMAGE
        4,   // lignes - DOIT CORRESPONDRE À VOTRE IMAGE
        this.fontSize
      );
    },
    availableCharacters() {
      const chars = Object.keys(this.spriteConfig.spriteMap)
        .filter(char => char !== ' ')
        .sort();
      return chars.join(' ');
    },
    configPreview() {
      return JSON.stringify(this.spriteConfig, null, 2);
    }
  },
  mounted() {
    console.log('🔍 Configuration sprite chargée:', this.spriteConfig);
    console.log('📋 Caractères disponibles:', this.availableCharacters);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.app-header h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.app-main {
  display: grid;
  gap: 30px;
}

.demo-section, .examples-section, .debug-section {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.controls label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.text-input {
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
}

.controls input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e1e8ed;
}

.controls select {
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background: white;
}

.sprite-display {
  padding: 40px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 3px dashed #dee2e6;
  text-align: center;
  margin-top: 20px;
}

.display-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 15px;
  font-weight: 600;
}

.character-tests {
  display: grid;
  gap: 25px;
}

.test-group {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.test-group h3 {
  margin-bottom: 15px;
  color: #495057;
  font-size: 1.2em;
}

.debug-info {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.debug-info p {
  margin-bottom: 8px;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .controls {
    grid-template-columns: 1fr;
  }
  
  .app-header h1 {
    font-size: 2em;
  }
  
  #app {
    padding: 10px;
  }
}
</style>