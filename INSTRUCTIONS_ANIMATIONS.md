# 🎬 LCHQ — Installation des Animations

## ✅ Étape 1 : Upload des fichiers CSS et JS

1. Va sur `https://github.com/ultra631/LCHQ`
2. Clique **Add file → Upload files**
3. Glisse-dépose ces 2 fichiers (que je t'ai donnés) :
   - `lchq-animations.css`
   - `lchq-animations.js`
4. Commit message : `feat: add animations pack`
5. Clique **Commit changes**

---

## ✅ Étape 2 : Modifier index.html (2 lignes seulement)

### LIGNE 1 À AJOUTER — Dans le `<head>`, après les Google Fonts

**Trouve cette ligne (ligne 9) :**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Ajoute JUSTE EN DESSOUS :**
```html
<link rel="stylesheet" href="lchq-animations.css">
```

---

### LIGNE 2 À AJOUTER — Avant `</body>`, tout à la fin du fichier

**Trouve cette ligne (tout en bas, avant-dernière ligne) :**
```html
</body>
</html>
```

**Ajoute JUSTE AVANT `</body>` :**
```html
<script src="lchq-animations.js"></script>
</body>
</html>
```

---

## 📍 Résumé visuel

**AVANT :**
```html
<head>
  ...
  <link href="...fonts.googleapis.com..." rel="stylesheet">
  <style>
    /* ton CSS */
  </style>
</head>
<body>
  <!-- tout ton HTML -->
</body>
</html>
```

**APRÈS (avec les 2 lignes ajoutées) :**
```html
<head>
  ...
  <link href="...fonts.googleapis.com..." rel="stylesheet">
  <link rel="stylesheet" href="lchq-animations.css">  ← LIGNE 1 (nouvelle)
  <style>
    /* ton CSS */
  </style>
</head>
<body>
  <!-- tout ton HTML -->
  <script src="lchq-animations.js"></script>  ← LIGNE 2 (nouvelle)
</body>
</html>
```

---

## ✅ Étape 3 : Commit

1. Scroll en bas de la page
2. Commit message : `feat: integrate animations`
3. Clique **Commit changes**

✨ **C'est fini !** Le site se met à jour automatiquement en ~30 secondes.

---

## 🎯 Test rapide

Va sur `https://ultra631.github.io/LCHQ/` et vérifie :
- ✅ Particules rouges qui bougent en fond
- ✅ Logo qui tourne au hover
- ✅ Cartes qui s'animent au scroll
- ✅ Tableaux avec lignes qui apparaissent
- ✅ Hero avec glow animé

Si tu vois ça, **les animations sont actives** ! 🎉

---

## 🔧 Besoin d'aide ?

Si quelque chose ne fonctionne pas :
1. Vérifie que les 3 fichiers sont bien à la racine du repo (même niveau que index.html)
2. Ouvre la console du navigateur (F12) et cherche des erreurs 404
3. Vide le cache (Ctrl+Shift+R sur le site)
