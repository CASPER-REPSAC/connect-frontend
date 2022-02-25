import axios from "axios";

export const get_search_result = async (keyword, search_type, page_number) => {
  const payload = {
    keyword,
    search_type,
    page_number,
  };

  const res = await axios.get(`/api/search/`, payload);
};
