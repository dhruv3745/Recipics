import { MotiView } from "moti";

const LoadingIndicator = () => {
  return (
    <MotiView
      from={{
        width: "20%",
        height: "20%",
        borderRadius: 10,
        borderWidth: 0,
        shadowOpacity: 0.5,
      }}
      animate={{
        width: "24%",
        height: "24%",
        borderRadius: 12,
        borderWidth: 24,
        shadowOpacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{
        width: "20%",
        height: "20%",
        borderRadius: 10,
        borderWidth: 10,
        borderColor: "#ccc",
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      }}
    />
  );
};

export default LoadingIndicator;
