type RunningTextProps = {
  children: React.ReactNode;
};

export default function RunningText({ children }: RunningTextProps) {
  return (
    <div className="running-text fixed bottom-20">
      <span>{children}</span>

      <style>
        {`
          .running-text {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
          }

          .running-text span {
            display: inline-block;
            animation: run 10s linear infinite;
            padding-left: 100%;
          }

          @keyframes run {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}
