# Sushi Chatbot 

Un chatbot interactivo diseñado para atender pedidos de sushi y responder consultas frecuentes.

![Sushi Chatbot Demo]

Este proyecto busca simular la experiencia de ordenar sushi a través de un chatbot, ofreciendo un menú interactivo y respondiendo preguntas comunes.

## Características Destacadas ✨

*   **Pedidos Simplificados:** Permite a los usuarios realizar pedidos de sushi de forma rápida y sencilla a través de comandos intuitivos. (Tiene errores)
*   **Respuestas Inteligentes:** Responde a preguntas frecuentes sobre el menú, ingredientes, opciones dietéticas y más.
*   **Interfaz Amigable:** Ofrece una experiencia de usuario clara y concisa.

## Instalación 

Sigue estos pasos para configurar el proyecto localmente:

1.  **Clonar el repositorio:**

    ```bash
    git clone
    ```

2.  **Navegar al directorio del backend:**

    ```bash
    cd backend
    ```

3.  **Instalar las dependencias del backend:**

    ```bash
    npm install
    ```

4.  **Iniciar el servidor backend:**

    ```bash
    npm start
    ```

5.  **Abrir una nueva terminal y navegar al directorio del frontend:**

    ```bash
    cd frontend/chatbot_frontend
    ```

6.  **Instalar las dependencias del frontend:**

    ```bash
    npm install
    ```

7.  **Iniciar la aplicación frontend:**

    ```bash
    npm start
    ```

## Funcionalidades del Chatbot 

El chatbot responde a una variedad de comandos y consultas, incluyendo:

### Comandos Principales

*   **Ver Menú:**
    *   Palabras clave: `menu`, `ver menú`, `quiero ver el menú`
    *   Respuesta: Muestra la lista completa de productos con sus precios.

*   **Realizar Pedido: (AUN TIENE FALLOS) **
    *   Palabras clave: `pedido`, `ordenar`, `quiero pedir`
    *   Respuesta: "Por favor, escribe el producto y la cantidad separados por una coma (ej: Nigiri de Salmón, 2)."

### Preguntas Frecuentes

*   **Saludos:**
    *   Palabras clave: `hola`, `buenas`, `qué tal`
    *   Respuesta: "Hola, soy tu sushi-asistente, dime en qué te puedo ayudar."

*   **Despedidas:**
    *   Palabras clave: `adiós`, `hasta pronto`, `nos vemos`
    *   Respuesta: "Adiós, fue un gusto."

*   **Agradecimientos:**
    *   Palabras clave: `gracias`, `muchas gracias`
    *   Respuesta: "De nada."

*   **Información sobre productos:**
    *   Palabras clave: `pescado`, `atún`
    *   Respuesta: "Utilizamos pescado fresco de alta calidad, proveniente de [especificar origen si es posible]."

*   **Opciones dietéticas:**
    *   Palabras clave: `vegetariano`, `vegano`
    *   Respuesta: "Ofrecemos opciones vegetarianas y veganas, como [ejemplos de platos]."

## Tecnologías Utilizadas 

*   **Frontend:** React, Redux Toolkit
*   **Backend:** Node.js, [Añade el framework o librerías del backend como Express.js]
*   **Testing:** Jest, React Testing Library
*   **Base de Datos:** [Si usas alguna base de datos, como MongoDB, PostgreSQL, etc., inclúyela aquí]

## Próximas Mejoras 

*   Implementación de un sistema de carrito de compras.
*   Integración con un sistema de pagos.
*   Mejora en el procesamiento del lenguaje natural (NLP).
*   [Añade otras mejoras que tengas planeadas]

## Desarrollado por ‍

Tomas Riera

## Licencia 

[Añade la licencia bajo la que se distribuye el proyecto. Por ejemplo, MIT License]
