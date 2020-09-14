import React from 'react'

interface ChatbotProps { }

const Chatbot: StorefrontFunctionComponent<ChatbotProps> = ({ children }) => {
  return (
    <div className={`w-25 h-50 bg-near-white br4 flex flex-column relative`}>{children}</div>
  )
}

Chatbot.schema = {
  title: 'editor.chatbot.title',
  description: 'editor.chatbot.description',
  type: 'object',
  properties: {},
}

export default Chatbot
