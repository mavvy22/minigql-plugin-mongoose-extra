export const randomChar = (max = 50) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < max; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
