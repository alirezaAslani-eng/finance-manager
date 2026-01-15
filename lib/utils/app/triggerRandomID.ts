

function triggerRandomID(trigger: boolean) {
  return trigger ? crypto.randomUUID() : crypto.randomUUID();
}

export default triggerRandomID;
