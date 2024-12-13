import { CardWrapper } from "@/components/auth/card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex items-center justify-center">
        <BsExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
