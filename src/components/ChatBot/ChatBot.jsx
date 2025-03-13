import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null); 
  const [isOpen, setIsOpen] = useState(false);
  let loadInterval;

  useEffect(() => {
    const form = formRef.current;
    const chatContainer = chatContainerRef.current;

    if (!form || !chatContainer) return;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
      form.reset();

      const uniqueId = generateUniqueId();
      chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

      const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }

      const messageDiv = document.getElementById(uniqueId);
      loader(messageDiv);

      try {
        const response = await fetch('http://localhost:5000/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: data.get('prompt'),
          }),
        });

        clearInterval(loadInterval);
        messageDiv.innerHTML = " ";

        if (response.ok) {
          const data = await response.json();
          const parsedData = data.bot.trim();
          typeText(messageDiv, parsedData);

          if (isNearBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          const err = await response.json();
          console.error('Server Error:', err);
          messageDiv.innerHTML = "Something went wrong";
        }
      } catch (err) {
        clearInterval(loadInterval);
        messageDiv.innerHTML = "Network error";
        console.error('Failed to connect to server:', err);
      }
    };

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    });

    return () => {
      form.removeEventListener('submit', handleSubmit);
      form.removeEventListener('keyup', handleSubmit);
    };
  }, [isOpen]);

  function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
      element.textContent += '.';
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }

  function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  }

  function chatStripe(isAi, value, uniqueId) {
    return `
        <div class="wrapper ${isAi ? 'ai' : ''} flex ${isAi ? 'justify-start' : 'justify-end'} mb-4">
            <div class="chat flex items-start max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'}">
                <div class="profile mx-2 flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-300 shadow-md text-blue-700">
                    ${isAi ? '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304z"></path></svg>' 
                          : '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>'}
                </div>
                <div 
                    class="message p-4 rounded-2xl ${
                      isAi 
                        ? 'bg-blue-100 text-gray-900 shadow-md' 
                        : 'bg-[#A5CCFF] text-white shadow-lg'
                    }" 
                    id="${uniqueId}"
                >${value}</div>
            </div>
        </div>
    `;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed cursor-pointer bottom-6 right-6 p-4 bg-[#A5CCFF] text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[400px] h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-blue-200">
          <div className="p-4 bg-blue-100 border-b border-blue-200 flex justify-between items-center">
            <h2 className="text-blue-900 font-bold text-xl">Healix</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-900 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            ref={chatContainerRef}
            id="chat-container"
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
            <div ref={messagesEndRef}></div> 
          </div>

          <form
            ref={formRef}
            className="p-4 bg-blue-50 border-t border-blue-200 flex items-center"
          >
            <textarea
              name="prompt"
              rows="1"
              cols="1"
              placeholder="Ask me anything about health..."
              className="flex-1 p-3 bg-white border border-blue-300 rounded-l-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-400 shadow-md transition-all duration-200"
            />
            <button
              type="submit"
              className="p-3 bg-[#A5CCFF] text-white rounded-r-2xl hover:bg-blue-700 shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              <FaPaperPlane className="w-5 h-7" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;