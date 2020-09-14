import React from 'react'
import { FormattedMessage } from 'react-intl'

interface HeaderProps {
  title: string;
  description: string;
  avatarUrl: string;
  avatarAlt: string;
}

const Header: StorefrontFunctionComponent<HeaderProps> = ({ title, description, avatarUrl, avatarAlt }) => {
  const titleText = title || <FormattedMessage id="editor.chatbot.header.title" />
  const descriptionText = description || <FormattedMessage id="editor.chatbot.header.description" />


  return (
    <div className={`w-100 h-20 br4 pa3 bg-blue washed-blue flex items-center justify-between`}>
      <div className="flex items-center">
        <div className="w2 w2 mr2">
          <img
            className="br-100"
            src={avatarUrl}
            alt={avatarAlt}
          />
        </div>
        <div>
          <div className="f4 f-headline">{titleText}</div>
          <div className="f7 f-subheadline">{descriptionText}</div>
        </div>
      </div>
      <div className="">
      </div>
    </div>
  );
};

Header.schema = {
  title: "editor.chatbot-header.title",
  description: "editor.chatbot-header.description",
  type: "object",
  properties: {
    title: {
      title: "editor.chatbot.header.title-title",
      description: "editor.chatbot.header.title-description",
      type: "string",
      default: null
    },
    description: {
      title: "editor.chatbot.header.description-title",
      description: "editor.chatbot.header.description-description",
      type: "string",
      default: null
    },
    avatarUrl: {
      title: "editor.chatbot.header.avatarurl-title",
      description: "editor.chatbot.header.avatarurl-description",
      type: "string",
      default: null
    },
    avatarAlt: {
      title: "editor.chatbot.header.avataralt-title",
      description: "editor.chatbot.header.avataralt-description",
      type: "string",
      default: null
    },
  }
}

export default Header