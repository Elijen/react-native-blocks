export const isBorderStyle = (text: any) => {
  return (
    typeof text === "string" && !!text.match(/^(solid)|(dotted)|(dashed)$/)
  );
};

export const isWidth = (text: any) => {
  return typeof text === "number";
};

export const isColor = (text: any) => {
  return typeof text === "string" && !isBorderStyle(text);
};
