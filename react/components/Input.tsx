import React from 'react'

interface InputProps {
  placeholder?: string;
}

const Input: StorefrontFunctionComponent<InputProps> = ({ placeholder }) => {
  return (
    <div className="absolute bottom-0 w-100 h-20 br4 pa3 bg-blue washed-blue flex items-center justify-between">
      <div className="h2 w-80">
        <textarea
          className="h-100 w-100 br2 pa2 bg-transparent washed-blue overflow-hidden overflow-y-scroll"
          placeholder={placeholder}
        />
      </div>
      <div className="w-20 flex justify-center items-center">
      </div>
    </div>
  );
};

Input.schema = {
  title: "Chatbot Input Editor",
  description: "Input of messages from Users.",
  type: "object",
  properties: {
    placeholder: {
      title: "Placeholder of Textarea",
      description: "Placeholder with copy.",
      type: "string",
      default: null
    }
  }
}

export default Input