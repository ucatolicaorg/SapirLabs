# **Requisitos del Sistema – Plataforma de Aprendizaje para Ingeniería de Sistemas**

## **1️⃣ Requisitos Funcionales**

### **Módulo de Autenticación**
✅ Los estudiantes deben poder registrarse e iniciar sesión con correo y contraseña.  
✅ Implementar autenticación con OAuth (Google/Microsoft) como opción alternativa.  
✅ Los usuarios deben poder restablecer su contraseña mediante correo electrónico.  

### **Módulo de Aprendizaje**
✅ La app debe ofrecer tres áreas de estudio: **Inglés, Programación y Matemáticas**.  
✅ Cada área debe dividirse en tres niveles de dificultad: **Básico (40 ejercicios), Intermedio (30 ejercicios) y Avanzado (30 ejercicios)**.  
✅ Los estudiantes podrán resolver ejercicios y acumular experiencia (1 punto por ejercicio).  
✅ Una barra de progreso debe indicar el avance del estudiante dentro de cada nivel.  

### **Banco de Ejercicios**
✅ Cada nivel debe contar con un conjunto de ejercicios predefinidos.  
✅ Los ejercicios deben ser de opción múltiple, respuesta abierta o código (en el caso de programación).  
✅ Al responder, la app debe proporcionar retroalimentación instantánea.  

### **Sistema de Niveles y Experiencia**
✅ El estudiante comienza en **nivel básico** y avanza al siguiente nivel al completar los ejercicios requeridos.  
✅ Al completar los **100 ejercicios**, el usuario desbloquea el **sistema de maratones de programación**.  

### **Sistema de Maratones de Programación**
✅ Los estudiantes podrán participar en maratones semanales con problemas avanzados.  
✅ La app debe conectarse a una **API externa** que suministre nuevos ejercicios cada semana.  
✅ El desempeño en las maratones se reflejará en un **ranking global**.  

### **Sistema de Ranking y Clasificación**
✅ Los estudiantes serán clasificados en tres categorías según su desempeño en las maratones:  
   - **Recluta del Código** (principiantes en maratones).  
   - **Guerrero del Algoritmo** (nivel intermedio).  
   - **Señor de la Programación** (nivel experto).  
✅ El ranking debe actualizarse automáticamente según los puntos obtenidos en las maratones.  

---

## **2️⃣ Requisitos No Funcionales**

### **Usabilidad y Diseño**
✅ La interfaz debe ser **minimalista, intuitiva y accesible** en dispositivos móviles y escritorio.  
✅ Se deben aplicar principios de **diseño UX/UI** para facilitar la navegación y experiencia del usuario.  

### **Desempeño y Escalabilidad**
✅ La plataforma debe manejar múltiples usuarios simultáneamente sin afectar el rendimiento.  
✅ Debe permitir la integración futura con nuevas áreas de aprendizaje y ejercicios adicionales.  

### **Seguridad**
✅ Cifrado de contraseñas mediante **bcrypt** o similar.  
✅ Implementación de **JWT** para autenticación segura.  
✅ Protección contra ataques **XSS y CSRF**.  

### **Disponibilidad y Conectividad**
✅ La aplicación debe estar disponible **24/7** en la nube.  
✅ Implementación de un sistema de **backup automático** de la base de datos.  

---

## **3️⃣ Restricciones y Suposiciones**
📌 Se asume que los ejercicios de inglés y matemáticas se almacenarán en la base de datos, mientras que los de programación pueden ser suministrados por una **API externa**.  
📌 La aplicación se desarrollará con el stack **MERN (MongoDB, Express, React, Node.js)**.  
📌 La clasificación en el ranking dependerá de la cantidad de ejercicios resueltos en las maratones.  

---
