import UserMessage, { UserMessageProps } from "./Message";

interface HeaderProps {
  text: string;
  subText?: string;
  message?: UserMessageProps;
}
const Header = ({ text, message, subText }: HeaderProps) => (
  <div className="text-center space-y-1">
    <h2 className="text-3xl font-bold text-gray-900">{text}</h2>
    {subText && <p className="text-sm text-gray-400">{subText}</p>}
    {message && <UserMessage {...message} />}
  </div>
);

export default Header;
