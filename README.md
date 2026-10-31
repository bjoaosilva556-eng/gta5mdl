# GTA 5 MDL - Jogo 3D

Jogo estilo GTA em 3D com formato próprio de modelo `.gt5mdl`, armas customizadas, inimigos IA e HUD.

## Estrutura

```
GTA5MDL/
├── index.html
├── css/style.css
├── js/gt5mdl-loader.js
├── models/
│   ├── player.gt5mdl
│   ├── weapon_pistol.gt5mdl
│   ├── weapon_ak47.gt5mdl
│   └── enemy.gt5mdl
└── README.md
```

## Rodar localmente

Requisito: Python instalado.

No terminal, dentro da pasta do projeto:

```powershell
cd "C:\Users\hyper\Documents\Projeto Padrão\GTA5MDL"
python -m http.server 5000
```

Acesse no navegador: **http://localhost:5000**

## Publicar na nuvem (grátis)

### Netlify Drop (sem cadastro obrigatório)
1. Compacte esta pasta em `.zip`.
2. Acesse https://app.netlify.com/drop
3. Arraste o `.zip` para a área de upload.
4. Pronto: seu jogo estará online com uma URL pública.

### GitHub Pages
1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta.
3. Vá em **Settings → Pages** e selecione a branch `main`.
4. Acesse a URL gerada pelo GitHub Pages.

> ⚠️ O jogo não funciona abrindo o `index.html` diretamente no navegador (erro de CORS nos modelos `.gt5mdl`). Ele precisa de um servidor HTTP estático.

## Controles

- `WASD` — mover
- Mouse — mirar (clique para travar)
- Clique esquerdo — atirar
- `1-6` — trocar arma
- `R` — recarregar

## Formato .gt5mdl

Arquivo JSON que descreve modelos 3D simples (box, sphere, cylinder) com posição, escala, cor e propriedades customizadas (dano, cadência, munição, etc.). Exemplo em `models/weapon_pistol.gt5mdl`.
