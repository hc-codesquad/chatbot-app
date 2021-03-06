import React, { useEffect, useState } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import getHour from './utils/getHour';
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'
import { FiX, FiSend, FiMessageCircle } from 'react-icons/fi'
import { FormattedMessage } from 'react-intl'
import { Container } from './styles/styles'

interface ChatbotProps {
  headerTitle: string;
  headerDescription: string;
  headerAvatarUrl: string;
  headerAvatarAlt: string;
  senderPlaceholder: string;
}

interface Message {
  id: number;
  content: string;
  timestamp: number;
  color: string;
}

interface Suggestions {
  id: number;
  nameComplete: string;
  imageUrl: string;
  url: string;
}

const Chatbot: StorefrontFunctionComponent<ChatbotProps> = ({ headerTitle, headerDescription, headerAvatarUrl, headerAvatarAlt, senderPlaceholder = 'Digite aqui...' }) => {
  const { selectedItem } = useProduct()
  const [available, setAvailable] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestions[]>([])
  const [accepted, setAccepted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const CSS_HANDLES = ['chatbotContainer', 'chatbotHeader', 'chatbotMessages', 'chatbotMessage', 'chatbotFooter']
  const handles = useCssHandles(CSS_HANDLES)

  function isAvailable() {
    const { AvailableQuantity } = selectedItem.sellers[0].commertialOffer

    AvailableQuantity <= 0 ? setAvailable(false) : setAvailable(true)

    !available ? setIsOpen(true) : setIsOpen(false)
  }

  async function createChat() {
    if (!available) {
      const { data } = await axios.post('https://xfzjvg2ow9.execute-api.us-east-1.amazonaws.com/dev/chatbot', {
        text: `produto \${${selectedItem.itemId}}`
      })

      setSuggestions(current => [...current, ...data.suggestions.suggestions])
    }
  }

  useEffect(() => {
    isAvailable()
    createChat()
  }, [available])

  const headerTitleText = headerTitle || <FormattedMessage id="editor.chatbot.title" />
  const headerDescriptionText = headerDescription || <FormattedMessage id="editor.chatbot.description" />

  function handleSendMessage() {
    const newMessage = {
      id: (messages.length - 1),
      content: message,
      timestamp: Date.now(),
      color: "bg-blue"
    }

    setMessages(current => [...current, newMessage])
  }

  function handleAcceptSuggestions() {
    const newMessage = {
      id: (messages.length - 1),
      content: "Sim.",
      timestamp: Date.now(),
      color: "bg-blue"
    }

    setAccepted(true)
    setMessages(current => [...current, newMessage])
  }

  function handleDeclineSuggestions() {
    const newMessage = {
      id: (messages.length - 1),
      content: "Certo, mas se precisa de qualquer ajuda estarei aqui.",
      timestamp: Date.now(),
      color: "bg-black-20"
    }

    setAccepted(false)
    setMessages(current => [...current, newMessage])
  }

  return (
    <div className="fixed bottom-1 right-1 flex flex-column">
      <Container isOpen={isOpen} className={`${handles.chatbotContainer} vh-50 vw-25 bg-near-white br4 flex flex-column relative mv3`}>
        <div className={`${handles.chatbotHeader} w-100 h-20 br4 pa3 bg-blue washed-blue flex items-center justify-between`}>
          <div className="flex items-center">
            <div className="w2 w2 mr2">
              <img
                className="br-100"
                src={headerAvatarUrl}
                alt={headerAvatarAlt}
              />
            </div>
            <div>
              <div className="f4 f-headline">{headerTitleText}</div>
              <div className="f7 f-subheadline">{headerDescriptionText}</div>
            </div>
          </div>
          <button className="flex items-center ph3 pointer bg-transparent b--none outline-0" onClick={() => setIsOpen(false)}>
            <FiX size={24} className="white" />
          </button>
        </div>

        <div className={`${handles.chatbotMessages} h-75 ph2 mb5 pb2 overflow-y-scroll`}>
          {!available && (
            <>
              <div className={`${handles.chatbotMessage} bg-black-20 br4 pa3 flex flex-column mv2`}>
                <div className="">
                  <p className="">Olá, percebi que está procurando um produto indisponível e eu posso te ajudar.</p>
                </div>
                <div className="self-end">
                  <span className="f7 f-subheadline">{getHour({ timestamp: Date.now(), timezone: 'America/Sao_Paulo', locale: 'pt-BR' })}</span>
                </div>
              </div>

              <div className="bg-black-20 pa3 br4 flex flex-column">
                <div className="mb3">
                  Gostaria de receber sugestões de produtos similares?
                      </div>
                <div className="flex justify-between mb2">
                  <button
                    className="grow pointer w-50 br3 br--left pa2 br bl-0 bt-0 bb-0 b--white-20 white bg-action-primary outline-0"
                    type="button"
                    value="Sim"
                    onClick={handleAcceptSuggestions}
                  >
                    Sim
                        </button>
                  <button
                    className="grow pointer w-50 br3 br--right pa2 bl br-0 bt-0 bb-0 b--white-20 white bg-action-primary outline-0"
                    type="button"
                    value="Não"
                    onClick={handleDeclineSuggestions}
                  >
                    Não
                        </button>
                </div>
                <div className="self-end">
                  <span className="f7 f-subheadline">22:30</span>
                </div>
              </div>
            </>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`${handles.chatbotMessage} ${message.color} white br4 pa3 flex flex-column mt2`}>
              <div className="">
                <p className="">{message.content}</p>
              </div>
              <div className="self-end">
                <span className="f7 f-subheadline">{getHour({ timestamp: message.timestamp, timezone: 'America/Sao_Paulo', locale: 'pt-BR' })}</span>
              </div>
            </div>
          ))}

        
          {!available && (
            <div className="w-100 flex overflow-x-scroll">
              {accepted && suggestions.map(suggestions => (
                <div className="bg-black-20 br4 mv2 w5 mr2 flex flex-column justify-between">
                  <div className="">
                    <img
                      className="w-50 br4"
                      src={suggestions.imageUrl}
                      alt={suggestions.nameComplete}
                    />
                  </div>
                  <div className="pv2 ph3 br4 bg-blue">
                    <div className="flex justify-center">
                      <h2 className="f5 f-headline truncate mr1 white">
                        {suggestions.nameComplete}
                      </h2>
                      {/* <span className="f6 f-subheadline white">R$1.299,99</span> */}
                    </div>
                    <div className="pv2 ph3 br3 mt2 pointer flex justify-center bg-white">
                      <a className="b pointer blue no-underline" href={suggestions.url}>
                        Ver detalhes
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${handles.chatbotFooter} absolute bottom-0 w-100 br4 pa3 bg-blue white flex items-center justify-between`}>
          <div className="w-80">
            <input
              className="h-100 w-100 br2 pa3 b--none outline-0 bg-white action-primary"
              placeholder={senderPlaceholder}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <button className="w-20 flex justify-center items-center pointer b--none bg-transparent outline-0" onClick={handleSendMessage}>
            <FiSend size={24} className="white" />
          </button>
        </div>
      </Container>

      <button className="br-100 bg-blue pa4 b--none w3 h3 pointer outline-0 self-end" onClick={() => setIsOpen(current => !current)}>
        <FiMessageCircle size={24} className="white" />
      </button>
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
