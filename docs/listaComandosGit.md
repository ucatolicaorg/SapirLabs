#  Git Workflow para Equipos de 4 Personas

Este archivo contiene los comandos esenciales para trabajar en equipo con **Git** y evitar conflictos innecesarios.

---

##  1. Configuración Inicial
###  Clonar el repositorio
```bash
git clone https://github.com/tu-organizacion/tu-repositorio.git
cd tu-repositorio
```

###  Configurar la rama `main`
```bash
git checkout main
git pull origin main
```

---

##  2. Crear una Rama Nueva para Cada Funcionalidad
Cada desarrollador trabaja en su propia rama:
```bash
git checkout -b feature/nombre-de-la-funcion
```
Ejemplo:
```bash
git checkout -b feature/login-usuario
```

---

##  3. Desarrollar y Hacer Commits Regularmente
Después de realizar cambios en el código:
```bash
git add .
git commit -m "Descripción del cambio realizado"
```
Ejemplo:
```bash
git commit -m "Agregado formulario de login"
```

---

##  4. Mantener la Rama Actualizada con `main`
Antes de hacer push, asegúrate de tener la última versión de `main`:
```bash
git checkout main
git pull origin main
git checkout feature/nombre-de-la-funcion
git rebase main
```
Si hay conflictos, resuélvelos y continúa:
```bash
git rebase --continue
```

---

##  5. Hacer Push a la Rama Remota
```bash
git push origin feature/nombre-de-la-funcion
```
Si es la primera vez:
```bash
git push --set-upstream origin feature/nombre-de-la-funcion
```

---

##  6. Crear un Pull Request (PR)
Desde GitHub/GitLab:
1. Ir al repositorio.
2. Crear un **Pull Request** de `feature/nombre-de-la-funcion` hacia `main`.
3. Solicitar revisiones de los compañeros.

O desde la terminal con GitHub CLI:
```bash
gh pr create --base main --head feature/nombre-de-la-funcion --title "Título del PR" --body "Descripción del cambio"
```

---

##  7. Fusionar Cambios a `main`
Después de aprobar el PR:
```bash
git checkout main
git pull origin main
git merge feature/nombre-de-la-funcion
```
Luego, borrar la rama:
```bash
git branch -d feature/nombre-de-la-funcion
git push origin --delete feature/nombre-de-la-funcion
```

---

##  8. Actualizar el Código Local Después del Merge
```bash
git checkout main
git pull origin main
```
Si trabajas en otra rama, mantenla actualizada:
```bash
git checkout feature/otra-funcionalidad
git rebase main
```

---

##  Resumen del Flujo de Trabajo
1.  **Cada desarrollador trabaja en su propia rama.**
2.  **Usar `git pull --rebase` para evitar conflictos.**
3.  **Subir cambios con `git push origin feature/nombre`.**
4.  **Crear un Pull Request y solicitar revisión.**
5.  **Fusionar a `main` cuando pase la revisión.**
6.  **Actualizar el código local con `git pull origin main`.**

