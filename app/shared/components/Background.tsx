type Props = {
  theme: string | null
}

function Background({theme}: Props) {

  return (
    <div className={`absolute z-30 flex h-screen w-screen items-center justify-center transition-all duration-200 dark:bg-black/90`}>
      <img
        src="/background-white.png"
        alt=""
        className="h-screen w-screen object-cover lg:object-fill"
      />
    </div>
  );
}

export default Background;
