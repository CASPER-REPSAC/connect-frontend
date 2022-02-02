import axios from "axios";
export const getChapter = async (activity_id, chapter_id) => {
  const res = await axios.get(
    `/api/activities/${activity_id}/chapter/${chapter_id}`
  );
  const chapter = res.data;

  return chapter;
};
