import React from 'react'

interface HeaderProps {
  title: string;
  description: string;
  avatarUrl: string;
  avatarAlt: string;
}

const Header: StorefrontFunctionComponent<HeaderProps> = ({ title, description, avatarUrl, avatarAlt }) => {


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
          <div className="f4 f-headline">{title}</div>
          <div className="f7 f-subheadline">{description}</div>
        </div>
      </div>
      <div className="">
      </div>
    </div>
  );
};

Header.schema = {
}

export default Header