import axios from "axios";

export const get_all_tags = async () => {
  const res = await axios.get("/api/w00/tags/");
  return res.data;
};

export const get_tag_info_by_id = async (tag_id) => {
  const res = await axios.get(`/api/w00/tags/${tag_id}/`);
  return res.data;
};
