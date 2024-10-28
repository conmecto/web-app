const formatText = (text: string | undefined) => {
  if (!text) {
    return '';
  }
  return text?.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  }).join(' ');
}

const formatAmount = (amount: number, currency: string) => {
  if (currency === 'indian_rupee') {  
    const indianFormatter = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    });
    return indianFormatter.format(amount);
  }
  const internationalFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  return internationalFormatter.format(amount);
}

export {
  formatText,
  formatAmount
}