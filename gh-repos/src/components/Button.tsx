type ButtonProps = {
    text: string;
    icon?: React.ReactNode;
  };
  
  export const Button = ({ text, icon }: ButtonProps) => {
    return (
      <button className="flex items-center gap-2 p-2 border rounded">
        {icon}
        {text}
      </button>
    );
  };
  