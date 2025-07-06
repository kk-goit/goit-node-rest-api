import gravatar from "gravatar"

const getGravatarUrl = async (email) => {
  return new Promise((resolv, reject) => {
    try {
      const url = `https:${gravatar.url(email)}`;
      resolv(url);
    }
    catch (error) {
      reject(error);
    }
  });
};

export default getGravatarUrl;
