

type Props = {
    showPassword: boolean
}


function ShowPasswordIcon({showPassword}: Props) {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1083 7.8917L7.8916 12.1084C7.34994 11.5667 7.0166 10.825 7.0166 10C7.0166 8.35003 8.34993 7.0167 9.99993 7.0167C10.8249 7.0167 11.5666 7.35003 12.1083 7.8917Z"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.85 4.80832C13.3917 3.70832 11.725 3.10832 9.99999 3.10832C7.05833 3.10832 4.31666 4.84165 2.40833 7.84165C1.65833 9.01665 1.65833 10.9917 2.40833 12.1667C3.06666 13.2 3.83333 14.0917 4.66666 14.8083"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.0166 16.275C7.9666 16.675 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1584 17.5916 12.1584C18.3416 10.9834 18.3416 9.00838 17.5916 7.83338C17.3166 7.40004 17.0166 6.99171 16.7083 6.60838"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.925 10.5833C12.7083 11.7583 11.75 12.7166 10.575 12.9333"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={`${showPassword && "hidden"}`}
          d="M7.89163 12.1084L1.66663 18.3334"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={`${showPassword && "hidden"}`}
          d="M18.3334 1.66667L12.1084 7.89167"
          stroke="#6C7E95"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default ShowPasswordIcon;
