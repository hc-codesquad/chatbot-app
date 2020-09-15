import React from 'react'

interface MessagesProps {
  timezone?: string;
  locale?: string;
}

const Messages: StorefrontFunctionComponent<MessagesProps> = () => {
  return (
    <div className="ph2 overflow-hidden overflow-y-scroll mb5 pb2">
    </div>
  )
}

Messages.schema = {
  title: "Chatbot Messages",
  description: "A component that wrap all messages.",
  type: "object",
  properties: {
    timezone: {
      title: "Message Timezone",
      description: "A timezone for message time, example: America/Sao_Paulo, America/Los_Angeles",
      type: "number",
      default: null
    },
    locale: {
      title: "Message Locale",
      description: "A locale for message time, example: pt-BR, en-US, etc...",
      type: "string",
      default: null
    }
  }
}

export default Messages