import { Theme, useTheme } from "../../../utils/theme-provider";

function ThemeToggle() {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
      setTheme((prevTheme) =>
        prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      );
    };


  return (
    <div className="absolute top-5 right-5" onClick={toggleTheme}>
      {theme == "light" ? (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 36C13 36 8.75 34.25 5.25 30.75C1.75 27.25 0 23 0 18C0 13 1.75 8.75 5.25 5.25C8.75 1.75 13 0 18 0C18.2667 0 18.55 0.00833343 18.85 0.0250001C19.15 0.0416668 19.5333 0.0666666 20 0.0999999C18.8 1.16667 17.8667 2.48333 17.2 4.05C16.5333 5.61667 16.2 7.26667 16.2 9C16.2 12 17.25 14.55 19.35 16.65C21.45 18.75 24 19.8 27 19.8C28.7333 19.8 30.3833 19.4917 31.95 18.875C33.5167 18.2583 34.8333 17.4 35.9 16.3C35.9333 16.7 35.9583 17.025 35.975 17.275C35.9917 17.525 36 17.7667 36 18C36 23 34.25 27.25 30.75 30.75C27.25 34.25 23 36 18 36ZM18 33C21.6333 33 24.8 31.875 27.5 29.625C30.2 27.375 31.8833 24.7333 32.55 21.7C31.7167 22.0667 30.825 22.3417 29.875 22.525C28.925 22.7083 27.9667 22.8 27 22.8C23.1667 22.8 19.9083 21.4583 17.225 18.775C14.5417 16.0917 13.2 12.8333 13.2 9C13.2 8.2 13.2833 7.34167 13.45 6.425C13.6167 5.50833 13.9167 4.46667 14.35 3.3C11.0833 4.2 8.375 6.025 6.225 8.775C4.075 11.525 3 14.6 3 18C3 22.1667 4.45833 25.7083 7.375 28.625C10.2917 31.5417 13.8333 33 18 33Z"
            fill="#121626"
          />
        </svg>
      ) : (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 29C23.9333 29 25.5833 28.3167 26.95 26.95C28.3167 25.5833 29 23.9333 29 22C29 20.0667 28.3167 18.4167 26.95 17.05C25.5833 15.6833 23.9333 15 22 15C20.0667 15 18.4167 15.6833 17.05 17.05C15.6833 18.4167 15 20.0667 15 22C15 23.9333 15.6833 25.5833 17.05 26.95C18.4167 28.3167 20.0667 29 22 29ZM22 32C19.2333 32 16.875 31.025 14.925 29.075C12.975 27.125 12 24.7667 12 22C12 19.2333 12.975 16.875 14.925 14.925C16.875 12.975 19.2333 12 22 12C24.7667 12 27.125 12.975 29.075 14.925C31.025 16.875 32 19.2333 32 22C32 24.7667 31.025 27.125 29.075 29.075C27.125 31.025 24.7667 32 22 32ZM1.5 23.5C1.06667 23.5 0.708333 23.3583 0.425 23.075C0.141667 22.7917 0 22.4333 0 22C0 21.5667 0.141667 21.2083 0.425 20.925C0.708333 20.6417 1.06667 20.5 1.5 20.5H6.5C6.93333 20.5 7.29167 20.6417 7.575 20.925C7.85833 21.2083 8 21.5667 8 22C8 22.4333 7.85833 22.7917 7.575 23.075C7.29167 23.3583 6.93333 23.5 6.5 23.5H1.5ZM37.5 23.5C37.0667 23.5 36.7083 23.3583 36.425 23.075C36.1417 22.7917 36 22.4333 36 22C36 21.5667 36.1417 21.2083 36.425 20.925C36.7083 20.6417 37.0667 20.5 37.5 20.5H42.5C42.9333 20.5 43.2917 20.6417 43.575 20.925C43.8583 21.2083 44 21.5667 44 22C44 22.4333 43.8583 22.7917 43.575 23.075C43.2917 23.3583 42.9333 23.5 42.5 23.5H37.5ZM22 8C21.5667 8 21.2083 7.85833 20.925 7.575C20.6417 7.29167 20.5 6.93333 20.5 6.5V1.5C20.5 1.06667 20.6417 0.708333 20.925 0.425C21.2083 0.141667 21.5667 0 22 0C22.4333 0 22.7917 0.141667 23.075 0.425C23.3583 0.708333 23.5 1.06667 23.5 1.5V6.5C23.5 6.93333 23.3583 7.29167 23.075 7.575C22.7917 7.85833 22.4333 8 22 8ZM22 44C21.5667 44 21.2083 43.8583 20.925 43.575C20.6417 43.2917 20.5 42.9333 20.5 42.5V37.5C20.5 37.0667 20.6417 36.7083 20.925 36.425C21.2083 36.1417 21.5667 36 22 36C22.4333 36 22.7917 36.1417 23.075 36.425C23.3583 36.7083 23.5 37.0667 23.5 37.5V42.5C23.5 42.9333 23.3583 43.2917 23.075 43.575C22.7917 43.8583 22.4333 44 22 44ZM10 12.1L7.15 9.3C6.85 9 6.70833 8.64167 6.725 8.225C6.74167 7.80833 6.88333 7.45 7.15 7.15C7.45 6.85 7.80833 6.7 8.225 6.7C8.64167 6.7 9 6.85 9.3 7.15L12.1 10C12.3667 10.3 12.5 10.65 12.5 11.05C12.5 11.45 12.3667 11.7833 12.1 12.05C11.8333 12.35 11.4917 12.5 11.075 12.5C10.6583 12.5 10.3 12.3667 10 12.1ZM34.7 36.85L31.9 34C31.6333 33.7 31.5 33.3417 31.5 32.925C31.5 32.5083 31.65 32.1667 31.95 31.9C32.2167 31.6 32.55 31.45 32.95 31.45C33.35 31.45 33.7 31.6 34 31.9L36.85 34.7C37.15 35 37.2917 35.3583 37.275 35.775C37.2583 36.1917 37.1167 36.55 36.85 36.85C36.55 37.15 36.1917 37.3 35.775 37.3C35.3583 37.3 35 37.15 34.7 36.85ZM31.9 12.1C31.6 11.8 31.45 11.45 31.45 11.05C31.45 10.65 31.6 10.3 31.9 10L34.7 7.15C35 6.85 35.3583 6.70833 35.775 6.725C36.1917 6.74167 36.55 6.88333 36.85 7.15C37.15 7.45 37.3 7.80833 37.3 8.225C37.3 8.64167 37.15 9 36.85 9.3L34 12.1C33.7333 12.3667 33.3917 12.5 32.975 12.5C32.5583 12.5 32.2 12.3667 31.9 12.1ZM7.15 36.85C6.85 36.55 6.7 36.1917 6.7 35.775C6.7 35.3583 6.85 35 7.15 34.7L10 31.9C10.3 31.6 10.65 31.45 11.05 31.45C11.45 31.45 11.8 31.6 12.1 31.9C12.4 32.2 12.55 32.55 12.55 32.95C12.55 33.35 12.4 33.7 12.1 34L9.3 36.85C9 37.15 8.64167 37.2917 8.225 37.275C7.80833 37.2583 7.45 37.1167 7.15 36.85Z"
            fill="#F6F8FC"
          />
        </svg>
      )}
    </div>
  );
}

export default ThemeToggle;
