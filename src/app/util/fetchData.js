const URL = 'https://en.wikipedia.org/w/api.php';
const fetchData = async (params) => {
  try {
    const response = await axios.get(URL, { params });
    if (response.data.error) {
      throw new Error(response.data.error.info);
    } else {
      const {
        data: { query },
      } = response;
      return query;
    }
  } catch (error) {
    alert(`🚨 ${error.message} 🚨`);
  }
};

export { fetchData };
