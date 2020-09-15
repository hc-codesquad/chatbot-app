import React, { useEffect, useState } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import getHour from './utils/getHour';
import axios from 'axios'

const dataMock = [
  {
    id: 1,
    content: "Uma mensagem qualquer enviada pelo bot.",
    timestamp: new Date().getTime(),
    color: "bg-lightest-blue"
  },
  {
    id: 2,
    content: "Uma mensagem qualquer enviada pelo cliente.",
    timestamp: new Date().getTime(),
    color: "bg-washed-green"
  },
  {
    id: 3,
    content: "Uma mensagem qualquer enviada pelo cliente.",
    timestamp: new Date().getTime(),
    color: "bg-washed-green"
  },
  {
    id: 4,
    content: "Uma mensagem qualquer enviada pelo cliente.",
    timestamp: new Date().getTime(),
    color: "bg-lightest-blue"
  },
  {
    id: 5,
    content: "Uma mensagem qualquer enviada pelo cliente.",
    timestamp: new Date().getTime(),
    color: "bg-washed-green"
  },
  {
    id: 6,
    content:
      "Uma mensagem qualquer enviada pelo cliente. Uma mensagem qualquer enviada pelo cliente. Uma mensagem qualquer enviada pelo cliente. Uma mensagem qualquer enviada pelo cliente.",
    timestamp: new Date().getTime(),
    color: "bg-lightest-blue"
  }
];

interface ChatbotProps {
  headerTitle: string;
  headerDescription: string;
  headerAvatarUrl: string;
  headerAvatarAlt: string;
  senderPlaceholder: string;
}

const Chatbot: StorefrontFunctionComponent<ChatbotProps> = ({ headerTitle, headerDescription, headerAvatarUrl, headerAvatarAlt, senderPlaceholder }) => {
  const { selectedItem } = useProduct()
  const [available, setAvailable] = useState(true)
  const [data] = useState(dataMock)

  function isAvailable() {
    const { AvailableQuantity } = selectedItem.sellers[0].commertialOffer

    AvailableQuantity <= 0 ? setAvailable(false) : setAvailable(true)
  }

  async function createChat() {
    if(!available) {
      const { data: response } = await axios.post('https://xfzjvg2ow9.execute-api.us-east-1.amazonaws.com/dev/chatbot', {        
        text: `produto \${${selectedItem.itemId}}`
      })

      console.log(response)
    }
  }

  useEffect(() => {
    isAvailable()
    createChat()
  }, [available])

  return (
    <div className={`vh-50 vw-25 bg-near-white br4 flex flex-column relative`}>
      <div className={`w-100 h-20 br4 pa3 bg-blue washed-blue flex items-center justify-between`}>
        <div className="flex items-center">
          <div className="w2 w2 mr2">
            <img
              className="br-100"
              src={headerAvatarUrl}
              alt={headerAvatarAlt}
            />
          </div>
          <div>
            <div className="f4 f-headline">{headerTitle}</div>
            <div className="f7 f-subheadline">{headerDescription}</div>
          </div>
        </div>
        <div className="">
        </div>
      </div>

      <div className="h-100 ph2 mb5 pb2 overflow-y-scroll">
        <div className="bg-lightest-blue pa3 br4 flex flex-column">
          <div className="mb3">
            Gostaria de receber sugestões de produtos similares?
          </div>
          <div className="flex justify-between mb2 bg-action-secondary">
            <button
              className="grow pointer w-50 br3 br--left pa2 br bl-0 bt-0 bb-0 b--white-20 white bg-action-primary"
              type="button"
              value="sim"
            >
              Sim
            </button>
            <button
              className="grow pointer w-50 br3 br--right pa2 bl br-0 bt-0 bb-0 b--white-20 white bg-action-primary"
              type="button"
              value="não"
            >
              Não
            </button>
          </div>
          <div className="self-end">
            <span className="f7 f-subheadline">22:30</span>
          </div>
        </div>

        {data.map((message) => (
          <div key={message.id} className={`${message.color} br4 pa3 flex flex-column mt2`}>
            <div className="">
              <p className="">{message.content}</p>
            </div>
            <div className="self-end">
              <span className="f7 f-subheadline">{getHour({ timestamp: message.timestamp, timezone: 'America/Sao_Paulo', locale: 'pt-BR' })}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-100 h-20 br4 pa3 bg-blue washed-blue flex items-center justify-between">
      <div className="h2 w-80">
        <input
          className="h-100 w-100 br2 pa2 b--none outline-0 bg-transparent washed-blue"
          placeholder={senderPlaceholder}
        />
      </div>
      <div className="w-20 flex justify-center items-center">
      </div>
    </div>
    </div>
  )
}

Chatbot.schema = {
  title: 'editor.chatbot.title',
  description: 'editor.chatbot.description',
  type: 'object',
  properties: {
    headerTitle: {
      title: "editor.chatbot.header.title-title",
      description: "editor.chatbot.header.title-description",
      type: "string",
      default: null
    },
    headerDescription: {
      title: "editor.chatbot.header.description-title",
      description: "editor.chatbot.header.description-description",
      type: "string",
      default: null
    },
    headerAvatarUrl: {
      title: "editor.chatbot.header.avatarurl-title",
      description: "editor.chatbot.header.avatarurl-description",
      type: "string",
      default: null
    },
    headerAvatarAlt: {
      title: "editor.chatbot.header.avataralt-title",
      description: "editor.chatbot.header.avataralt-description",
      type: "string",
      default: null
    },
    senderPlaceholder: {
      title: "editor.chatbot.input.placeholder-title",
      description: "editor.chatbot.input.placeholder-description",
      type: "string",
      default: null
    }
  },
}

export default Chatbot
