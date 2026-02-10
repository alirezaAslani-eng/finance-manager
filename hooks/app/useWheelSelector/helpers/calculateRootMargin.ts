function calculateRootMargin({
  scroll_container_height,
  option_height,
}: {
  scroll_container_height: number;
  option_height: number;
}) {
  // * (Half of scroll_container_height) - (Half of option_height)
  const MarginY =
    Math.ceil(scroll_container_height / 2) - Math.floor(option_height / 2);
  return `-${MarginY}px 0px -${MarginY}px 0px`;
}

export default calculateRootMargin;
