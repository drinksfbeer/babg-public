const grabSubDomainString = () => {
  const { hostname } = window.location;
  const hostnameArray = hostname
    .split('.')
    .filter(item => item !== 'www');

  if (hostnameArray.length === 3) {
    return hostnameArray[0];
  }
  console.log('dont forget to reset me');
  return 'sanfran';
};
export default grabSubDomainString;
