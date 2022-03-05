import axios from "axios";

export const get_search_result = async ({
  keyword,
  search_type,
  page_number,
  page_size,
}) => {
  const payload = {
    keyword,
    search_type,
    page_number,
    page_size: page_size || 10,
  };

  const res = await axios.get(`/api/search/`, { params: payload });

  return res.data;
};
