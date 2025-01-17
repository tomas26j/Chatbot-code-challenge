import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, addBotMessage, setUserMessage } from '../redux/chatSlice';

const ChatBot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const userMessage = useSelector((state) => state.chat.userMessage);
  
  const [menu, setMenu] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]); // Para almacenar el pedido actual

  useEffect(() => {
    fetchMenu();
    fetchPedidos();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setMenu(response.data);
    } catch (error) {
      console.error('Error obteniendo el menú:', error);
    }
  };

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error obteniendo los pedidos:', error);
    }
  };

  const sendMessage = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    dispatch(addUserMessage(trimmedMessage));

    const action = filtrador(trimmedMessage);
    await dispatcher(action, trimmedMessage);

    dispatch(setUserMessage(''));
  };

  const tomarPedido = async () => {
    setCurrentOrder([]); // Reiniciar el pedido actual
    dispatch(addBotMessage('Por favor, escribe el producto y la cantidad separados por una coma (por ejemplo: California Roll, 2). Escribe "Nada más" o "Finalizar Pedido" para finalizar.'));

    while (true) {
      const response = await new Promise((resolve) => {
        const handleResponse = (message) => {
          if (message.toLowerCase() === 'nada más' || message.toLowerCase() === 'finalizar pedido') {
            resolve(message);
          } else {
            // Agregar el producto al pedido actual
            const [product, quantity] = message.split(',').map(item => item.trim());
            if (product && quantity) {
              setCurrentOrder((prev) => [...prev, { product, quantity }]);
              dispatch(addBotMessage(`Agregado: ${quantity} de ${product}.`));
            }
            resolve('continue'); // Continuar el bucle
          }
        };
        // Esperar el mensaje del usuario y validar formato
        const messageHandler = (message) => {
          // Verificar si es mensaje de finalización
          if (message.toLowerCase().includes('finalizar pedido')) {
            handleResponse(message);
            return;
          }

          // Validar formato: "producto x cantidad, producto x cantidad"
          const pedidoRegex = /^([\w\s]+)\s*x\s*(\d+)(?:,\s*([\w\s]+)\s*x\s*(\d+))*$/i;
          
          if (!pedidoRegex.test(message)) {
            dispatch(addBotMessage('Formato incorrecto. Por favor usa el formato: "Producto x Cantidad" (ejemplo: "California Roll x 2, Nigiri de Salmón x 1")'));
            return;
          }

          // Procesar pedidos individuales
          const pedidos = message.split(',').map(p => p.trim());
          pedidos.forEach(pedido => {
            const [producto, cantidad] = pedido.split('x').map(item => item.trim());
            handleResponse(`${producto}, ${cantidad}`);
          });
        };

        // Configurar listener para el mensaje del usuario
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const lastMessage = state.messages[state.messages.length - 1];
          if (lastMessage && lastMessage.type === 'user') {
            messageHandler(lastMessage.text);
          }
        });

        // Limpiar el listener cuando se resuelva la promesa
        return () => unsubscribe();
      });

      if (response.toLowerCase() === 'finalizar pedido') {
        break;
      }
    }

    // Enviar el pedido a la API
    await enviarPedido(currentOrder);
  };

  const enviarPedido = async (order) => {
    try {
      const response = await axios.post('http://localhost:5000/orders', { order });
      dispatch(addBotMessage(`Tu pedido ha sido realizado: ${JSON.stringify(order)}`));
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      dispatch(addBotMessage('Hubo un error al realizar tu pedido. Intenta nuevamente.'));
    }
  };

  const filtrador = (message) => {
    const keywordsMap = {
      menu: ['menu', 'ver menú', 'quiero ver el menú'],
      pedido: ['pedido', 'ordenar', 'quiero pedir'],
      faq: ['preguntas', 'vegano', 'frecuentes', 'hola','buenas','que tal', 'adios', 'nos vemos', 'gracias'],
    };

    for (const [action, keywords] of Object.entries(keywordsMap)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return action;
      }
    }

    return 'default'; // Acción predeterminada si no hay coincidencias
  };

  const dispatcher = async (action, trimmedMessage) => {
    const actions = {
      menu: mostrarMenu,
      pedido: tomarPedido,
      faq: () => preguntasFrecuentes(trimmedMessage),
      default: () => dispatch(addBotMessage('No entendí tu mensaje. Por favor, intenta de nuevo.')),
    };

    await (actions[action] || actions.default)();
  };

  const mostrarMenu = () => {
    const menuMessage =
      'Aquí tienes nuestro menú: ' +
      menu.map((item) => `${item.name} - $${item.price}`).join(', ');
    dispatch(addBotMessage(menuMessage)); // Usar dispatch para agregar el mensaje
  };

  const preguntasFrecuentes = (message) => {
    const faqMap = [
      { keywords: ['pescado', 'atún'], response: 'Utilizamos pescado fresco de alta calidad.' },
      { keywords: ['vegetariano', 'vegano'], response: 'Ofrecemos opciones vegetarianas y veganas.' },
      { keywords: ['hola', 'buenas', 'que tal'], response: 'Hola, soy tu sushi-asistente, dime en que te puedo ayudar'},
      { keywords: ['adios', 'hasta pronto', 'nos vemos'], response: 'Adios, fue un gusto!'},
      { keywords: ['muchas gracias', 'gracias'], response: 'De nada!'}
    ];
  
    const faq = faqMap.find((item) =>
      item.keywords.some((keyword) => message.toLowerCase().includes(keyword))
    );
  
    const response = faq
      ? faq.response
      : 'No encontré información relacionada con tu pregunta. ¿Puedes ser más específico?';
  
    dispatch(addBotMessage(response)); // Usar dispatch para agregar el mensaje
  }; 

  return (
    <>
    <h1>Sushi Chatbot!</h1>
    <h6>Developed by Tomas riera</h6>
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        className='chat-input'
        value={userMessage} 
        onChange={(e) => dispatch(setUserMessage(e.target.value))} 
        placeholder="Escribe tu mensaje..." 
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </>
  );
};

export default ChatBot;
