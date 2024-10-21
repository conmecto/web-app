const formatText = (text: string | undefined) => {
  if (!text) {
    return '';
  }
  return text?.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  }).join(' ');
}

export {
  formatText
}